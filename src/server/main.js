// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow, ipcMain } = require('electron');
const { is } = require('electron-util');

const path = require('path');
const TrayGenerator = require('./TrayGenerator');
const Store = require('electron-store');

const schema = {
  launchAtStart: true,
  counterValue: 0
};
const store = new Store(schema);

let mainWindow = null;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: '#fff',
    width: 500,
    height: 250,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      devTools: is.development,
      nodeIntegration: true,
      backgroundThrottling: false
    }
  });

  if (is.development) {
    // mainWindow.webContents.openDevTools({ mode: 'detach' });
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../../build/index.html')}`);
  }
};

app.on('ready', () => {
  createMainWindow();
  const Tray = new TrayGenerator(mainWindow, store);
  Tray.createTray();

  ipcMain.on('COUNTER_UPDATED', (event, data) => {
    store.set('counterValue', data);
  });
});

app.dock.hide();
