const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");


function createWindow(){
    const win = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true,
            contextIsolation: false,
            preload: path.join(__dirname, "preload.js"),
        },
    });
    if(isDev) {
        win.setAutoHideMenuBar(true)
    } else {
        win.removeMenu();
    }


    win.loadURL(
        isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
    ).catch(_ => app.quit());
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", function (){
        if(BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", function (){
    if(process.platform !== "darwin") app.quit();
});
