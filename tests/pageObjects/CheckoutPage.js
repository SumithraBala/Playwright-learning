const { expect } = require('@playwright/test');

export class CheckoutPage {

    constructor(page) {
        this.page=page;
        this.basketCard =  page.locator('[data-qa="basket-card"]')
        this.basketItemPrices = page.locator('[data-qa="basket-item-price"]')
        this.removeButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueButton = page.locator('[data-qa="continue-to-checkout"]')
       }

    removeChepeastProduct =  async () => {
        //await this.page.pause()
        await this.basketItemPrices.first().waitFor()
        const itemsBefore = await this.basketCard.count()
        const allPriceTexts = await this.basketItemPrices.allInnerTexts()
        //console.warn({allPriceTexts}) { allPriceTexts: [ '499$', '599$', '320$' ] }
        const justNumbers = allPriceTexts.map((element) => {
            const priceWithoutDollar = element.replace('$', ''); 
            return parseInt(priceWithoutDollar)
        })
        //console.warn({justNumbers})  { justNumbers: [ 499, 599, 320 ] }
        const smallestPrice = Math.min(...justNumbers)
        const smallestPriceIndex = justNumbers.indexOf(smallestPrice)
        const specificRemoveButton = this.removeButton.nth(smallestPriceIndex)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        await expect(this.basketCard).toHaveCount(itemsBefore - 1)
        //console.warn ({smallestPrice})
    }
    ContinueToCheckout = async () => { 
        await this.continueButton.waitFor()
        await this.continueButton.click()
        await this.page.waitForURL(/\/login/)


    }

}