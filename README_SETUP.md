# DashDX - Project Setup

Read the [overview](README.md) for project status or the [basics guide](README_BASICS.md) for concepts.

## Requirements

- Node.js satisfying the installed Angular CLI requirement: `^20.19.0 || ^22.12.0 || >=24.0.0`.
- npm; `package.json` declares `npm@11.8.0`. Ensure your Node version also satisfies the npm version you use.
- A modern browser and internet access for initial dependency installation.

There is no backend or database to configure for the main application. npm scripts use the local Angular CLI, so a global CLI installation is unnecessary.

## 1. Install dependencies

Run these commands in PowerShell from the main application folder:

```powershell
cd E:\Angular\devextreme-standard
node --version
npm --version
npm ci
```

`npm ci` installs from the existing lockfile. The nested template gallery is a separate workspace and does not need to be installed to run this app.

## 2. Start the dashboard

```powershell
npm start
```

Open `http://localhost:4200/`, or the address printed by Angular. Source edits trigger development rebuilds.

If another Angular application uses port 4200:

```powershell
npm start -- --port 4201
```

Stop the server with Ctrl+C.

## 3. Check the behavior

1. Confirm the line chart, sensor table, and system information appear.
2. Wait several seconds and check that simulated chart points update.
3. Drag and resize widgets.
4. Click **Add Widget** to add an information widget.
5. Select another time range: only the selection changes in the current implementation.
6. Reload the page: the original widget layout and initial data are restored.

There is no widget-delete button even though the component defines a removal method. The chart timer appends random values every three seconds and limits the array to ten points; rendering should be verified in the browser because the array is updated in place.

## DevExtreme theme

[angular.json](angular.json) loads:

```text
node_modules/devextreme/dist/css/dx.light.css
src/styles.css
```

The light theme supplies the DevExtreme controls' styling. Keep the theme entry when editing build configuration and restart the development server after configuration changes.

The root source does not configure a DevExtreme license key. If DevExtreme reports a license message, follow the instructions for your installed DevExtreme version and your account; installing dependencies alone does not configure a license.

## Build

```powershell
npm run build
```

The default build configuration is production. With the current project identifier and default application-builder output layout, browser assets are expected under `dist/devextreme-standard/browser`; confirm the output path in the build log.

The configured production budgets are:

| Budget | Warning | Error |
| --- | --- | --- |
| Initial bundle | 500 kB | 1 MB |
| Individual component stylesheet | 4 kB | 8 kB |

DevExtreme imports and global theme CSS contribute to build size. If a budget fails, inspect the actual report before adjusting limits.

For a development build:

```powershell
npm run build -- --configuration development
```

`npm run watch` rebuilds development output continuously; it does not serve a website. Use `npm start` for the development server. Production browser output can be served by a static web host.

## Tests

```powershell
npm test -- --watch=false
```

Tests use the Angular unit-test builder with Vitest and jsdom. The existing root spec expects `Hello, devextreme-standard` inside an h1, but the current template contains no such heading. That assertion is outdated. The repeating interval also needs appropriate lifecycle cleanup and test handling.

There is no root lint script or end-to-end testing target. No build or test run was performed for this documentation-only change.

## Nested gallery

The [DevExtreme UI Template Gallery README](devextreme-ui-template-gallery/README.md) describes its own installation and framework-specific startup commands. Its packages are separate from the root app and may require different runtime versions. Follow that guide only when you want to run the gallery.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Unsupported Node version | Check Angular CLI and npm compatibility |
| PowerShell blocks npm.ps1 | Use `npm.cmd`, for example `npm.cmd ci` |
| Port already in use | Choose another port with `npm start -- --port 4201` |
| Controls look unstyled | Verify the DevExtreme CSS entry in angular.json |
| Chart does not refresh | Inspect console errors and the in-place dataSource update |
| Time selector does not filter | Filtering is not connected yet |
| Widgets reset on reload | Persistence is not implemented |
| Unit test fails on heading | Update the generated greeting assertion |
| Build exceeds budget | Inspect bundle and stylesheet size reports |
| Wrong application starts | Confirm you are in the root folder, not the nested gallery |
