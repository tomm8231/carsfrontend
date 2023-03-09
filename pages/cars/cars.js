import { API_URL } from "../../settings.js"
import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js"

const URL = API_URL + "/cars"

export async function initCars() {
    document.querySelector("#table-rows").onclick = showCarDetails
    getAllCars()
}

async function getAllCars() {
    try {
        const data = await fetch(URL)
        .then(handleHttpErrors)
        showAllCars(data)
        console.log("Data: " + data)
    } catch (err) {
        console.log(err)
    }  
}


function showAllCars(data) {
    const tableRowsArray = data.map(car => `
    <tr>                                
      <td>${car.id}</td>              
      <td>${car.brand}</td>                     
      <td>${car.model}</td>  
      <td>${car.pricePrDay}</td>
      <td>${car.bestDiscount}</td>
      <td>
        <button id="row-btn_${car.id}" type="button"  class="btn btn-sm btn-secondary">Details</button> 
      </td>      
    </tr>`)
    const tableRowsString = tableRowsArray.join("\n")
    document.querySelector("#table-rows").innerHTML = sanitizeStringWithTableRows(tableRowsString)
  }

async function showCarDetails(evt) {
    const target = evt.target
    if (!target.id.startsWith("row-btn_")) {
      return
    }
    const id = target.id.replace("row-btn_", "")
    window.router.navigate("find-edit-car?id=" + id)
  }




