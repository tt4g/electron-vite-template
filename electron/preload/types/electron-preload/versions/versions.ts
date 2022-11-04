export type AppVersions = Readonly<{
  app: () => string;
  node: () => string;
  chrome: () => string;
  electron: () => string;
}>;
