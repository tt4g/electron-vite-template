import type { LogLevel } from "@/electron/main/ipc/logging";

type LogFunction = (...args: any) => void;

export type RendererLogger = Readonly<{
  [P in LogLevel]: LogFunction;
}>;
