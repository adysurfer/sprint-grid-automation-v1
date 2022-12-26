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
  return await this.expandBtn()
})

Then('The add task input field expands', async function () {
  return await this.verifyExpand()
})

When('I fill task name as {string}', async function (taskName) {

  return await this.fillTaskName(taskName)

})

When('I click on Add button', async function () {
  return await this.addValue()
})

Then('I am able to create a new task row with {string}', async function (taskName) {
  return await this.verifyTaskCreated(taskName)
})

When('I clear the text in Add task input field', async function () {
  return await this.clearTaskInput()
})

Then('I see the placeholder value as {string}', async function () {
  return await this.verifyTaskPlaceholder()
})

Then('I see validation message for task input field as {string}', async function () {
  return await this.verifyTaskValidationMsg()
})

Then('I see validation message text color as {string}', async function () {
  return await this.verifyValidationMsgTextColor()
})

Then('I see the Add button is disabled', async function () {
  return await this.verifyDisabledAddBtn()
})

Then('I see validation message {string}', async function () {
  return await this.verifyTaskValidationMsg2()
})

When('I click on close \'x\' button', async function () {
  return await this.collapseBtn()
})

Then('The add task input field is collapsed', async function () {
  return await this.verifyCollapse()
})
