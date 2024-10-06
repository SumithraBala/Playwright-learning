const { test, expect } = require('@playwright/test');
import { ProductPage } from './pageObjects/ProductPage.js';
import { Navigation } from './pageObjects/Navigation';
import { CheckoutPage } from './pageObjects/CheckoutPage';
import { LoginPage } from './pageObjects/LoginPage';
import { RegisterPage } from './pageObjects/RegisterPage.js';
import { v4 as uuidv4 } from 'uuid';
import { DeliveryDetailsPage } from './pageObjects/DeliveryDetailsPage.js';
import { deliveryDetails } from '../data/deliveryDetails.js';
import { PaymentPage } from './pageObjects/PaymentPage.js';

test("new user end-to-end flow", async ({ page }) => {
    //productPage is variable instance of class ProductPage (note the difference in case)
    const productPage = new ProductPage(page)
    await productPage.visit();
    await productPage.sortByCheapest();
    await productPage.addProductToBasket(0)
    await productPage.addProductToBasket(1)
    await productPage.addProductToBasket(2)
    const navigation = new Navigation(page)
    await navigation.goToCheckout()


    const checkoutPage = new CheckoutPage(page)
    await checkoutPage.removeChepeastProduct()
    await checkoutPage.ContinueToCheckout()
    const loginPage = new LoginPage(page)
    await loginPage.GotoRegister()

    const registerPage = new RegisterPage(page)
    const email = uuidv4() + "@test.com"
    const password = uuidv4()
    await registerPage.SignupUser(email, password)
    
    const deliveryDetailsPage = new DeliveryDetailsPage(page)
    await deliveryDetailsPage.enterDeliveryDetails(deliveryDetails)
    await deliveryDetailsPage.saveAddress()
    await deliveryDetailsPage.goToPayment()
    
    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.makePayment()

}) 
