// models/produto.js
import { DataTypes } from 'sequelize';
import sequelize from './db.js';
import GrupoAcesso from './grupo_acesso.js'; // Importa o modelo de GrupoAcesso

const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qtde_atual: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    preco: {
        type: DataTypes.NUMERIC,
        allowNull: false,
    },
    p: {
        type: DataTypes.NUMERIC,
        allowNull: false,
    },
    quantidade_demandada: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    grupo_acesso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'produto',
    timestamps: false,
});

Produto.belongsTo(GrupoAcesso, { foreignKey: 'grupo_acesso_id', as: 'grupo_acesso' });

export default Produto;
