import test from "@playwright/test";
import { MyAccountPage } from "./pageObjects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken";
import { adminDetails } from "../data/userDetails";
//import * as dotenv from "dotenv"
//dotenv.config() 
test("Account is using cookie injection ", async ({page}) => {
    const loginToken = await getLoginToken(adminDetails.password,adminDetails.username)
    console.log({loginToken})
     const myAccountPage = new MyAccountPage(page) 
     await myAccountPage.visit()
     await page.evaluate(([loginTokenInsideBrowserCode]) => {

        document.cookie = "token=" + loginTokenInsideBrowserCode
     },[loginToken])
     await myAccountPage.visit()
     await myAccountPage.waitForPageHeading()

})