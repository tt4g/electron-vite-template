export type AppVersions = Readonly<{
  node: () => string;
  chrome: () => string;
  electron: () => string;
}>;
