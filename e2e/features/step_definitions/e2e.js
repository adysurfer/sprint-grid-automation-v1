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
    const cl =document.getElementsByClassName('.task-form__add-button')[0]

    await cl.click()


    //const element = await this.page.$(".task-form__add-button")
    //await this.page.evaluate(element => element.click(), element)

    //const cl = await this.page.waitForXPath("/html[1]/body[1]/app-root[1]/app-grid[1]/app-task-add[1]/form[1]/button[1]/span[1]")
    //await cl.click()

    
    //const cl = await this.page.waitForXPath("//button[contains(@class, 'task-form__add-button')]")  // hit enter

    //await document.getElement(".task-form__add-button").click()



  
  }


}

setWorldConstructor(SprintGrid)