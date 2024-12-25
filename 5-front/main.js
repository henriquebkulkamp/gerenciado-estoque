import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { io } from 'socket.io-client';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { read_name, write_name} from './get_name.js';
import dotenv from 'dotenv'; 
dotenv.config({ path: '../.env' }); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
const port_4_g = parseInt(process.env.PORTA_4_G, 10);
app.disableHardwareAcceleration();

app.on('ready', async () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: false,
            contextIsolation: false,
        },
    });

    const name = await read_name();

    if (name == "") {
        mainWindow.loadFile(path.join(__dirname, 'view', 'login', 'login.html'));

        ipcMain.handle('submit-name', async (event, inputName) => {
            if (!inputName) {
                console.log('problema');
            } else {
                console.log(`Nome recebido: ${inputName}`);
                write_name(inputName);
                mainWindow.loadFile(path.join(__dirname, 'view', 'index.html'));
            }
        });

    } else {
        mainWindow.loadFile(path.join(__dirname, 'view', 'index.html'));
    }

    ipcMain.on('setup-table', async (event) => {
        const response = await axios.get(`http://localhost:${port_4_g}/setup`, {
            params: { name }
        });
    
        console.log(response.data)
        event.reply('setup-table-response', response.data)
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});






// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// let mainWindow;
// const port_4_g = parseInt(process.env.PORTA_4_G, 10);
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
//     mainWindow.loadFile(path.join(__dirname, 'view', 'index.html'));

//     mainWindow.on('closed', () => {
//         mainWindow = null;
//     });

//     // Requisição HTTP para o servidor Express assim que o app inicia
//     axios.get(`http://localhost:${port_4_g}/setup`, {
//         params: {
//             name: nome
//         }
//     }) // Alterar para o seu endpoint
//         .then(response => {
//             console.log('Resposta da requisição:', response.data);
//             // Aqui você pode fazer o que for necessário com a resposta
//         })
//         .catch(error => {
//             console.error('Erro na requisição:', error);
//         });

//     // Conectar ao emissor usando Socket.IO
//     const socket = io('http://localhost:3001');

//     socket.on('connect', () => {
//         console.log('Conectado ao emissor.');
//     });

//     socket.on('data', (data) => {
//         const prod_info = Object.entries(data)
//             .filter(([key]) => key !== 'Info-geral')
//             .map(([key, value]) => ({ [key]: value }));

//         console.log(prod_info);
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
//         mainWindow.loadFile(path.join(__dirname, 'view', 'index.html'));
//     }
// });
