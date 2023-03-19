
import { API_URL,FETCH_NO_API_ERROR } from "../../settings.js"
import { handleHttpErrors, makeOptions } from "../../utils.js"
//Add id to this URL to get a single user
const URL = `${API_URL}/cars`

export async function initAddCar(match) {
    document.querySelector("#btn-submit-car").onclick = addNewCar
  
}

async function addNewCar() {
    const brand = document.querySelector("#brand").value
    const model = document.querySelector("#model").value
    const pricePrDay = document.querySelector("#price-pr-day").value
    const bestDiscount = document.querySelector("#best-discount").value

    const newCar = {
        brand: brand,
        model: model,
        pricePrDay: pricePrDay,
        bestDiscount: bestDiscount,
    }

    const options = makeOptions("POST", newCar)

try {
    const newCar1 = await fetch(URL, options).then(handleHttpErrors) //ved kun at skrive "handleHttpErrors" svarer til "res => handleHttpErrors(res)"
    document.querySelector("#added-car").innerText = JSON.stringify(newCar1)

} catch (err) {
    console.log(err.message)
}

document.querySelector("#brand").value = "";
document.querySelector("#model").value = "";
document.querySelector("#price-pr-day").value = "";
document.querySelector("#best-discount").value = "";



}
