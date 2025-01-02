import { DataTypes } from 'sequelize';
import sequelize from './db.js';
import Usuario from './user.js';

const AcessGroup = sequelize.define('AcessGroup', {
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

AcessGroup.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

export default AcessGroup;
