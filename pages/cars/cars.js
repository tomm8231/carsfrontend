import { API_URL } from "../../settings.js"
import { handleHttpErrors, makeOptions, sanitizeStringWithTableRows } from "../../utils.js"

const URL = API_URL + "/cars"

export async function initCars() {
    document.querySelector("#table-rows").onclick = showCarDetails
    getAllCars()
}

async function getAllCars() {
  const options = makeOptions("GET",null,true)

    try {
    
      document.querySelector("#error").innerText = ""

        const data = await fetch(URL, options)
        .then(handleHttpErrors)
        showAllCars(data)
    } catch (err) {
      document.querySelector("#error").innerText = err.message
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




