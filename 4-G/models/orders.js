import sequelize from './db.js';  
import Product from './product.js';  
import { DataTypes } from 'sequelize';

const Orders = sequelize.define('Orders', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'produto',
      key: 'id',         
    },
    onDelete: 'CASCADE',  
  },
  fornecedor: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  qtde_compra: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  preco_medio: {
    type: DataTypes.NUMERIC(10, 2),
    allowNull: false,
  },
  dta_chegada: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'compra_produtos', 
  timestamps: false,            
});


Orders.belongsTo(Product, {
  foreignKey: 'produto_id',  
  as: 'produto',             
});

export default Orders;
