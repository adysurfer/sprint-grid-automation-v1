const { setWorldConstructor } = require('cucumber')
const { expect } = require('chai')
const puppeteer = require('puppeteer')

class SprintGrid {
  sayHello() {
   return  'hello'
  }
}

setWorldConstructor(SprintGrid)