const { app, BrowserWindow, ipcMain } = require('electron')
const SecureElectronLicenseKeys = require("secure-electron-license-keys");
const path = require('path');
const fs = require('fs');
const JSZip = require('jszip');
const crypto = require("crypto");

let win;

const createWindow = () => {
    win = new BrowserWindow({
      width: 1280,
      height: 720,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    })

    // Setup bindings for offline license verification
    SecureElectronLicenseKeys.mainBindings(ipcMain, win, fs, crypto, {
        root: process.cwd(),
        version: app.getVersion(),
    });
  
    win.loadFile('./src/index.html')

    win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
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

ipcMain.on('get-pdf-from-zip', (event, { subject, pdfURL, pdfType }) => {
  console.log(subject, pdfType, pdfURL)
  const appDataPath = app.getPath('userData');
  const loadedPackagesPath = path.join(appDataPath, 'LoadedPackages');
  const zipPath = path.join(loadedPackagesPath, `${subject}.zip`);

  fs.readFile(zipPath, (err, data) => {
    if (err) {
      console.error('Failed to read ZIP file:', err);
      event.reply('pdf-from-zip', { pdfData: null });
      return;
    }

    JSZip.loadAsync(data).then(zip => {
      zip.file(pdfURL).async("uint8array").then(pdfData => {
        event.reply('pdf-from-zip', { pdfData, pdfType });
      }).catch(err => {
        console.error('Failed to extract PDF from ZIP:', err);
        event.reply('pdf-from-zip', { pdfData: null });
      });
    }).catch(err => {
      console.error('Failed to load ZIP file:', err);
      event.reply('pdf-from-zip', { pdfData: null });
    });
  });
});

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  } else {
    SecureElectronLicenseKeys.clearMainBindings(ipcMain);
  }
})
