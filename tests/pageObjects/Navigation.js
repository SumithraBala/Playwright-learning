const { expect } = require('@playwright/test');
import { isDesktopViewport } from '../../utils/isDesktopViewport';
export class Navigation {
    constructor (page) {
        this.page=page;

        this.basketCounter= page.locator('[data-qa="header-basket-count"]')
        this.checkoutLink= page.getByRole('link',{name:'checkout'}) 
        this.mobileburgerButton= page.locator('[data-qa="burger-button"]')


    }

    getBasketCount = async() => {
        //return a number
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        return parseInt(text)
       }

    goToCheckout = async() => {
        if(!isDesktopViewport(this.page)) {
            await this.mobileburgerButton.waitFor()
            await this.mobileburgerButton.click()
        }
        
        await this.checkoutLink.waitFor();
        await this.checkoutLink.click();
        await this.page.waitForURL('/basket')


    }  

}