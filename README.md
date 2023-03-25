<p align="center">
  <a href="#">
    
  </a>
  <p align="center">
   <img width="150" height="150" src="https://github.com/alekseytsvetkov/chronowise/blob/main/packages/assets/images/AppLogo.png" alt="Logo">
  </p>
  <h1 align="center"><b>Chronowise</b></h1>
  <p align="center">
  A focus timer from the future.
    <br />
    <a href="https://chronowise.vercel.app"><strong>chronowise.io »</strong></a>
    <br />
    <br />
    macOS
    ·
    Windows
    ·
    Linux
    <br />
  </p>
</p>

Chronowise is an open source cross-platform focus timer.
<br/>
<br/>

> NOTE: Chronowise is under active development, most of the features are still experimental and subject to change.

## Monorepo structure:

### Apps:

- `desktop`: A [Tauri](https://tauri.studio) app.
- `landing`: A [React](https://reactjs.org) app using Vite SSR & Vite pages.

### Packages:

- `ui`: A [React](https://reactjs.org) Shared component library.
- `interface`: The complete user interface in React (used by apps `desktop` and `landing`)
- `config`: `eslint` configurations (includes `eslint-config-next`, `eslint-config-prettier` and all `tsconfig.json` configs used throughout the monorepo.
