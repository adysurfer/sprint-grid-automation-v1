const reporter =  require('cucumber-html-reporter')

const options = {
      baseUrl: "https://localhost:4200",
      pageTimeout: "20000",
      headlessMode: false,
      theme: "bootstrap",
      jsonFile: "e2e/output/results.json",
      output: "e2e/output/report/cucumber-report.html",
      screenshotsDirectory: "e2e/output/screenshots/",
      reportSuiteAsScenarios: false,
      launchReport: false,
      storeScreenshots: false,
    }

 reporter.generate(options)