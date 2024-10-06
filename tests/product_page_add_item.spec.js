// @ts-check
const { test, expect } = require('@playwright/test');

test.skip('add item to cart and is present in cart ', async ({ page }) => {
    await page.goto('/');
    const addToBasketButton= page.locator('[data-qa="product-button"]').first();
    const basketCounter= page.locator('[data-qa="header-basket-count"]')
    expect(basketCounter).toHaveText("0")
    await addToBasketButton.waitFor()
    expect(addToBasketButton).toHaveText("Add to Basket")

    await addToBasketButton.click();

    expect(addToBasketButton).toHaveText("Remove from Basket")
    expect(basketCounter).toHaveText("1")
    const checkoutLink= page.getByRole('link',{name:'checkout'}) 
    await checkoutLink.waitFor();
    await checkoutLink.click();
    await page.waitForURL('/basket')
    
})
