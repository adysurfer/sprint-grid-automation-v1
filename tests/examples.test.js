const { expect } = require('chai')
const puppeteer = require('puppeteer')


describe('Bull', function() {

    it('Bull', async function() {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto("http://localhost:4200")

        await page.waitForSelector("div[class='table__task']")
        //let element = await page.$$("div[class='table__task']")
        //let value = await page.evaluate(els => els.forEach(el => el.innerText), element)      
        //const rowTitles = await page.evaluate("div[class='table__task']", el => el.innerText, el)
        //const text = await page.$$("div[class='table__task']", els => els.forEach(el => el.innerText))

        const text = await page.$$eval("div[class='table__task']", (row) => row.map(e => e.innerText))
        const lastElement = text.pop()
        console.log(lastElement.trim())
        expect(lastElement).to.equal('Task 3')
          


        //const h = await page.$$eval("div[class='table__task']", elHandles => elHandles.forEach(el => el.innerText))
        //console.log(h)

        browser.close()
       



         
    })
})