import type { ContextBridge, IpcRenderer } from "electron";
import { exposeLogging } from "./logging";
import { exposeVersions } from "./versions";

export const exposeMainWorld = (
  contextBridge: ContextBridge,
  ipcRenderer: IpcRenderer
): void => {
  exposeLogging(contextBridge, ipcRenderer);
  exposeVersions(contextBridge);
};
