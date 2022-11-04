import type { ContextBridge } from "electron";
import type { AppVersions } from "@/electron/preload/types/electron-preload/versions";

export const exposeVersions = (contextBridge: ContextBridge): void => {
  const appVersions: AppVersions = {
    app: () => __APP_VERSION__,
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
  };

  contextBridge.exposeInMainWorld("appVersions", appVersions);
};
