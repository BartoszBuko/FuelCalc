// Add interfaces for types and Mode to see which mode to use for calculations

interface FuelTrip {
  distance: number;
  fuelUsed: number;
  fuelPrice: number;
}

interface CalculationResult {
  consumption: number;
  totalCost: number;
}

type Mode = "consumption" | "price";

let currentMode: Mode = "consumption";
let currentTrip: FuelTrip = {
  distance: 0,
  fuelUsed: 0,
  fuelPrice: 0,
};

let currentResult: CalculationResult = {
  consumption: 0,
  totalCost: 0,
};
const date: number = new Date().getFullYear();

// initialize all of the data- attributes
const consumptionBtn = document.querySelector(
  "[data-consumption-btn]",
) as HTMLButtonElement;
const tripPriceBtn = document.querySelector(
  "[data-trip-price-btn]",
) as HTMLButtonElement;

const tripPriceDiv = document.querySelector(
  "[data-trip-price-div]",
) as HTMLDivElement;

const fuelConsumption = document.querySelector(
  "[data-consumption]",
) as HTMLInputElement;
const trip = document.querySelector("[data-trip]") as HTMLInputElement;
const fuelPrice = document.querySelector(
  "[data-trip-price]",
) as HTMLInputElement;

const calculateBtn = document.querySelector(
  "[data-calculate]",
) as HTMLButtonElement;

const resultConsumption = document.querySelector(
  "[data-result-consumption]",
) as HTMLSpanElement;
const resultTrip = document.querySelector(
  "[data-result-trip]",
) as HTMLSpanElement;
const resultPConsumption = document.querySelector(
  "[data-result-p-consumption]",
) as HTMLParagraphElement;
const resultPTrip = document.querySelector(
  "[data-result-p-trip]",
) as HTMLParagraphElement;
const resultTextConsumption = document.querySelector(
  "[data-result-text-consumption]",
) as HTMLParagraphElement;
const resultTextTrip = document.querySelector(
  "[data-result-text-trip]",
) as HTMLParagraphElement;

const distanceText = document.querySelector(
  "[data-distance-text]",
) as HTMLParagraphElement;
const consumptionText = document.querySelector(
  "[data-consumption-text]",
) as HTMLParagraphElement;

function parseToFloat(text: string): number {
  if (!text) return 0;

  const normalizedText = text.replace(",", ".");
  const parsedText = parseFloat(normalizedText);

  if (isNaN(parsedText) || parsedText <= 0) return 0;

  return parsedText;
}

// Check if trip price is either consumption or price then call for relevant function
function checkTripPrice(): void {
  if (currentMode === "consumption") {
    calculateFuelConsumption();
  } else {
    calculateTripPrice();
  }
}

// Calculate fuel consumption

function calculateFuelConsumption(): void {
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
  currentResult.consumption = parseToFloat(
    ((consumption / distance) * 100).toFixed(2),
  );
  resultConsumption.innerHTML = currentResult.consumption.toString();
}

// Calculate trip price

function calculateTripPrice(): void {
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

  const totalConsumption: number =
    (currentResult.consumption * currentTrip.distance) / 100;
  currentResult.totalCost = totalConsumption * currentTrip.fuelPrice;
  resultTrip.innerHTML = currentResult.totalCost.toFixed(2);
}

// resets all values in inputs
function resetCalculator(): void {
  resultTrip.textContent = "0";
  resultConsumption.innerHTML = "0";
  fuelConsumption.value = "";
  trip.value = "";
  fuelPrice.value = "";
}

//* EVENT LISTENERS

calculateBtn.addEventListener("click", checkTripPrice);

consumptionBtn.addEventListener("click", (): void => {
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

tripPriceBtn.addEventListener("click", (): void => {
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

// Set the current year in the footer
const yearSpan = document.querySelector("[data-year]") as HTMLSpanElement;

yearSpan.textContent = date.toString();
