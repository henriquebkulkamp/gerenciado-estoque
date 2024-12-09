const { app, BrowserWindow } = require('electron');
const path = require('path');
const io = require('socket.io-client');

let mainWindow;

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

    // Conectar ao emissor usando Socket.IO
    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
        console.log('Conectado ao emissor.');
    });

    socket.on('data', (data) => {
        const prod_info = Object.entries(data)
            .filter(([key]) => key !== 'Info-geral')
            .map(([key, value]) => ({ [key]: value }));

        console.log(prod_info)
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
