Template Project: Vite + Electron + Typescript + React

Editor: Visual Studio Code

> **NOTE**
> 
> Unfortunately, sometimes the sourcemap is not generated correctly.
> This appears to be [a bug in Vite](https://github.com/vitejs/vite/issues/5916).
> The debugger in Viausl Studio Code also does not work because of this bug.

## Setup

```shell
$ yarn install
```

## Build

```shell
$ yarn run build
```

Dist files:

- `dist`: Vite generated.
- `dist-electron`: vite-plugin-electron generated.
- `dist-release`: `electron-builder` generated (release it).

## Development

Launch configuration `Debug Electron` (Visual Studio Code debug configuration).

Or run task:

```shell
$ yarn run dev
```

## Test

```shell
$ yarn run test
```

## Format

```shell
$ yarn run format
```

## Lint

```shell
$ yarn run lint
```
