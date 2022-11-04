import type { IpcMain, IpcMainEvent } from "electron";

const logLevels = ["debug", "info", "error"] as const;
export type LogLevel = typeof logLevels[number];

const logKey = "logging:log";
export type LogKey = typeof logKey;

export type LogCallback = (
  event: IpcMainEvent,
  ...args: [LogLevel, ...any]
) => void;
const logCallback: LogCallback = (_event, logLevel, ...args) => {
  // Calling the `console` methods from Electron Main Process will output to
  // the terminal (Node.js terminal).
  switch (logLevel) {
    case "error":
      console.error(...args);
      return;
    case "info":
      console.info(...args);
      return;
    case "debug":
      console.debug(...args);
      return;
    default: {
      const _exhaustiveCheck: never = logLevel;
      throw new Error(`Unknown log level: "${logLevel}"`);
    }
  }
};

export type RegisterLoggingCallback = (ipcMain: IpcMain) => void;
export const registerLoggingCallback: RegisterLoggingCallback = (ipcMain) => {
  ipcMain.on(logKey, logCallback);
};
