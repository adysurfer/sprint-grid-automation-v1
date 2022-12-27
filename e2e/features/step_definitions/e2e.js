const { setWorldConstructor } = require('cucumber')
const { expect } = require('chai')
const puppeteer = require('puppeteer')
const { classicNameResolver } = require('typescript/lib/tsserverlibrary')

class SprintGrid {
  async openBrowser() {
   this.browser = await puppeteer.launch({ headless: false })
   this.page = await this.browser.newPage()
  }
  
  

  async visit() {
    await this.page.goto("http://localhost:4200")
   }

  async clickTaskBtn() {
    const next = await this.page.waitForXPath("//app-task-add//button//span//mat-icon")
    await next.click()   
  }

  async fillTaskName(taskName) {

    const data =  await this.page.waitForXPath("//input[@id='mat-input-6']")
    await data.type(taskName) 

  }

  async addTask() {
    //await this.page.$eval("button[type='submit']", form => form.submit())
    await new Promise(r => setTimeout(r, 500))
    const element = await this.page.waitForXPath("//button[contains(@class, 'task-form__add-button')]")
    element.click()
  }
}

setWorldConstructor(SprintGrid)