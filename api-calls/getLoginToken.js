
import * as nodeFetch from "node-fetch"
export const getLoginToken = async (password,username) => {
    const response = await nodeFetch("http://localhost:2221/api/login", {
        method: "POST",
        body: JSON.stringify({ "password": password, "username": username })

    })
    if(response.status != 200) {
        throw new Error("API request to fetch token failed ")
    }
    const body= await response.json()
    return body.token

}