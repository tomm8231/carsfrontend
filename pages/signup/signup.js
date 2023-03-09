import { API_URL} from "../../settings.js"
import { handleHttpErrors, makeOptions } from "../../utils.js"

const URL = API_URL + "/members"


export function initSignup() {
    document.querySelector("#btn-submit-member").onclick = addNewMember
}



