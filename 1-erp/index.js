// sender.js
import INFO from "./info.js";
import express from 'express';
import dotenv from 'dotenv'; 
dotenv.config({ path: '../.env' }); 

const app = express();
const port_1_erp = parseInt(process.env.PORTA_1_ERP, 10);

app.get('/setup', (req, res) => {
    res.send(INFO)
});

app.listen(port_1_erp, () => {
    console.log(`> Running on http://localhost:${port_1_erp}`);
});

// DPS EU FAÇO A ATUALIZAÇÂO
// const LOOP_SECONDS = 2;
// // console.log(INFO)

// import { Server } from 'socket.io';

// const io = new Server(3001)

// console.log('Emissor iniciado na porta 3001');


// io.on('connection', (socket) => {
//     console.log('Cliente conectado ao emissor.');

//     setInterval(() => {
//         const data = INFO;
//         socket.emit('data', data);
//         console.log('Dados enviados:', data);
//     }, LOOP_SECONDS*1000); // Envia dados a cada 2 segundos
// });
