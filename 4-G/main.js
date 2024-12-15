import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv'; 
import Produto from './models/produto.js';
import Usuario from './models/usuario.js';
import GrupoAcesso from './models/grupo_acesso.js';
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
                    attributes: ['id', 'nome', 'qtde_atual', 'preco', 'p', 'quantidade_demandada'], // Seleciona apenas os campos desejados de Produto
                    include: [{
                        model: GrupoAcesso,
                        as: 'grupo_acesso',
                        required: true,
                        attributes: [],
                        include: [{
                            model: Usuario,
                            as: 'usuario',
                            required: true,
                            attributes: [],
                            where: { nome: req.query.name },
                        }],
                    }],
                });
                
                

                res.json(produtos); // Retorna os produtos encontrados
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
