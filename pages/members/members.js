import { handleHttpErrors, sanitizeStringWithTableRows, makeOptions } from "../../utils.js"
import { API_URL } from "../../settings.js"
const URL = API_URL + "/members"

export function initMembers(){
    document.querySelector("#tbl-body").onclick = showMemberDetails

    getAllMembers()
}


async function getAllMembers() {
    try {
        const data = await fetch(URL)
        .then(handleHttpErrors)
        showAllMembers(data)
        console.log("Data: " + data)
    } catch (err) {
        console.log(err)
    }
}


function showAllMembers(data) {
    const tableRowsArray = data.map(member => `
    <tr>                                
      <td>${member.username}</td>              
      <td>${member.email}</td>                     
      <td>${member.firstName}</td>
      <td>${member.ranking}</td>
      <td><button id="row-btn_details_${member.username}" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#member-details-modal">Details</button></td>
      <td><button id="row-btn_delete_${member.username}" type="button"  class="btn btn-sm btn-primary">Delete</button></td>    
    </tr>`)
    const tableRowsString = tableRowsArray.join("\n")
    document.querySelector("#tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
  }

  async function showMemberDetails(evt) {
    const target = evt.target
    if (!target.id.startsWith("row-btn_")) {
      return
    }

    const parts = target.id.split("_");
    const username = parts[2]
    const btnAction = parts[1]
      if (btnAction === "details") {

        const member = await fetch(URL + "/" + username).then(handleHttpErrors)
        document.querySelector("#modal-title").innerText = "Details for user " + username
        document.querySelector("#user-name").innerText = member.username
        document.querySelector("#email").innerText = member.email
        document.querySelector("#first-name").innerText = member.firstName
        document.querySelector("#last-name").innerText = member.lastName
        document.querySelector("#street").innerText = member.street
        document.querySelector("#city").innerText = member.city
        document.querySelector("#zip").innerText = member.zip
        document.querySelector("#created").innerHTML = member.created
        document.querySelector("#edited").innerText = member.edited
        document.querySelector("#ranking").innerText = member.ranking
        //document.querySelector("#modal-content").innerText = JSON.stringify(member,null,2)
      } 
      else 
      if (btnAction === "delete")  {

        const id = username
  
        const bodyToDelete = {
          username: id
        }
      
        const options = makeOptions("DELETE", bodyToDelete)
      
        try {
          await fetch(URL +"/"+ id, options).then(handleHttpErrors)
        } catch (err) {
          console.log(err.message)
        }
      
      /*

        if (id){
        document.querySelector("#edited-car").innerText =
              "Member with username " + id + " is deleted"  
            }
            */
      
            getAllMembers()


      }
      
  }


  