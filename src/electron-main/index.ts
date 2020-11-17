import path from 'path'
import { app, BrowserWindow, ipcMain, dialog } from 'electron'

import { __DEV__ } from 'src/shared/env'
import DefaultSettings from 'src/shared/DefaultSettings'

export let mainWindow: BrowserWindow | null = null

const indexURL: string = __DEV__
    ? `http://localhost:${1212}/index.html`
    : `file://${path.resolve(__dirname, 'index.html')}`

const mainWindowConfig: Electron.BrowserWindowConstructorOptions = {
    width: __DEV__ ? DefaultSettings.DEV_WIDTH : DefaultSettings.WINDOW_WIDTH,
    height: DefaultSettings.WINDOW_HEIGHT,
    minWidth: DefaultSettings.MIN_WIDTH,
    minHeight: DefaultSettings.MIN_HEIGHT,
    backgroundColor: DefaultSettings.BACKGROUND_COLOR,

    webPreferences: {
        devTools: __DEV__,
        nodeIntegration: true
    },
    alwaysOnTop: false,
    show: false,
    skipTaskbar: false,

    /*
     * FullScreen:
     * fullscreen or kiosk
     */
    fullscreen: false,
    kiosk: false,
    focusable: true,
    resizable: true,
    movable: true,
    maximizable: false,
    fullscreenable: true,
    autoHideMenuBar: true,
    titleBarStyle: 'hiddenInset',
    frame: false
}

function createWindow() {
    mainWindow = new BrowserWindow(mainWindowConfig)
    mainWindow.loadURL(indexURL)

    if (__DEV__) mainWindow.webContents.openDevTools()

    bindWindowReadyShowEvent(mainWindow)
    bindWindowCloseEvent(mainWindow)
}

function bindWindowReadyShowEvent(window: BrowserWindow) {
    window.once('ready-to-show', () => {
        if (!window) {
            throw new Error("'mainWindow' is not defined")
        }
        if (process.env.START_MINIMIZED === 'true' || false) {
            window.minimize()
        } else {
            window.show()
            window.focus()
        }
    })
}

function bindWindowCloseEvent(window: BrowserWindow) {
    window.on('closed', () => {
        mainWindow = null
    })
}

function ipcMainEvents() {
    ipcMain.on('closeWindow', () => {
        if (mainWindow === null) return
        mainWindow.close()
    })

    ipcMain.on('minimizeWindow', () => {
        if (mainWindow === null) return
        mainWindow.minimize()
    })

    ipcMain.on('fullScreenWindow', (event: any, isFullScreen: any) => {
        if (mainWindow === null) return
        mainWindow.setKiosk(isFullScreen)
    })

    ipcMain.on('setAlwaysOnTop', (event: any, isPushpin: boolean) => {
        if (mainWindow === null) return
        mainWindow.setAlwaysOnTop(isPushpin)
    })

    ipcMain.on('open-file-dialog', event => {
        dialog
            .showOpenDialog(mainWindow, {
                properties: ['openFile'],
                filters: [
                    {
                        name: 'Images',
                        extensions: [
                            'jpg',
                            'jpge',
                            'gif',
                            'bmp',
                            'png',
                            'ico',
                            'svg',
                            'icns'
                        ]
                    }
                ]
            })
            .then(files => {
                if (files) {
                    event.sender.send('selected-image', files)
                }
            })
    })
}

function run() {
    app.on('ready', createWindow)
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow()
        }
    })

    ipcMainEvents()
}

run()
