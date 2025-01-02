import setup_product_querie from './models/queries/query.product.js'
import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv';
import { execFile } from 'child_process';
dotenv.config({ path: '../.env' });
const app = express();

const erp_port = parseInt(process.env.ERP_PORT, 10);
const backend_port = parseInt(process.env.BACKEND_PORT, 10);

app.use(express.json());

app.get('/setup', (req, res) => {
    console.log(req.query.name)

    axios.get(`http://localhost:${erp_port}/setup`)
        .then(async (response) => {
            console.log('Resposta da requisição:', response.data);
            
            try {                
                const produtos = await setup_product_querie();
                  
                  
                
                let args = [
                    response.data['Financial indicators'].c,
                    response.data['Financial indicators'].p,
                    response.data['Financial indicators'].pl,
                    "0.12",
                    response.data['Financial indicators'].ki,
                    "-", // pc
                    "-", // prob
                    response.data['Financial indicators'].nopat,
                    "-" // price
                ]

                const binaryPath = '../delimitador/target/release/delimitador'
                
                const modify_produto_promise = produtos.map(produto => {
                    return new Promise((resolve, reject) => {
                        let prod = produto.toJSON();
                        let c = parseInt(prod.c, 10);
                        let pc = parseInt(prod.quantidade_demandada, 10);
                        let p = parseFloat(prod.p);
                        let price = parseFloat(prod.preco)
                        let limit = pc * p / (1.0 - p) * price;
                        let interval = (c != 0 && c < limit) ? c : Math.floor(limit);
                        console.log(`prod: ${prod.nome}; ${interval}`);
                        args[0] = interval;
                        args[5] = prod.quantidade_demandada;
                        args[6] = prod.p;
                        args[8] = prod.preco;
    
                        execFile(binaryPath, args, (error, stdout, stderr) => {
                            if (error) {
                                console.error(`Erro ao executar o binário Rust: ${error.message}`);
                                return;
                            }
                            if (stderr) {
                                console.error(`Erro no binário Rust: ${stderr}`);
                                return;
                            }
    
                            console.log(`Resultado: ${Math.round(parseFloat(stdout))}`);
                            prod.limite_min = Math.round(parseFloat(stdout))
                            prod.limite_max = prod.limite_min + interval // min + c
                            console.log('-=-=-=-=-=-=-=-=-=-=')
                            console.log(prod)
                            resolve(prod);
                        });
                    });
                });

                Promise.all(modify_produto_promise)
                    .then(modify_produto => {
                        res.json(modify_produto);
                    })
                    .catch(error => {
                        console.error("Erro ao processar os produtos:", error);
                        res.status(500).json({ error: "Erro ao processar os produtos." });
                    });
            } catch (error) {
                console.error('Erro ao consultar produtos:', error);
                res.status(500).send('Erro ao consultar produtos');
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
});

app.listen(backend_port, () => {
    console.log(`> Running on http://localhost:${backend_port}`);
});
