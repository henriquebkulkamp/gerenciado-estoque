import Produto from './models/produto.js';
import Usuario from './models/usuario.js';
import GrupoAcesso from './models/grupo_acesso.js';
import CompraProduto from './models/compra_produto.js';
import sequelize from './models/db.js';
import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv'; 
dotenv.config({ path: '../.env' });

const port_1_erp = parseInt(process.env.PORTA_1_ERP, 10);
const port_4_g = parseInt(process.env.PORTA_4_G, 10);


import Sequelize from 'sequelize';



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
})
.then(response => {
        response.forEach(produto => {
            console.log(produto.toJSON());
        });
    });
