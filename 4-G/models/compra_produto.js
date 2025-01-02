import sequelize from './db.js';  // Importa a instância do sequelize
import Produto from './produto.js';  // Importa o modelo de Produto
import { DataTypes } from 'sequelize';

const CompraProduto = sequelize.define('CompraProduto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'produto',  // Nome da tabela referenciada (Produto)
      key: 'id',         // Chave primária da tabela Produto
    },
    onDelete: 'CASCADE',  // Ação ao excluir o produto
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
  tableName: 'compra_produtos', // Nome da tabela no banco de dados
  timestamps: false,            // Se não houver colunas de timestamp
});

// Definir o relacionamento: CompraProduto pertence a um Produto
CompraProduto.belongsTo(Produto, {
  foreignKey: 'produto_id',  // Chave estrangeira
  as: 'produto',             // Nome do alias
});

export default CompraProduto;
