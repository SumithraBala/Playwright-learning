const { expect } = require('@playwright/test');

export class LoginPage {

    constructor(page) {

        this.page=page;
        this.registerButton= page.locator('[data-qa="go-to-signup-button"]')
    }

    GotoRegister = async () => {

        await this.registerButton.waitFor()
        await this.registerButton.click()
        await this.page.waitForURL(/\/signup/)
    }
}