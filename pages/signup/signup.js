import { API_URL} from "../../settings.js"
import { handleHttpErrors, makeOptions } from "../../utils.js"

const URL = API_URL + "/members"


export function initSignup() {
    document.querySelector("#btn-submit-member").onclick = addNewMember
}


async function addNewMember() {
    const username = document.querySelector("#input-username").value
    const email = document.querySelector("#input-email").value
    const password = document.querySelector("#input-password").value
    const firstName = document.querySelector("#input-firstname").value
    const lastName =  document.querySelector("#input-lastname").value
    const street =  document.querySelector("#input-street").value
    const city =  document.querySelector("#input-city").value
    const zip =  document.querySelector("#input-zip").value

    const newMember = {
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        street: street,
        city: city,
        zip: zip
    }

    const options = makeOptions("POST", newMember)

    try {
        await fetch(URL, options).then(handleHttpErrors)
    } catch (err) {
        console.log(err.message)
    }

    document.querySelector("#input-username").value = ""
    document.querySelector("#input-email").value = ""
    document.querySelector("#input-password").value = ""
    document.querySelector("#input-firstname").value = ""
    document.querySelector("#input-lastname").value = ""
    document.querySelector("#input-street").value = ""
    document.querySelector("#input-city").value = ""
    document.querySelector("#input-zip").value = ""

    document.querySelector("#status").innerText = "Member added"
}
