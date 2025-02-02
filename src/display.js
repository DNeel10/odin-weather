import { getWeather } from "./weather";

const weatherDiv = document.getElementById("weather");
const results = document.getElementById("results");
const loc = document.getElementById("location");

export async function displayWeather(location) {
  try {
    results.innerHTML = "";
    const weather = await getWeather(location);
    console.log(weather);

    const temp = document.createElement("div");
    temp.classList.add("temp");
    const conditions = document.createElement("div");
    conditions.classList.add("conditions");
    const locTitle = document.createElement("h2");

    loc.textContent = `${weather.resolvedAddress}`;
    temp.textContent = `${Math.round(weather.currentConditions.temp)}`;
    conditions.textContent = `${weather.currentConditions.conditions}`;

    results.appendChild(temp);
    results.appendChild(conditions);

    loc.appendChild(locTitle);
    weatherDiv.appendChild(results);
  } catch (err) {
    console.error(err);
  }
}
