import { contextBridge, ipcRenderer } from "electron";
import { exposeMainWorld } from "@/electron/preload/expose";

exposeMainWorld(contextBridge, ipcRenderer);
