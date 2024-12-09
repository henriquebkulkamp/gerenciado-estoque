const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('socketAPI', {
    updateCell: (callback) => ipcRenderer.on('update-cell', callback),
});
