let currentMode = "consumption";
let currentTrip = {
    distance: 0,
    fuelUsed: 0,
    fuelPrice: 0,
};
let currentResult = {
    consumption: 0,
    totalCost: 0,
};
const date = new Date().getFullYear();
const consumptionBtn = document.querySelector("[data-consumption-btn]");
const tripPriceBtn = document.querySelector("[data-trip-price-btn]");
const tripPriceDiv = document.querySelector("[data-trip-price-div]");
const fuelConsumption = document.querySelector("[data-consumption]");
const trip = document.querySelector("[data-trip]");
const fuelPrice = document.querySelector("[data-trip-price]");
const calculateBtn = document.querySelector("[data-calculate]");
const resultConsumption = document.querySelector("[data-result-consumption]");
const resultTrip = document.querySelector("[data-result-trip]");
const resultPConsumption = document.querySelector("[data-result-p-consumption]");
const resultPTrip = document.querySelector("[data-result-p-trip]");
const resultTextConsumption = document.querySelector("[data-result-text-consumption]");
const resultTextTrip = document.querySelector("[data-result-text-trip]");
const distanceText = document.querySelector("[data-distance-text]");
const consumptionText = document.querySelector("[data-consumption-text]");
function parseToFloat(text) {
    if (!text)
        return 0;
    const normalizedText = text.replace(",", ".");
    const parsedText = parseFloat(normalizedText);
    if (isNaN(parsedText) || parsedText <= 0)
        return 0;
    return parsedText;
}
function checkTripPrice() {
    if (currentMode === "consumption") {
        calculateFuelConsumption();
    }
    else {
        calculateTripPrice();
    }
}
function calculateFuelConsumption() {
    const consumption = parseFloat(fuelConsumption.value);
    const distance = parseFloat(trip.value);
    currentTrip = {
        fuelUsed: parseToFloat(fuelConsumption.value),
        distance: distance,
        fuelPrice: 0,
    };
    if (distance === 0 || consumption === 0) {
        resultConsumption.innerHTML = "0";
        return;
    }
    currentResult.consumption = parseToFloat(((consumption / distance) * 100).toFixed(2));
    resultConsumption.innerHTML = currentResult.consumption.toString();
}
function calculateTripPrice() {
    const consumption = parseToFloat(fuelConsumption.value);
    const distance = parseToFloat(trip.value);
    currentTrip = {
        fuelUsed: 0,
        distance: distance,
        fuelPrice: parseToFloat(fuelPrice.value),
    };
    if (distance === 0 || consumption === 0) {
        resultConsumption.innerHTML = "0";
        return;
    }
    currentResult.consumption = consumption;
    const totalConsumption = (currentResult.consumption * currentTrip.distance) / 100;
    currentResult.totalCost = totalConsumption * currentTrip.fuelPrice;
    resultTrip.innerHTML = currentResult.totalCost.toFixed(2);
}
function resetCalculator() {
    resultTrip.textContent = "0";
    resultConsumption.innerHTML = "0";
    fuelConsumption.value = "";
    trip.value = "";
    fuelPrice.value = "";
}
calculateBtn.addEventListener("click", checkTripPrice);
consumptionBtn.addEventListener("click", () => {
    resetCalculator();
    currentMode = "consumption";
    distanceText.textContent = "Przejechany dystans ( w km )";
    consumptionText.textContent = "Spalone paliwo ( w litrach )";
    tripPriceDiv.classList.add("hidden");
    tripPriceBtn.classList.remove("accent");
    consumptionBtn.classList.add("accent");
    resultTextConsumption.classList.remove("hidden");
    resultTextTrip.classList.add("hidden");
    resultPConsumption.classList.remove("hidden");
    resultPTrip.classList.add("hidden");
    document.documentElement.style.setProperty("--left-consumption", -65 + "vw");
    document.documentElement.style.setProperty("--left-trip", -100 + "vw");
});
tripPriceBtn.addEventListener("click", () => {
    resetCalculator();
    currentMode = "price";
    distanceText.textContent = "Dystans ( w km )";
    consumptionText.textContent = "Spalanie ( w litrach )";
    tripPriceBtn.classList.add("accent");
    tripPriceDiv.classList.remove("hidden");
    consumptionBtn.classList.remove("accent");
    resultTextTrip.classList.remove("hidden");
    resultTextConsumption.classList.add("hidden");
    resultPConsumption.classList.add("hidden");
    resultPTrip.classList.remove("hidden");
    document.documentElement.style.setProperty("--left-consumption", -100 + "vw");
    document.documentElement.style.setProperty("--left-trip", -66 + "vw");
});
const yearSpan = document.querySelector("[data-year]");
yearSpan.textContent = date.toString();
export {};
//# sourceMappingURL=index.js.map