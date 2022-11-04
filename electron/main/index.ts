// Enable sourcemap support.
import "source-map-support/register";

import path from "path";

import electronIsDev from "electron-is-dev";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import { app, BrowserWindow, ipcMain } from "electron";
import { registerIpcMainCallback } from "@/electron/main/ipc";

if (process.platform === "win32") {
  // Set application name for Windows 10+ notifications
  app.setAppUserModelId(app.getName());
}

registerIpcMainCallback(ipcMain);

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "electronPreload.js"),
    },
  });

  if (electronIsDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  if (electronIsDev) {
    // Vite dev server.
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(
      path.join(__dirname, "..", "..", "dist", "renderer", "index.html")
    );
  }
};

app.whenReady().then(() => {
  if (!electronIsDev) {
    installExtension([REACT_DEVELOPER_TOOLS])
      .then((installedName) =>
        console.log(`Chrome extension installed: ${installedName}.`)
      )
      .catch((err) =>
        console.log(
          "An error occurred in install Chrome extension process: ",
          err
        )
      );
  }

  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
