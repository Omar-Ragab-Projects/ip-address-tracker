let inputText = document.querySelector("input[type='text']");
let submitBtn = document.querySelector(".submit-btn");
let userIP = document.querySelector("span.user-ip");
let userLocation = document.querySelector("span.user-location");
let userTimezone = document.querySelector("span.user-timezone");
let userISP = document.querySelector("span.user-isp");

// See Own IP Information on the initial page load
fetchGetData();

// Getting User Data After Submit
submitBtn.addEventListener("click", () => {
  fetchGetData();
});

// Getting User Data
function fetchGetData() {
  let url = `https://geo.ipify.org/api/v1?apiKey=at_2RbplB5OgzZO2u0ZdDxJQGm0a70L8&ipAddress=${inputText.value}`;

  fetch(url)
    .then((resolvedValue) => {
      return resolvedValue.json();
    })
    .then((data) => {
      // Outputs User Data
      userIP.textContent = data.ip;
      userLocation.textContent = `${data.location.city}, ${data.location.region}`;
      userTimezone.textContent = `UTC ${data.location.timezone}`;
      userISP.textContent = data.isp;
      // Change Map Lat/Lng
      map.setView([data.location.lat, data.location.lng], 13);
      let marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
    });
}

// Make The Map
let map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
