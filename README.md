# Sprint Grid Ver. 1

Sprint Grid is an organizer of tasks and planning them by date.
You can add or remove tasks and dates, change status of the task.
The removing is available when you hover over the task title or date.
Pay attention to validation restrictions.
You can't create tasks with the similar names and the similar dates.

The <strong>automation tests</strong> in this project uses `cucumberJS` with `Puppeteer` Node.js library

## Node.js
Make sure You have successfully installed Node.js (we recommend 16.10.0).
Then install dependencies using `npm install --force` (This will not update the existing dependencies.)

## Localisation
This app is cloned from `master-en` branch, so it has english localisation.

## Development server

Run `ng serve` using `npm start` for a dev server. Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running Automation Tests

**Run Tests**

`npm run tests:pretty` or `npm run tests`

**Generate Report**

`npm run report:html `

cucumber html report will be generated in `output/report` folder

## Folder Structure
```
.
└── e2e
    ├── config
    │   └── report.js
    ├── features
    │   └── step_definitions
    │       ├── e2e.js
    │       ├── sprintGridStepDef.js
    │   └── support
    │       ├── helpers.js
    │   └── sprintgrid.feature
    ├── output
    │   ├── report
   
```






