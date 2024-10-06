import { cardDetails } from '../../data/cardDetails';

const { expect } = require('@playwright/test');

export class PaymentPage{

    constructor(page) {
        this.page=page
        this.discountCode=page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput=page.locator('[data-qa="discount-code-input"]')
        this.discountButton=page.locator('[data-qa="submit-discount-button"]')
        this.discountAppliedMsg=page.locator('[data-qa="discount-active-message"]')
        this.totalPrice=page.locator('[data-qa="total-value"]')
        this.discountedPrice=page.locator('[data-qa="total-with-discount-value"]')

        this.creditCardOwner= page.locator('[data-qa="credit-card-owner"]')
        this.creditCardNum= page.locator('[data-qa="credit-card-number"]')
        this.creditCardValid= page.locator('[data-qa="valid-until"]')
        this.creditCardOCvv= page.locator('[data-qa="credit-card-cvc"]')
        this.makePaymentButton = page.locator('[data-qa="pay-button"]')
        

    }
   activateDiscount = async() => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()

        //Option 1 for input with fill()
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)


        // //Option 2 for input:slow typing
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code, {delay: 1000 })
        // expect(await this.discountInput.inputValue()).toBe(code)


        await this.discountButton.click()
        await this.discountAppliedMsg.waitFor()
       // expect(this.discountAppliedMsg).toBe("Discount activated!")
       const totalPriceText=await this.totalPrice.innerText()
       //console.log(totalPriceText)
       const totalPriceString=totalPriceText.replace("$", "");
       //console.log(totalPriceString)
       const totalPriceNumber=Number(totalPriceString.replace(/,/g, ""));
       //console.log(totalPriceNumber)

       const discountedPriceText=await this.discountedPrice.innerText()
       const discountedPriceString= discountedPriceText.replace("$", "");
       const discountedPriceNumber=Number(discountedPriceString.replace(/,/g, ""));
       //console.log(discountedPriceNumber)
       expect(totalPriceNumber).toBeGreaterThan(discountedPriceNumber)
    
    }

    makePayment = async() => {

        await this.creditCardOwner.waitFor()
        await this.creditCardOwner.fill(cardDetails.creditCardOwner)
        await this.creditCardNum.fill(cardDetails.creditCardNum)
        await this.creditCardValid.fill(cardDetails.creditCardValid)
        await this.creditCardOCvv.fill(cardDetails.creditCardCvv)

        await this.makePaymentButton.waitFor()
        await this.makePaymentButton.click()

        await this.page.waitForURL("/thank-you")



    }
}