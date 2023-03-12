import { API_URL } from "../../settings.js";
import { 
    makeOptions,
    handleHttpErrors,
    sanitizeStringWithTableRows 
} from "../../utils.js";

const carsURL = API_URL + "/cars";

export async function initReservation() {
  fetchAllCars();
  document.querySelector("#table-rows").onclick = setupReservationModal
  document.querySelector("#btn-reservation").onclick = makeNewReservation
}

async function fetchAllCars() {
  try {
    const cars = await fetch(carsURL).then(handleHttpErrors)

    const tableRows = cars
      .map(
        (car) => `
    <tr>
      <td>${car.id}</td>
      <td>${car.brand}</td>
      <td>${car.model}</td>
      <td>${car.pricePrDay}</td>
    <td>
    <button id="reserve-row-btn_${car.id}" type="button" class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#reservation-modal">Reserve car</button></td>
    </tr>`
      )
      .join("\n")

    document.querySelector("#table-rows").innerHTML = sanitizeStringWithTableRows(tableRows)
  } catch (err) {
    console.log(err)
  }
}

async function setupReservationModal(evt) {
  const target = evt.target
  const parts = target.id.split("_")
  const id = parts[1]
  document.querySelector("#car-id").value = id
}

async function makeNewReservation() {
  const carId = document.querySelector("#car-id").value;
  const username = document.querySelector("#user-name").value;
  const reservationDate = document.querySelector("#reservation-date").value;

  const newReservation = { 
    carId: carId,
    username: username, 
    rentalDate: reservationDate 
}

  const options = makeOptions("POST", newReservation);


  const reservationURL = API_URL + "/reservations";

  try {
    const reservation = await fetch(reservationURL, options).then(handleHttpErrors);
    document.querySelector("#user-name").innerText = reservation.username;
    document.querySelector("#status").innerText = `Reservation for ${username} made`;
  } catch (error) {
    document.querySelector("#status").innerText = error.message;
  }
}