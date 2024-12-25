import { DataTypes } from 'sequelize';
import sequelize from './db.js';
import Usuario from './usuario.js'; // Importa o modelo de Usuario

const GrupoAcesso = sequelize.define('GrupoAcesso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'grupo_acesso',
    timestamps: false,
});

GrupoAcesso.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

export default GrupoAcesso;
