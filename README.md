# DashDX

An Angular dashboard using DevExtreme UI components and Gridster layouts.

**Suggested short name:** DashDX. **Subtitle:** Angular DevExtreme Dashboard. The existing package/project identifier remains `devextreme-standard`; these guides do not rename application code.

## Documentation

- [Project setup](README_SETUP.md): installation, development commands, and troubleshooting.
- [Angular and DevExtreme basics](README_BASICS.md): frontend/backend concepts and a walkthrough of the code.
- [Nested template gallery](devextreme-ui-template-gallery/README.md): separate examples with their own dependencies and commands.

## What the main application does

- Displays a DevExtreme line chart with initial sample data.
- Appends a random chart value every three seconds, retaining up to ten points.
- Displays a DevExtreme DataGrid containing sample sensor readings.
- Arranges chart, table, and information widgets using Gridster.
- Allows dragging, resizing, and adding information widgets.
- Provides a time-range selector that currently updates only the selected value.

The sensor values and status messages are hardcoded examples. Chart updates are simulated in the browser, not received from sensors or a server.

## Frontend and backend

| Part | Current implementation |
| --- | --- |
| Frontend framework | Angular 21 with a standalone root component |
| Language and styling | TypeScript 5.9, HTML templates, CSS |
| UI components | DevExtreme and devextreme-angular 25.2 |
| Dashboard layout | angular-gridster2 21 |
| Timed updates | RxJS 7.8 |
| Build tooling | Angular CLI/build 21 and npm |
| Tests | Angular unit-test builder, Vitest 4, jsdom |
| Backend/API | No application backend or API calls in the root application's source |
| Database/persistence | No database or saved layouts |

`provideHttpClient()` is registered, but no HTTP requests are implemented in the main app. Angular's development server serves the frontend; it is not a business API.

## Main files

| File | Responsibility |
| --- | --- |
| [src/main.ts](src/main.ts) | Starts Angular |
| [app.ts](src/app/app.ts) | Widget state, Gridster settings, simulated updates, add/remove methods |
| [app.html](src/app/app.html) | Toolbar, chart, data grid, and information widgets |
| [app.css](src/app/app.css) | Dashboard layout and styling |
| [app.config.ts](src/app/app.config.ts) | Registers application providers |
| [app.routes.ts](src/app/app.routes.ts) | Currently an empty route list |
| [angular.json](angular.json) | Build configuration and DevExtreme light theme |
| [package.json](package.json) | Dependencies and npm scripts |

The root component displays the dashboard directly at `/`; there are no configured feature routes.

## Separate template gallery

`devextreme-ui-template-gallery/` has its own package.json and workspace packages for Angular, React, Vue, and supporting tools. The root application's imports and build configuration do not integrate it. Running `npm start` from this project's root starts DashDX, not the gallery. Its documentation is preserved.

## Current limitations

- Layouts, added widgets, and chart history reset when the app reloads.
- Changing the time range does not filter the chart.
- A `removeWidget()` method exists, but the template has no remove control.
- New widgets start at coordinate (0, 0); placement relies on Gridster's behavior.
- The RxJS interval subscription is not disposed when the component is destroyed.
- Chart data is mutated in place; actual redraw behavior should be checked in a browser.
- The starter test expects an old greeting heading that is absent from the current template.

This is a frontend demonstration. This documentation update reviewed the source but did not run builds, tests, or browser checks.
