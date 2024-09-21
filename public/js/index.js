// initialize all of the data- attributes
const consumptionBtn = document.querySelector("[data-consumption-btn]");
const tripPriceBtn = document.querySelector("[data-trip-price-btn]");

const tripPriceDiv = document.querySelector("[data-trip-price-div]");

const fuelConsumption = document.querySelector("[data-consumption]");
const trip = document.querySelector("[data-trip]");
const fuelPrice = document.querySelector("[data-trip-price]");

const calculateBtn = document.querySelector("[data-calculate]");

const resultConsumption = document.querySelector("[data-result-consumption]");
const resultTrip = document.querySelector("[data-result-trip]");
const resultPConsumption = document.querySelector(
  "[data-result-p-consumption]"
);
const resultPTrip = document.querySelector("[data-result-p-trip]");
const resultTextConsumption = document.querySelector(
  "[data-result-text-consumption]"
);
const resultTextTrip = document.querySelector("[data-result-text-trip]");

const distanceText = document.querySelector("[data-distance-text]");
const consumptionText = document.querySelector("[data-consumption-text]");

// Check if trip price has hidden class or not
function checkTripPrice() {
  if (tripPriceDiv.classList.contains("hidden")) {
    calculateFuelConsumption();
  } else {
    calculateTripPrice();
  }
}

// Calculate fuel consumption

function calculateFuelConsumption() {
  console.log("calculateFuelConsumption");
  const consumption = parseFloat(fuelConsumption.value);
  const distance = parseFloat(trip.value);

  if (!consumption || !distance) {
    resultConsumption.textContent = "0";
    return;
  } else {
    const totalConsumption = ((consumption / distance) * 100).toFixed(2);
    resultConsumption.innerHTML = totalConsumption;
  }
}

// Calculate trip price

function calculateTripPrice() {
  const consumption = parseFloat(fuelConsumption.value);
  const distance = parseFloat(trip.value);
  const price = parseFloat(fuelPrice.value);

  if (!consumption || !distance || !price) {
    resultTrip.textContent = "0";
    return;
  } else {
    const totalConsumption = (consumption * distance) / 100;
    const totalPrice = totalConsumption * price;
    resultTrip.innerHTML = totalPrice.toFixed(2);
  }
}

// Event listeners
calculateBtn.addEventListener("click", checkTripPrice);

consumptionBtn.addEventListener("click", () => {
  resultTrip.textContent = "0";
  resultConsumption.innerHTML = "0";
  fuelConsumption.value = "";
  trip.value = "";
  fuelPrice.value = "";
  distanceText.textContent = "Przejechany dystans ( w km )";
  consumptionText.textContent = "Spalone paliwo ( w litrach )";
  tripPriceDiv.classList.add("hidden");
  tripPriceBtn.classList.remove("accent");
  fuelPrice.value = "";
  consumptionBtn.classList.add("accent");
  resultTextConsumption.classList.remove("hidden");
  resultTextTrip.classList.add("hidden");
  resultPConsumption.classList.remove("hidden");
  resultPTrip.classList.add("hidden");

  document.documentElement.style.setProperty("--left-consumption", -65 + "vw");

  document.documentElement.style.setProperty("--left-trip", -100 + "vw");
});

tripPriceBtn.addEventListener("click", () => {
  resultConsumption.textContent = "0";
  resultTrip.textContent = "0";
  fuelConsumption.value = "";
  trip.value = "";
  fuelPrice.value = "";
  distanceText.textContent = "Dystans ( w km )";
  consumptionText.textContent = "Spalanie ( w litrach )";
  tripPriceBtn.classList.add("accent");
  tripPriceDiv.classList.remove("hidden");
  fuelPrice.value = "";
  consumptionBtn.classList.remove("accent");
  resultTextTrip.classList.remove("hidden");
  resultTextConsumption.classList.add("hidden");
  resultPConsumption.classList.add("hidden");
  resultPTrip.classList.remove("hidden");

  document.documentElement.style.setProperty("--left-consumption", -100 + "vw");
  document.documentElement.style.setProperty("--left-trip", -66 + "vw");
});

// Set the current year in the footer
const yearSpan = document.querySelector("[data-year]");

yearSpan.textContent = new Date().getFullYear();
