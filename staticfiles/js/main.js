// JS FOR removing Preload anfter loading
// LISTENING TO MENU BUTTON CLICKS TO OPEN NAVBAR
// LISTENING TO OVERLAY CLICKS TO CLOSE NAVBAR

window.addEventListener("load", () => {
  document.body.classList.remove("preload");
})

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

window.initMap = initMap;