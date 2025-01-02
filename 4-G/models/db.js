import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'; 

dotenv.config({ path: '../.env' });


const sequelize = new Sequelize({
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false,
});


sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados foi estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

export default sequelize;
