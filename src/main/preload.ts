import { contextBridge, ipcRenderer } from 'electron'

export interface ElectronAPI {
  window: {
    minimize: () => Promise<void>
    maximize: () => Promise<boolean>
    close: () => Promise<void>
    fullscreen: (enable: boolean) => Promise<boolean>
    isFullscreen: () => Promise<boolean>
  }
  app: {
    getVersion: () => Promise<string>
    restart: () => Promise<void>
  }
}

const electronAPI: ElectronAPI = {
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close: () => ipcRenderer.invoke('window:close'),
    fullscreen: (enable: boolean) => ipcRenderer.invoke('window:fullscreen', enable),
    isFullscreen: () => ipcRenderer.invoke('window:is-fullscreen')
  },
  app: {
    getVersion: () => ipcRenderer.invoke('app:version'),
    restart: () => ipcRenderer.invoke('app:restart')
  }
}

try {
  contextBridge.exposeInMainWorld('electronAPI', electronAPI)
} catch (err) {
  // ignore when sandbox or bridge unavailable
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export type { ElectronAPI as default }
