const { Given, When, Then, Before, After } = require('cucumber')

Before(async function () {
  return await this.openBrowser()
})

After(async function () {
  return await this.closeBrowser()
})

//Background
Given('I open sprint-grid web application page', async function () {
  return await this.visit()
})

When('I click on add task plus \+ button', async function () {
  return await this.expandButton()
})

When('I fill task name as {string}', async function (taskName) {

  return await this.fillTaskName(taskName)

})

