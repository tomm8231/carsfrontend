import { API_URL } from "../../settings.js"
import {handleHttpErrors} from "../../utils.js"

const URL = API_URL + "/auth/login"

export function initLogin() {
  document.querySelector("#login-btn").onclick = login
}

export function logout(){
  document.querySelector("#login-id").style.display="block"
  document.querySelector("#logout-id").style.display="none"
  localStorage.clear()
}


async function login(evt) {
  document.querySelector("#error").innerText = ""

  const username = document.querySelector("#username").value
  const password = document.querySelector("#password").value

  //const userDto = {username:username,password:password}
  const userDto = { username, password }

  const options = {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(userDto)
  }

  try {
    const response = await fetch(URL, options).then(handleHttpErrors)
    localStorage.setItem("user", response.username)
    localStorage.setItem("token", response.token)
    localStorage.setItem("roles", response.roles)
    window.router.navigate("")

    
    document.querySelector("#login-id").style.display="none"
    document.querySelector("#logout-id").style.display="block"

    if(response.roles.includes("ADMIN")) {
      document.querySelector("#only-admin").style.display="flex"
    }
    
    /*
    if(response.roles.includes("USER")) {
      document.querySelector("#only-user").style.display="flex" // id skal implementeres i html
    }
    */
   
  } catch (err) {
    //document.querySelector("#error").innerText = err.message
  }

}