module.exports = {
    click: async function (page, selector) {
        try {
            const sl = await page.waitForSelector(selector)
            await sl.click()
        } catch (error) {
            throw new Error(`Could not click on selector: ${selector}`)
        }
    },
    hover: async function (page, sel, str) {
        try {
            const text = await page.$$eval(sel, (column) => column.map(cl => cl.innerText.trim()))
            if (text.includes(str)) {
                const hvr = await page.waitForXPath(`//*[text()=' ${str} ']`)
                await hvr.hover()
            }
            else { console.log('Error: Please check your feature file for missing data') }
        } catch (error) {
            throw new Error(`Could not click on selector: ${selector}`)
        }
    },
    wait: async function (timeout) {
        await new Promise(r => setTimeout(r, timeout))
    }
}