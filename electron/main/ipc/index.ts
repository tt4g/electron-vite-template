import type { IpcMain } from "electron";
import { registerLoggingCallback } from "./logging";

export const registerIpcMainCallback = (ipcMain: IpcMain): void => {
  registerLoggingCallback(ipcMain);
};
