const { expect } = require('@playwright/test');
import { Navigation } from './Navigation';
import { isDesktopViewport } from '../../utils/isDesktopViewport';


export class ProductPage {

   constructor(page) {
    this.page=page;
    this.addButtons= page.locator('[data-qa="product-button"]')
    this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
    this.productTitle = page.locator('[data-qa="product-title"]')    
   }
   

    visit = async () => {
    await this.page.goto("/")
    }
    

    addProductToBasket = async (index) => {
        const specificAddButton= this.addButtons.nth(index)
        await specificAddButton.waitFor()
        expect(specificAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        let basketCounterBeforeAdding
        //below step will not work in mobile viewport
        if(isDesktopViewport(this.page)) {
             basketCounterBeforeAdding = await navigation.getBasketCount()
        }
        
        await specificAddButton.click();
        expect(specificAddButton).toHaveText("Remove from Basket")
        let basketCounterAfterAdding
        //below step will not work in mobile viewport
        if(isDesktopViewport(this.page)) {
             basketCounterAfterAdding = await navigation.getBasketCount()
            expect(basketCounterAfterAdding).toBeGreaterThan(basketCounterBeforeAdding)
        }
        
       
    }
    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        //order of items 
        await this.productTitle.first().waitFor()
        const productTitleBefore =  await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        const productTitleAfter =  await this.productTitle.allInnerTexts()
        expect(productTitleAfter).not.toEqual(productTitleBefore)
        //await this.page.pause()

    }
    
}