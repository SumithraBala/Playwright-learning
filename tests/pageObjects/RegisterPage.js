const { expect } = require('@playwright/test');


export class RegisterPage {

    constructor(page) {

        this.page=page;
        this.emailId= page.getByPlaceholder("E-Mail")
        this.password= page.getByPlaceholder("Password")
        this.registerButton= page.getByRole("button", {name:"register"})
    }

    SignupUser = async (email,password) => {
        await this.emailId.waitFor()
        await this.emailId.fill(email)
        await this.password.fill(password)

        await this.registerButton.click()
        
    }
   
}