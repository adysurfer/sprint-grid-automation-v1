const { Given, When, Then, Before, After } = require('cucumber')

Before(async function () {
  return await this.openBrowser()
})



//Background
Given('I open sprint-grid web application page', async function () {
  return await this.visit()
})

When('I click on add task plus \+ button', async function () {
  return await this.clickTaskBtn()
})

When('I fill task name as {string}', async function (taskName) {

  return await this.fillTaskName(taskName)
})

When('I click on Add button for task input', async function () {
  return await this.addTask()
})

Then('I am able to add a new task row as {string}', async function (taskName) {
  return await this.verifyTaskAdded(taskName)
})

When('I clear the text in Add task input field', async function () {
  return await this.clearTaskInputField()
})

Then('I see the task input placeholder value as {string}', async function (msg) {
  return await this.verifyTaskPlaceholderText(msg)
})

Then('I see validation message for task input field as {string}', async function (msg) {
  return await this.verifyTaskValidationMsg(msg)
})

Then('I see validation message text color for task input field as {string}', async function (clr) {
  return await this.verifyTaskValidationMsgColor(clr)
})

Then('I see the Add button for adding task is disabled', async function () {
  return await this.verifyDisabledAddTaskBtn()
})

Then('I see validation for task input field as {string}', async function (msg) {
  return await this.verifyTaskValidationMsg2(msg)
})

When('I click on close task button X', async function () {
  return await this.clickTaskCollapseBtn()
})

Then('The add task input field is collapsed', async function () {
  return await this.verifyTaskCollapse()
})

When('I click on Add date column \+ button', async function () {
  return await this.clickDateColumn()
})

When('I click on the datepicker icon', async function () {
  return await this.clickDatepicker()
})

When('I select the date from datepicker', async function () {
  return await this.selectDate()
})

When('I click on Add button for date column', async function () {
  return await this.addDate()
})

Then('I am able to create a new date column as {string}', async function (date) {
  return await this.verifyCreatedDate(date)
})

When('I clear the date from date input field', async function () {
  return await this.clrDate()
})

Then('I see the date input placeholder value as {string}', async function (msg) {
  return await this.verifyPlaceholderDatetext(msg)
})

Then('I see a validation message for date input field as {string}', async function (msg) {
  return await this.verifyDateValidationMsg(msg)
})

Then('I see validation message text color for date input field as {string}', async function (clr) {
  return await this.verifyDateValidationMsgColor(clr)
})

Then('I see the Add button for adding date is disabled', async function () {
  return await this.verifyDisabledAddDateBtn()
})

Then('I enter date and verify validation msg for date input field as {string}', async function (msg, dataTable) {
  return await this.verifyDateValidationMsg2(msg, dataTable)
})

When('I enter date as {string}', async function (date) {
  return await this.inputDate(date)
})

Then('I see a validation for date input field as {string}', async function (msg) {
  return await this.verifyDateValidationMsg3(msg)
})

When('I click on close date column button X', async function () {
  return await this.clickDateCollapseBtn()
})

Then('The date column input field is collapsed', async function () {
  return await this.verifyDateCollapse()
})


