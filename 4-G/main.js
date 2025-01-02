import Produto from './models/produto.js';
import Usuario from './models/usuario.js';
import GrupoAcesso from './models/grupo_acesso.js';
import CompraProduto from './models/compra_produto.js';
import sequelize from './models/db.js';
import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv'; 
import { execFile } from 'child_process';
dotenv.config({ path: '../.env' });
const app = express();

const port_1_erp = parseInt(process.env.PORTA_1_ERP, 10);
const port_4_g = parseInt(process.env.PORTA_4_G, 10);

app.use(express.json());

app.get('/setup', (req, res) => {
    console.log(req.query.name)
    // Faz a requisição para o ERP
    axios.get(`http://localhost:${port_1_erp}/setup`)
        .then(async (response) => {
            console.log('Resposta da requisição:', response.data);
            
            try {
                const produtos = await Produto.findAll({
                    attributes: [
                        'id',
                        'nome',
                        'qtde_atual',
                        'preco',
                        'p',
                        'quantidade_demandada',
                        [
                            sequelize.literal(`(
                          SELECT COALESCE(SUM(cp.qtde_compra * cp.preco_medio), 0.00)
                          FROM compra_produtos AS cp
                          WHERE cp.produto_id = "Produto".id
                        )`),
                            'quantidade_a_receber'
                        ],
                        [
                        sequelize.literal(`(
                            SELECT COALESCE(
                            AVG(cp.qtde_compra * cp.preco_medio) + STDDEV(cp.qtde_compra * cp.preco_medio), 
                            0.00
                            )
                            FROM compra_produtos AS cp
                            WHERE cp.produto_id = "Produto".id
                        )`),
                        'c'
                        ]
                    ],
                    include: [
                        {
                            model: GrupoAcesso,
                            as: 'grupo_acesso',
                            required: true,
                            attributes: [],
                            include: [
                                {
                                    model: Usuario,
                                    as: "usuario",
                                    where: {
                                        nome: 'Maria'
                                    },
                                    required: true
                                }
                            ]
                        }
                    ]
                });
                  
                  
                
                let args = [
                    response.data['Info-geral'].c,
                    response.data['Info-geral'].p,
                    response.data['Info-geral'].pl,
                    "0.12",
                    response.data['Info-geral'].ki,
                    "-", // pc
                    "-", // prob
                    response.data['Info-geral'].nopat,
                    "-" // preco
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

app.listen(port_4_g, () => {
    console.log(`> Running on http://localhost:${port_4_g}`);
});
