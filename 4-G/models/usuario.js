// models/usuario.js
import { DataTypes } from 'sequelize';
import sequelize from './db.js'; // Substitua com sua conexão Sequelize

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'usuario',
    timestamps: false,
});

export default Usuario;
