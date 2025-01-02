import Product from '../product.js';
import Usuario from '../user.js';
import AcessGroup from '../acess_group.js';
import sequelize from '../db.js';

const setup_product_querie = async () => Product.findAll({
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
            model: AcessGroup,
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

export default setup_product_querie;