// Declares the API exposed by `electron.contextBridge.exposeInMainWorld()` from
// `electron/preload/`.

declare const appVersions: import("./versions").AppVersions;

declare const rendererLogger: import("./logging").RendererLogger;
