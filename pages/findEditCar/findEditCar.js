import { API_URL} from "../../settings.js"
import { handleHttpErrors, makeOptions } from "../../utils.js"

//Add id to this URL to get a single user
const URL = `${API_URL}/cars/`
export async function initFindEditCar(match){
    document.querySelector("#edited-car").innerText = ""
    document.querySelector("#btn-submit-edited-car").onclick = editCar;
    document.querySelector("#btn-delete-car").onclick = deleteCar;

        document.getElementById("btn-fetch-car").onclick = fetchCarData
    if (match?.params?.id) {
        const id = match.params.id
        try {
          renderCar(id)
        } catch (err) {
          document.getElementById("error").innerText = "Could not find car: " + id
        }
      }
}

  
  const navigoRoute = "find-edit-car"
  
  async function fetchCarData() {
    document.getElementById("error").innerText = ""
    //@ts-ignore
    const id = document.getElementById("car-id-input").value
    console.log(id)
    if (!id) {
      document.getElementById("error").innerText = "Please provide an id"
      return
    }
    try {
      renderCar(id)
      const queryString = "?id=" + id
      //@ts-ignore  
      window.router.navigate(`${navigoRoute}/${queryString}`, { callHandler: false, updateBrowserURL: true })
    } catch (err) {
      console.log("UPS " + err.message)
    }
  }
  
  async function renderCar(id) {
    try {
      const car = await fetch(URL + id).then(handleHttpErrors)
      document.getElementById("car-id-input").value = ""
      //jsonplaceholder returns an empty object for users not found, NOT an error
      if (Object.keys(car).length === 0) {  //checks for an empty object = {}
        throw new Error("No car found for id:" + id)
      }

      document.querySelector("#car-id").value = car.id
      document.querySelector("#brand").value = car.brand;
      document.querySelector("#model").value = car.model;
      document.querySelector("#price-pr-day").value = car.pricePrDay;
      document.querySelector("#best-discount").value = car.bestDiscount;

  
    } catch (err) {
      document.getElementById("error").innerText = err
    }
  }



  // Edit the car that is found:

async function editCar() {
  const idNotEdit = document.querySelector("#car-id").value;
  const brandEdit = document.querySelector("#brand").value;
  const modelEdit = document.querySelector("#model").value;
  const priceEdit = document.querySelector("#price-pr-day").value;
  const discountEdit = document.querySelector("#best-discount").value;

  const bodyToEdit = {
    id: idNotEdit,
    brand: brandEdit,
    model: modelEdit,
    pricePrDay: priceEdit,
    bestDiscount: discountEdit
  }

  const options = makeOptions("PUT", bodyToEdit)

  try {
  await fetch(URL + idNotEdit, options).then(handleHttpErrors)
} catch (err) {
  console.log(err.message)
}

  document.querySelector("#car-id").value = "";
  document.querySelector("#brand").value = "";
  document.querySelector("#model").value = "";
  document.querySelector("#price-pr-day").value = "";
  document.querySelector("#best-discount").value = "";

  document.querySelector("#edited-car").innerText =
        "The car with id " + idNotEdit + " is edited"  
}


async function deleteCar() {
  const id = document.querySelector("#car-id").value;

  const bodyToDelete = {
    id: id,
  }

  const options = makeOptions("DELETE", bodyToDelete)

  try {
    await fetch(URL + id, options).then(handleHttpErrors)
  } catch (err) {
    console.log(err.message)
  }

  document.querySelector("#car-id").value = "";
  document.querySelector("#brand").value = "";
  document.querySelector("#model").value = "";
  document.querySelector("#price-pr-day").value = "";
  document.querySelector("#best-discount").value = "";

  if (id){
  document.querySelector("#edited-car").innerText =
        "The car with id " + id + " is deleted"  
      }


}




