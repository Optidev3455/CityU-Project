import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './util.js';


app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        height: 1080,
        width: 1920,
        autoHideMenuBar: true,
    });
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    } else {
        mainWindow.loadFile(path.join(app.getAppPath() + './dist-react/index.html'));
    }
})