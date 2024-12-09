// sender.js
import INFO from "./info.js";

const LOOP_SECONDS = 2;
// console.log(INFO)

import { Server } from 'socket.io';

const io = new Server(3001)

console.log('Emissor iniciado na porta 3001');


io.on('connection', (socket) => {
    console.log('Cliente conectado ao emissor.');

    setInterval(() => {
        const data = INFO;
        socket.emit('data', data);
        console.log('Dados enviados:', data);
    }, LOOP_SECONDS*1000); // Envia dados a cada 2 segundos
});
