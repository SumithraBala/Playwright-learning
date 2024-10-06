const { expect } = require('@playwright/test');
import { deliveryDetails } from '../../data/deliveryDetails';

export class DeliveryDetailsPage {

    constructor(page) {
        this.page = page;
        this.firstName = page.getByPlaceholder('First name')
        this.lastName = page.getByPlaceholder('Last name')
        this.street = page.getByPlaceholder('Street')
        this.postCode = page.getByPlaceholder('Post code')
        this.city = page.getByPlaceholder('City')
        this.country=page.getByRole('combobox')
        this.saveAddresssButton=page.getByRole('button', { name: 'Save address for next time' })
        this.addressContainer=page.locator('[data-qa="saved-address-container"]')
        this.addressContainerFirstName=page.locator('[data-qa="saved-address-firstName"]')
        this.addressContainerLastName=page.locator('[data-qa="saved-address-lastName"]')
        this.addressContainerStreet=page.locator('[data-qa="saved-address-street"]')
        this.addressContainerPostcode=page.locator('[data-qa="saved-address-postcode"]')
        this.addressContainerCity=page.locator('[data-qa="saved-address-city"]')
        this.addressContainerCountry=page.locator('[data-qa="saved-address-country"]')
        this.continuePayment=page.getByRole('button', { name: 'Continue to payment' })
        
    }

    enterDeliveryDetails = async (deliveryDetails) => {       
        await this.firstName.waitFor()
        await this.firstName.fill(deliveryDetails.firstName)
        await this.lastName.waitFor()
        await this.lastName.fill(deliveryDetails.lastName)
        await this.street.waitFor()
        await this.street.fill(deliveryDetails.street)
        await this.country.waitFor()
        await this.country.selectOption(deliveryDetails.country)
        await this.postCode.waitFor()
        await this.postCode.fill(deliveryDetails.postCode)
        await this.city.waitFor()
        await this.city.fill(deliveryDetails.city)

    }
    saveAddress = async() => {
        const addressCountBefore = await this.addressContainer.count()
        await this.saveAddresssButton.waitFor()
        await this.saveAddresssButton.click()
        await this.addressContainer.waitFor()
        //const addressCountAfter =this.addressContainer.count()
        await expect(this.addressContainer).toHaveCount(addressCountBefore+1) 
        //await this.addressContainerFirstName.waitFor()
        expect(await this.addressContainerFirstName.first().innerText()).toBe(deliveryDetails.firstName)
        expect(await this.addressContainerLastName.first().innerText()).toBe(deliveryDetails.lastName)
        expect(await this.addressContainerStreet.first().innerText()).toBe(deliveryDetails.street)
        expect(await this.addressContainerPostcode.first().innerText()).toBe(deliveryDetails.postCode)
        expect(await this.addressContainerCity.first().innerText()).toBe(deliveryDetails.city)
        expect(await this.addressContainerCountry.first().innerText()).toBe(deliveryDetails.country)
    }
    goToPayment = async() => {

        await this.continuePayment.click()
        await this.page.waitForURL("/payment")
    }
}