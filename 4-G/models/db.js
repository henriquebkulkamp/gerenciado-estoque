// models/db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'; 

dotenv.config({ path: '../.env' });

// Criando uma instância de conexão com o PostgreSQL usando Sequelize
const sequelize = new Sequelize({
    host: process.env.DB_HOST || 'localhost',  // Host do banco de dados
    dialect: 'postgres',                      // Tipo de banco de dados (PostgreSQL)
    username: process.env.DB_USER || 'postgres',  // Usuário do banco de dados
    password: process.env.DB_PASSWORD || 'postgres',  // Senha do banco de dados
    database: process.env.DB_NAME || 'postgres',  // Nome do banco de dados
    port: process.env.DB_PORT || 5432,            // Porta do banco de dados
    logging: false,  // Defina como `true` para logar as queries SQL no console
});

// Testando a conexão
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados foi estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

export default sequelize;
