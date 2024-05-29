const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const fs = require('fs');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1280,
      height: 720,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    })
  
    win.loadFile('./src/index.html')

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

ipcMain.on('save-zip-file', (event, { name, data }) => {
  const appDataPath = app.getPath('userData');
  const loadedPackagesPath = path.join(appDataPath, 'LoadedPackages');

  // Ensure the LoadedPackages directory exists
  if (!fs.existsSync(loadedPackagesPath)) {
    fs.mkdirSync(loadedPackagesPath);
  }

  const savePath = path.join(loadedPackagesPath, name);

  fs.writeFile(savePath, data, (err) => {
    if (err) {
      console.error('Failed to save file:', err);
      return;
    }
    console.log('File saved successfully:', savePath);
  });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
