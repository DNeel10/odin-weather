import "./styles.css";
import { displayWeather } from "./display";

const locationBtn = document.getElementById("locationButton");
const locationInput = document.getElementById("locationInput");

locationBtn.addEventListener("click", () => {
  const location = locationInput.value;

  displayWeather(location);
  locationInput.value = "";
});

displayWeather("Frederick, MD");
