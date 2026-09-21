# DashDX - Angular and DevExtreme Basics

See [Project Setup](README_SETUP.md) for commands and the [overview](README.md) for features and limitations.

## Frontend and backend

The **frontend** runs in the browser and displays the dashboard, chart, table, buttons, and selectors. This project uses Angular, TypeScript, HTML, CSS, DevExtreme, and Gridster for that interface.

A **backend** would process requests on a server, authenticate users, and access a database. The main application currently has no such backend. Data comes from arrays and a timer in [app.ts](src/app/app.ts).

The Node.js development server serves frontend files. It does not provide saved dashboard data or business logic. Registering Angular's HTTP client makes HTTP services available for future use; it does not make requests by itself.

## Angular and components

**Angular** organizes the interface into components. A component combines a TypeScript class, an HTML template, and styles.

This application places its dashboard in the standalone root `App` component:

- [app.ts](src/app/app.ts): data, event handlers, and imported UI modules.
- [app.html](src/app/app.html): interface structure and data bindings.
- [app.css](src/app/app.css): layout and appearance.

**Standalone** means the component declares its own template dependencies in its `imports` array.

**TypeScript** adds type checking to JavaScript. `DashboardItem` describes widget properties such as ID, type, position, and size. Its `data?: any` field currently allows arbitrary data rather than enforcing separate chart/table/info shapes.

## Angular, DevExtreme, and Gridster have different roles

| Tool | Responsibility here |
| --- | --- |
| Angular | Connects application state to the rendered interface |
| DevExtreme | Supplies chart, table, button, and selector controls |
| devextreme-angular | Exposes those controls as Angular components |
| angular-gridster2 | Positions widgets and handles dragging/resizing |
| RxJS | Schedules simulated updates |
| CSS | Styles the dashboard and controls |

DevExtreme is a UI component library, not a backend or database. Gridster arranges the components but does not generate their data.

## DevExtreme controls used here

| Component | Purpose |
| --- | --- |
| `dx-chart` | Displays the sample line chart |
| `dxi-series` | Maps time and value fields to the chart series |
| `dx-data-grid` | Displays sensor records as rows |
| `dxi-column` | Defines a column's data field and caption |
| `dx-select-box` | Displays the time-range choices |
| `dx-button` | Invokes the add-widget handler |

For the chart, `argumentField="time"` identifies the horizontal labels and `valueField="value"` identifies the plotted values:

```ts
[
  { time: '10:00', value: 20 },
  { time: '11:00', value: 35 }
]
```

The DataGrid instead receives objects with `name`, `value`, and `status` properties. Both controls use arrays from the component as their `dataSource`.

## Template binding

| Syntax | Meaning |
| --- | --- |
| `{{ item.title }}` | Displays a value as text |
| `[dataSource]="item.data"` | Passes data to a control |
| `[options]="options"` | Passes configuration to Gridster |
| `(onClick)="addWidget()"` | Handles a DevExtreme button event |
| `[(value)]="selectedRange"` | Keeps the select-box value and component property in sync |
| `*ngFor` | Repeats markup for each widget |
| `[ngSwitch]` / `*ngSwitchCase` | Selects the markup for each widget type |

Two-way binding updates `selectedRange`, but it does not automatically filter data. The component must implement that behavior separately.

## Grid coordinates

Each widget has:

- `x` and `y`: starting column and row, counted from zero.
- `cols` and `rows`: width and height in grid cells.
- `id`: identifier.
- `type`: chart, table, or information.
- `title` and `data`: widget content.

The grid has 12 columns and uses `GridType.Fit`. Dragging and resizing are enabled; `pushItems` allows Gridster to move other items during supported placement interactions.

New information widgets start at (0, 0). The current add method does not calculate a free position.

## Simulated updates with RxJS

`interval(3000)` produces timer events approximately every three seconds. The subscription finds the chart widget, appends a random number and a local time label, and removes the oldest point when there are more than ten.

This is simulated activity inside the browser, not live server data. The current subscription is not cleaned up on component destruction, which is a lifecycle issue to address when developing the application further.

## Follow an Add Widget click

1. The DevExtreme button emits `onClick`.
2. Angular calls `addWidget()`.
3. The method creates an information widget with a generated ID.
4. A new array is assigned to `dashboardItems`.
5. Angular renders another Gridster item.
6. Gridster determines how it fits with the current layout.

The array lives in memory. A browser reload starts the component again and discards changes. Persistent layouts would need explicit storage and restore logic.

## Configuration and tools

| File/tool | Purpose |
| --- | --- |
| package.json | Dependencies and npm commands |
| package-lock.json | Resolved dependency versions |
| angular.json | Builders, theme CSS, assets, and size budgets |
| src/main.ts | Starts Angular |
| app.config.ts | Registers application services |
| app.routes.ts | Route list, currently empty |
| npm | Installs packages and runs scripts |
| Angular CLI | Serves, builds, and tests the app |

The nested template gallery has its own configuration and framework examples. It is not the main application's backend.

A useful reading order is the HTML template, the `App` class, its styles, then `angular.json` and `package.json`.
