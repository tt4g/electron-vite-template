import type { ContextBridge, IpcRenderer } from "electron";
import type { RendererLogger } from "@/electron/preload/types/electron-preload/logging";
import type { LogKey } from "@/electron/main/ipc/logging";

export const exposeLogging = (
  contextBridge: ContextBridge,
  ipcRenderer: IpcRenderer
): void => {
  const logKey: LogKey = "logging:log";
  const rendererLogger: RendererLogger = {
    error: (...args: any) => ipcRenderer.send(logKey, "error", ...args),
    info: (...args: any) => ipcRenderer.send(logKey, "info", ...args),
    debug: (...args: any) => ipcRenderer.send(logKey, "debug", ...args),
  };

  contextBridge.exposeInMainWorld("rendererLogger", rendererLogger);
};
