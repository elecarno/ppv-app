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

ipcMain.on('save-sqa-files', (event, sqaFiles) => {
  const appDataPath = app.getPath('userData');
  const loadedPackagesPath = path.join(appDataPath, 'LoadedPackages');

  if (!fs.existsSync(loadedPackagesPath)) {
    fs.mkdirSync(loadedPackagesPath);
  }

  const savePath = path.join(loadedPackagesPath, 'sqaFiles.json');

  fs.writeFile(savePath, JSON.stringify(sqaFiles, null, 2), (err) => {
    if (err) {
      console.error('Failed to save sqaFiles.json:', err);
      return;
    }
    console.log('sqaFiles.json saved successfully:', savePath);
  });
});


ipcMain.on('load-sqa-files', (event) => {
  const appDataPath = app.getPath('userData');
  const loadedPackagesPath = path.join(appDataPath, 'LoadedPackages');
  const loadPath = path.join(loadedPackagesPath, 'sqaFiles.json');

  fs.readFile(loadPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to load sqaFiles.json:', err);
      event.reply('loaded-sqa-files', null);
      return;
    }

    try {
      const sqaFiles = JSON.parse(data);
      event.reply('loaded-sqa-files', sqaFiles);
    } catch (parseErr) {
      console.error('Error parsing sqaFiles.json:', parseErr);
      event.reply('loaded-sqa-files', null);
    }
  });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
