const { setWorldConstructor } = require('cucumber')
const { expect } = require('chai')
const puppeteer = require('puppeteer')
const { click, hover, wait } = require('../support/helpers')

class SprintGrid {

  async openBrowser() {
    this.browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true })
    this.page = await this.browser.newPage()
    await this.page.getDefaultTimeout(10000)
    await this.page.setDefaultNavigationTimeout(20000)
  }
  async closeBrowser() {
    this.browser.close()
  }

  async visit(msg) {
    await this.page.goto("http://localhost:4200")
    const pageTitle = await this.page.title()
    expect(pageTitle).to.equal(msg)
  }

  async clickTaskBtn() {
    await click(this.page, "app-task-add [class*='mat-focus-indicator'] span mat-icon")
  }

  async fillTaskName(taskName) {
    const taskInput = await this.page.waitForSelector("app-task-add form mat-form-field div div div input")
    await taskInput.type(taskName)

  }

  async addTask() {
    await wait(500)
    await click(this.page, "button[class *= 'task-form__add-button']")
  }

  async verifyTaskAdded(taskName) {
    await wait(300)
    const text = await this.page.$$eval("div[class='table__task']", (row) => row.map(e => e.innerText))
    const lastElement = text.pop().trim()
    expect(lastElement).to.equal(taskName)
  }

  async clearTaskInputField() {
    const taskInput = await this.page.waitForSelector("app-task-add form mat-form-field div div div input")
    await taskInput.click({ clickCount: 3 })
    await taskInput.press('Backspace')
  }

  async verifyTaskPlaceholderText(msg) {
    const taskPlaceholder = await this.page.$("app-task-add form mat-form-field div div span label mat-label")
    expect(await taskPlaceholder.evaluate(el => el.innerText.trim())).to.equal(msg)
  }
  async verifyTaskValidationMsg(msg) {
    await wait(500)
    const validation = await this.page.$eval("app-task-add form mat-form-field div div mat-error", el => el.textContent)
    expect(validation.trim()).to.equal(msg)
  }

  async verifyTaskValidationMsg2(msg) {
    await wait(500)
    const validation = await this.page.$("app-task-add form mat-form-field div div mat-error")
    expect(await validation.evaluate(el => el.innerText.trim())).to.equal(msg)
  }

  async verifyTaskValidationMsgColor(clr) {
    const validation = await this.page.$eval("app-task-add form mat-form-field div div mat-error", el => getComputedStyle(el).color)
    expect(validation).to.equal(clr)
  }

  async verifyDisabledAddTaskBtn() {
    await wait(500)
    const isDisabled = await this.page.$$eval(".task-form__add-button[disabled]", el => el.length)
    expect(isDisabled).to.not.equal(0)
  }

  async clickTaskCollapseBtn() {
    await click(this.page, "app-task-add [class*='mat-focus-indicator'] span mat-icon")

  }

  async verifyTaskCollapse() {
    const validation = await this.page.$("app-task-add [class*='mat-focus-indicator'] span mat-icon")
    expect(await validation.evaluate(el => el.innerText.trim())).to.equal('add')
  }

  async clickDateColumn() {
    await click(this.page, "app-date-add [class*='mat-focus-indicator'] span mat-icon")
  }

  async clickDatepicker() {
    await click(this.page, "mat-datepicker-toggle button")
  }

  async selectDate() {
    await click(this.page, ".mat-calendar-arrow")
    const year = await this.page.waitForXPath("//div[text() = 2030]")
    await year.click()
    const month = await this.page.waitForXPath("//div[text() = ' DEC ']")
    await month.click()
    const date = await this.page.waitForXPath("//div[text() = 25]")
    await date.click()
  }

  async addDate() {
    await wait(500)
    await click(this.page, "button[class *= 'date-form__add-button']")
  }

  async verifyCreatedDate(date) {
    await wait(500)
    const text = await this.page.$$eval("th[class*='table__date']", (column) => column.map(cl => cl.innerText.trim()))
    expect(text).to.include(date)
  }

  async clrDate() {
    const taskInput = await this.page.waitForSelector("app-date-add form mat-form-field div div div input")
    await taskInput.click({ clickCount: 3 })
    await taskInput.press('Backspace')
  }

  async verifyPlaceholderDatetext(msg) {
    const taskPlaceholder = await this.page.$("app-date-add form mat-form-field div div span label mat-label")
    expect(await taskPlaceholder.evaluate(el => el.innerText.trim())).to.equal(msg)
  }

  async verifyDateValidationMsg(msg) {
    await wait(1000)
    const validation = await this.page.$("app-date-add form mat-form-field div div mat-error")
    expect(await validation.evaluate(el => el.innerText.trim())).to.equal(msg)
  }

  async verifyDateValidationMsgColor(clr) {
    const validation = await this.page.$eval("app-date-add form mat-form-field div div mat-error", el => getComputedStyle(el).color)
    expect(validation).to.equal(clr)
  }

  async verifyDisabledAddDateBtn() {
    await wait(500)
    const isDisabled = await this.page.$$eval(".date-form__add-button[disabled]", el => el.length)
    expect(isDisabled).to.not.equal(0)
  }
  //'Follow the format mm/dd/yyyy'
  async verifyDateValidationMsg2(msg, dataTable) {

    const dateInput = await this.page.waitForSelector("app-date-add form mat-form-field div div div input")
    for (let i = 1; i < dataTable.rawTable.length; i++) {

      await dateInput.type(dataTable.rawTable[i])

      await wait(500)

      let visible = true
      await this.page.waitForSelector("app-date-add form mat-form-field div div mat-error", { visible: true, timeout: 500 })
        .catch(() => {
          visible = false
        })
      expect(visible).to.be.true

      const validation = await this.page.$("app-date-add form mat-form-field div div mat-error")
      expect(await validation.evaluate(el => el.innerText.trim())).to.equal(msg)
      const taskInput = await this.page.waitForSelector("app-date-add form mat-form-field div div div input")
      await taskInput.click({ clickCount: 3 })
      await taskInput.press('Backspace')
    }
  }

  async inputDate(date) {
    const dateInput = await this.page.waitForSelector("app-date-add form mat-form-field div div div input")
    await dateInput.type(date)
  }

  async verifyDateValidationMsg3(msg) {
    await wait(500)
    const validation = await this.page.$("app-date-add form mat-form-field div div mat-error")
    expect(await validation.evaluate(el => el.innerText.trim())).to.equal(msg)
  }

  async clickDateCollapseBtn() {
    await click(this.page, "app-date-add [class*='mat-focus-indicator'] span mat-icon")
  }

  async verifyDateCollapse() {
    const validation = await this.page.$("app-date-add [class*='mat-focus-indicator'] span mat-icon")
    expect(await validation.evaluate(el => el.innerText.trim())).to.equal('add')
  }

  async clickEmptyCell() {
    await wait(500)
    const next = await this.page.waitForSelector(".create-message")
    await next.click()[0]
  }

  async verifyPlaceholderText(str) {
    await wait(500)
    const validation = await this.page.$eval(".create-message", (el) => el.innerText.trim())
    expect(validation).to.equal(str)
    
  }

  async clickStatus() {
    await click(this.page, ".mat-form-field-infix span label")
  }

  async verifyStatusesList(dataTable) {
    await wait(500)
    const arrOptions = await this.page.$$eval(".mat-option-text", (elements) => elements.map(cl => cl.innerText))

    let myArr = []
    for (let i = 1; i < dataTable.rawTable.length; i++) {
      let z = dataTable.rawTable[i].toString()
      myArr.push(z)
    }
    expect(arrOptions).to.include.members(myArr)
  }

  async selectStatus(str) {
    await this.page.$$eval(".mat-option-text", (elements, _str) => elements.find((el) => el.innerText === _str).click(), str)
  }

  async verifyCellCollapse() {
    await wait(1000)
    const element = await this.page.$(".mat-expansion-indicator")
    const rotationvalue = await element.evaluate(el => el.getAttribute('style'))
    expect(rotationvalue).to.equal('transform: rotate(0deg);')
  }

  async verifySelectedStatus(str) {
    const validation = await this.page.$("mat-panel-title span")
    expect(await validation.evaluate(el => el.innerText.trim())).to.equal(str)
  }

  async clickFilledCell(str) {
    await click(this.page, ".mat-body-strong")
  }

  async enterCellInput(str) {
    await wait(1000)
    const cl = await this.page.waitForSelector('input')
    await cl.click({ clickCount: 3 })
    await cl.type(str)
  }

  async verifyCellRandomStatus(str) {
    await wait(1000)
    const validation = await this.page.$("mat-panel-title span")
    expect(await validation.evaluate(el => el.innerText.trim())).to.not.equal(str)
  }

  async hoverTask(str) {
    await hover(this.page, "tbody[role='rowgroup'] tr td:nth-child(1) div:nth-child(1)", str)

  }

  async verifyRemoveRowBtnVisible() {
    const hoveredRow = await this.page.$$eval("button[class = 'mat-focus-indicator table__task-remove mat-icon-button mat-button-base']", el => el.length)
    expect(hoveredRow).to.equal(1)
  }

  async removeTaskRow() {
    await click(this.page, "button[class = 'mat-focus-indicator table__task-remove mat-icon-button mat-button-base']")

  }

  async verifyDeletedTaskRow(str) {
    let visible = true
    await this.page.waitForXPath(`//*[text()=' ${str} ']`, { visible: true, timeout: 500 })
      .catch(() => {
        visible = false
      })
    expect(visible).to.be.false
  }

  async hoverDate(str) {
    await hover(this.page, "tr[role='row'] th", str)
  }

  async verifyRemoveColumnBtnVisible() {
    const hoveredRow = await this.page.$$eval("button[class = 'mat-focus-indicator table__date-remove mat-icon-button mat-button-base']", el => el.length)
    expect(hoveredRow).to.equal(1)
  }

  async removeDateColumn() {
    await click(this.page, "button[class = 'mat-focus-indicator table__date-remove mat-icon-button mat-button-base")

  }

  async verifyDeletedDateColumn(str) {
    let visible = true
    await this.page.waitForXPath(`//*[text()=' ${str} ']`, { visible: true, timeout: 500 })
      .catch(() => {
        visible = false
      })
    expect(visible).to.be.false
  }
}

setWorldConstructor(SprintGrid)
