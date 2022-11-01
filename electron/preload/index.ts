import { contextBridge } from "electron";

import type { AppVersions } from "@/types/electron-preload/versions";

const appVersions: AppVersions = {
  app: () => __APP_VERSION__,
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
};

contextBridge.exposeInMainWorld("appVersions", appVersions);
