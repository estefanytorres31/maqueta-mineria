import { app, BrowserWindow, ipcMain, Menu, shell, screen } from 'electron'
import path from 'path'
import fs from 'fs'

/* ======================================================================
 *  DPI AWARENESS — EVITA QUE WINDOWS ESCALE LA APP (125% / 150%)
 *  Para que 1920x1080 REALES = 1920x1080 CSS (no 1533x793)
 * ====================================================================*/
try { app.commandLine.appendSwitch('high-dpi-support', '1') } catch {}
try { app.commandLine.appendSwitch('disable-pinch') } catch {}
try { app.commandLine.appendSwitch('disable-accelerated-2d-canvas', '0') } catch {}

const projectRoot = path.resolve(__dirname, '..')
const distDir = path.join(projectRoot, 'dist')
const publicDir = path.join(projectRoot, 'public')

if (!app.isPackaged) {
  const sandboxRoot = path.resolve(
    process.env.EDGE_SANDBOX_ROOT || path.join(projectRoot, '.sandbox')
  )
  const userDataDir = path.join(sandboxRoot, 'electron-userdata')
  const appDataDir = path.join(sandboxRoot, 'AppData')
  const localAppDataDir = path.join(sandboxRoot, 'LocalAppData')

  for (const p of [sandboxRoot, userDataDir, appDataDir, localAppDataDir]) {
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true })
  }

  try { app.setPath('userData', userDataDir) } catch {}
  try { app.setPath('appData', appDataDir) } catch {}
  try { app.setPath('localAppData', localAppDataDir) } catch {}

  process.env.LOCALAPPDATA = localAppDataDir
  process.env.APPDATA = appDataDir
}

try { app.setName('Sistema de maquinaria minera') } catch {}

let mainWindow: BrowserWindow | null = null

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged
const DEV_PORT = process.env.VITE_DEV_PORT ? Number(process.env.VITE_DEV_PORT) : 6969
const DEV_URL = `http://localhost:${DEV_PORT}`

function resolvePreload(): string {
  const candidates = [
    path.join(__dirname, 'preload.cjs'),
    path.join(__dirname, 'preload.js'),
    path.join(projectRoot, 'electron/preload.cjs'),
    path.join(projectRoot, 'electron/preload.js')
  ]
  for (const p of candidates) if (fs.existsSync(p)) return p
  return candidates[0]
}

function resolveIcon(): string | undefined {
  const isWin = process.platform === 'win32'
  const candidates = isWin
    ? [path.join(publicDir, 'logopcs.ico'), path.join(publicDir, 'logopcs.png')]
    : [path.join(publicDir, 'logopcs.png'), path.join(publicDir, 'logopcs.ico')]
  for (const p of candidates) if (fs.existsSync(p)) return p
  return undefined
}

function createWindow() {
  // Toma la resolución REAL del monitor (workArea = sin barra de tareas)
  const primary = screen.getPrimaryDisplay()
  const workArea = primary.workAreaSize

  mainWindow = new BrowserWindow({
    width: workArea.width || 1920,
    height: workArea.height || 1080,
    minWidth: 1024,
    minHeight: 640,
    show: false,
    backgroundColor: '#06080C',
    title: 'Sistema de maquinaria minera',
    icon: resolveIcon(),
    autoHideMenuBar: true,
    useContentSize: true,            // width/height = tamaño CONTENIDO, no ventana
    maximizable: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: resolvePreload(),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: isDev,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false
    }
  })

  Menu.setApplicationMenu(null)

  // MAXIMIZA a TAMAÑO REAL del workarea (sin barra de tareas)
  try {
    mainWindow.setBounds({
      x: primary.workArea.x,
      y: primary.workArea.y,
      width: workArea.width,
      height: workArea.height
    })
  } catch {}
  mainWindow.maximize()
  mainWindow.once('ready-to-show', () => mainWindow!.show())

  if (isDev) {
    // DevTools EN VENTANA SEPARADA, NUNCA dentro del panel de la app
    // (equivalente a los 3 puntos → "Undock into separate window" de Chrome)
    mainWindow.webContents.openDevTools({
      mode: 'detach',
      activate: false
    })
    mainWindow.loadURL(DEV_URL + '/login').catch(() => mainWindow!.loadURL(DEV_URL))
  } else {
    const indexHtml = path.join(distDir, 'index.html')
    if (fs.existsSync(indexHtml)) {
      mainWindow.loadFile(indexHtml)
    } else {
      mainWindow.loadURL(DEV_URL)
    }
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

}

ipcMain.handle('window:minimize', () => mainWindow?.minimize())
ipcMain.handle('window:maximize', () => {
  if (!mainWindow) return false
  if (mainWindow.isMaximized()) mainWindow.unmaximize()
  else mainWindow.maximize()
  return mainWindow.isMaximized()
})
ipcMain.handle('window:close', () => mainWindow?.close())
ipcMain.handle('window:fullscreen', (_, enable: boolean) => {
  if (!mainWindow) return false
  mainWindow.setFullScreen(Boolean(enable))
  return mainWindow.isFullScreen()
})
ipcMain.handle('window:is-fullscreen', () => mainWindow?.isFullScreen() ?? false)
ipcMain.handle('app:version', () => app.getVersion())
ipcMain.handle('app:restart', () => {
  app.relaunch()
  app.exit()
})

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
