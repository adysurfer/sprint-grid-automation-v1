const { setWorldConstructor } = require('cucumber')
const { expect } = require('chai')
const puppeteer = require('puppeteer')

class SprintGrid {
  async openBrowser() {
   this.browser = await puppeteer.launch({ headless: false })
   this.page = await this.browser.newPage()
   this.page.setViewport({ width: 1366, height: 768})
  }
  
  

  async visit() {
    await this.page.goto("http://localhost:4200")
   }

  async clickTaskBtn() {
    const next = await this.page.waitForSelector("app-task-add [class*='mat-focus-indicator'] span mat-icon")
    await next.click()   
  }

  async fillTaskName(taskName) {
    const taskInput =  await this.page.waitForSelector("app-task-add form mat-form-field div div div input")
    await taskInput.type(taskName) 

  }

  async addTask() {
    await new Promise(r => setTimeout(r, 500))
    const addTask = await this.page.waitForSelector("button[class *= 'task-form__add-button']")
    addTask.click()
  }

  async verifyTaskAdded(taskName) {
    await new Promise(r => setTimeout(r, 300))
    const text = await this.page.$$eval("div[class='table__task']", (row) => row.map(e => e.innerText))
        const lastElement = text.pop().trim()
        expect(lastElement).to.equal(taskName)
  }

  async clearTaskInputField() {
    const taskInput =  await this.page.waitForSelector("app-task-add form mat-form-field div div div input")
    await taskInput.click({clickCount: 3})
    await taskInput.press('Backspace')
  }

  async verifyTaskPlaceholderText(msg) {
    const taskPlaceholder = await this.page.$("app-task-add form mat-form-field div div span label mat-label")
    expect(await taskPlaceholder.evaluate(el => el.innerText.trim())).to.equal(msg)
  }
  async verifyTaskValidationMsg(msg) {
    await new Promise(r => setTimeout(r, 500))
    const validation = await this.page.$eval("app-task-add form mat-form-field div div mat-error", el => el.textContent)
    expect(validation.trim()).to.equal('The title is requined')
  }
    
  async verifyTaskValidationMsg2(msg) {
    await new Promise(r => setTimeout(r, 500))
    const validation = await this.page.$eval("app-task-add form mat-form-field div div mat-error", el => el.textContent)
    expect(validation.trim()).to.equal('The task with such name already exists')
  } 

  async verifyTaskValidationMsgColor(clr) {
    const validation = await this.page.$eval("app-task-add form mat-form-field div div mat-error", el => getComputedStyle(el).color)
    expect(validation).to.equal(clr)
  }

  async verifyDisabledAddTaskBtn() {
    await new Promise(r => setTimeout(r, 500))
    const  isDisabled = await this.page.$$eval(".task-form__add-button[disabled]", el => el.length)
    expect(isDisabled).to.not.equal(0)
  }

  async clickTaskCollapseBtn() {
    const next = await this.page.waitForSelector("app-task-add [class*='mat-focus-indicator'] span mat-icon")
    await next.click() 
  }

  async verifyTaskCollapse() {
    const validation = await this.page.$("app-task-add [class*='mat-focus-indicator'] span mat-icon")
    expect(await validation.evaluate(el => el.innerText.trim())).to.equal('add')
  }

  async clickDateColumn() {
    const next = await this.page.waitForSelector("app-date-add [class*='mat-focus-indicator'] span mat-icon")
    await next.click() 
  }

  async clickDatepicker() {
    const btn = await this.page.waitForSelector("mat-datepicker-toggle button")
    await btn.click() 
  }

  async selectDate() {
    const next = await this.page.waitForSelector(".mat-calendar-arrow")
    await next.click()
    const year = await this.page.waitForXPath("//div[text() = 2030]")
    await year.click()
    const month = await this.page.waitForXPath("//div[text() = ' DEC ']")
    await month.click()
    const date = await this.page.waitForXPath("//div[text() = 25]")
    await date.click()
  }

  async addDate() {
    await new Promise(r => setTimeout(r, 500))
    const addDate = await this.page.waitForSelector("button[class *= 'date-form__add-button']")
    addDate.click()
  }

  async verifyCreatedDate(date) {
    await new Promise(r => setTimeout(r, 500))
    const text = await this.page.$$eval("th[class*='table__date']", (column) => column.map(cl => cl.innerText.trim()))
    expect(text).to.include(date)
  }

  async clrDate() {
    const taskInput =  await this.page.waitForSelector("app-date-add form mat-form-field div div div input")
    await taskInput.click({clickCount: 3})
    await taskInput.press('Backspace')
  }

  async verifyPlaceholderDatetext(msg) {
    const taskPlaceholder = await this.page.$("app-date-add form mat-form-field div div span label mat-label")
    expect(await taskPlaceholder.evaluate(el => el.innerText.trim())).to.equal(msg)
  }

  async verifyDateValidationMsg(msg) {
    await new Promise(r => setTimeout(r, 500))
    const validation = await this.page.$eval("app-date-add form mat-form-field div div mat-error", el => el.textContent)
    expect(validation.trim()).to.equal(msg)
  }

  async verifyDateValidationMsgColor(clr) {
    const validation = await this.page.$eval("app-date-add form mat-form-field div div mat-error", el => getComputedStyle(el).color)
    expect(validation).to.equal(clr)
  }

  async verifyDisabledAddDateBtn() {
    await new Promise(r => setTimeout(r, 500))
    const  isDisabled = await this.page.$$eval(".date-form__add-button[disabled]", el => el.length)
    expect(isDisabled).to.not.equal(0)
  }
//'Follow the format mm/dd/yyyy'
  async verifyDateValidationMsg2(msg, dataTable) {

    const dateInput =  await this.page.waitForSelector("app-date-add form mat-form-field div div div input")
    for (let i=1; i< dataTable.rawTable.length; i++) {
      
      await dateInput.type(dataTable.rawTable[i])

      await new Promise(r => setTimeout(r, 500))

      let visible = true
      await this.page.waitForSelector("app-date-add form mat-form-field div div mat-error", { visible: true })
        .catch(() => {
        visible = false
    })
      expect(visible).to.be.true
      const validation = await this.page.$eval("app-date-add form mat-form-field div div mat-error", el => el.textContent)
      expect(validation.trim()).to.equal(msg)
        const taskInput =  await this.page.waitForSelector("app-date-add form mat-form-field div div div input")
        await taskInput.click({clickCount: 3})
        await taskInput.press('Backspace')    
    }
  }

  async inputDate(date) {
    const dateInput =  await this.page.waitForSelector("app-date-add form mat-form-field div div div input")
    await dateInput.type(date)
  }

  async verifyDateValidationMsg3(msg) {
    await new Promise(r => setTimeout(r, 500))
    const validation = await this.page.$eval("app-date-add form mat-form-field div div mat-error", el => el.textContent)
    expect(validation.trim()).to.equal(msg)
  }
 
  async clickDateCollapseBtn() {
    const next = await this.page.waitForSelector("app-date-add [class*='mat-focus-indicator'] span mat-icon")
    await next.click() 
  }

  async verifyDateCollapse() {
    const validation = await this.page.$("app-date-add [class*='mat-focus-indicator'] span mat-icon")
    expect(await validation.evaluate(el => el.innerText.trim())).to.equal('add')
  }





}

setWorldConstructor(SprintGrid)