import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv'; 
import Produto from './models/produto.js'; // Importa o modelo Produto
import Usuario from './models/usuario.js'; // Importa o modelo Usuario
import GrupoAcesso from './models/grupo_acesso.js'; // Importa o modelo GrupoAcesso
dotenv.config({ path: '../.env' });

const app = express();

const port_1_erp = parseInt(process.env.PORTA_1_ERP, 10);
const port_4_g = parseInt(process.env.PORTA_4_G, 10);

app.use(express.json());

app.get('/setup', (req, res) => {
    // Faz a requisição para o ERP
    axios.get(`http://localhost:${port_1_erp}/setup`)
        .then(async (response) => {
            console.log('Resposta da requisição:', response.data);

            // Realiza a consulta no banco de dados utilizando Sequelize
            try {
                const produtos = await Produto.findAll({
                    attributes: ['id', 'nome', 'qtde_atual', 'preco', 'p', 'quantidade_demandada'], // Seleciona apenas os campos desejados de Produto
                    include: [{
                        model: GrupoAcesso,
                        as: 'grupo_acesso',
                        required: true, // Garante o INNER JOIN com GrupoAcesso
                        attributes: [], // Exclui todos os campos de GrupoAcesso
                        include: [{
                            model: Usuario,
                            as: 'usuario',
                            required: true, // Garante o INNER JOIN com Usuario
                            attributes: [], // Exclui todos os campos de Usuario
                            where: { nome: 'Maria' }, // Aplica o filtro
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
