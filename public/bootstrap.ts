import {app, BrowserWindow} from 'electron'
import * as isDev from 'electron-is-dev'
import * as path from 'path'

let mainWindow: BrowserWindow | undefined

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        center: true,
        kiosk: !isDev,
        resizable: false,
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            devTools: isDev,
            contextIsolation: false
        },
    })

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

    mainWindow.on('closed', () => (mainWindow = undefined))

    mainWindow.focus()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    if (!mainWindow) createWindow()
})
