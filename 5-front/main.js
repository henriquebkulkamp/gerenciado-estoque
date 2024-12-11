// const { app, BrowserWindow } = require('electron');
// const path = require('path');
// const io = require('socket.io-client');

// let mainWindow;

// app.disableHardwareAcceleration();

// app.on('ready', () => {
//     mainWindow = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             preload: path.join(__dirname, 'preload.js'),
//         },
//     });

//     // Ajuste para carregar o novo caminho do index.html
//     mainWindow.loadFile(path.join(__dirname, 'tela', 'index.html'));

//     mainWindow.on('closed', () => {
//         mainWindow = null;
//     });

//     // Conectar ao emissor usando Socket.IO
//     const socket = io('http://localhost:3001');

//     socket.on('connect', () => {
//         console.log('Conectado ao emissor.');
//     });

//     socket.on('data', (data) => {
//         const prod_info = Object.entries(data)
//             .filter(([key]) => key !== 'Info-geral')
//             .map(([key, value]) => ({ [key]: value }));

//         console.log(prod_info)
//         // Enviar os dados para o renderer process
//         if (mainWindow) {
//             mainWindow.webContents.send('update-cell', prod_info);
//         }
//     });

//     socket.on('disconnect', () => {
//         console.log('Desconectado do emissor.');
//     });
// });

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') app.quit();
// });

// app.on('activate', () => {
//     if (mainWindow === null) {
//         mainWindow = new BrowserWindow({
//             width: 800,
//             height: 600,
//         });
//         mainWindow.loadFile(path.join(__dirname, 'tela', 'index.html'));
//     }
// });

import { app, BrowserWindow } from 'electron';
import path from 'path';
import { io } from 'socket.io-client';
import axios from 'axios';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'; 
dotenv.config({ path: '../.env' }); 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
const port_4_g = parseInt(process.env.PORTA_4_G, 10);
app.disableHardwareAcceleration();

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // Ajuste para carregar o novo caminho do index.html
    mainWindow.loadFile(path.join(__dirname, 'tela', 'index.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Requisição HTTP para o servidor Express assim que o app inicia
    axios.get(`http://localhost:${port_4_g}/setup`) // Alterar para o seu endpoint
        .then(response => {
            console.log('Resposta da requisição:', response.data);
            // Aqui você pode fazer o que for necessário com a resposta
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });

    // Conectar ao emissor usando Socket.IO
    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
        console.log('Conectado ao emissor.');
    });

    socket.on('data', (data) => {
        const prod_info = Object.entries(data)
            .filter(([key]) => key !== 'Info-geral')
            .map(([key, value]) => ({ [key]: value }));

        console.log(prod_info);
        // Enviar os dados para o renderer process
        if (mainWindow) {
            mainWindow.webContents.send('update-cell', prod_info);
        }
    });

    socket.on('disconnect', () => {
        console.log('Desconectado do emissor.');
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) {
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
        });
        mainWindow.loadFile(path.join(__dirname, 'tela', 'index.html'));
    }
});
