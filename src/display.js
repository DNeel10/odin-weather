import { getWeather } from "./weather";
import { format, parseISO } from "date-fns";
import icons from "./icons.js";

const currentConditionsDiv = document.getElementById("current-conditions");
const loc = document.getElementById("location");
const forecastDiv = document.getElementById("forecast");

export async function displayWeather(location) {
  try {
    currentConditionsDiv.innerHTML = "";
    forecastDiv.innerHTML = "";
    const weather = await getWeather(location);
    console.log(weather);

    loc.textContent = `${weather.resolvedAddress}`;

    currentConditionsDiv.appendChild(displayCurrentConditions(weather));
    forecastDiv.appendChild(displayTenDayForecast(weather));
  } catch (err) {
    console.error(err);
  }
}

function displayCurrentConditions(data) {
  const conditionDiv = document.createElement("div");
  conditionDiv.classList.add("condition");

  const tempData = document.createElement("p");
  tempData.classList.add("temp");
  const conditionData = document.createElement("p");
  const conditionIcon = document.createElement("img");

  conditionData.classList.add("condition");

  tempData.textContent = `${Math.round(data.currentConditions.temp)}\u00B0F`;
  conditionData.textContent = `${data.currentConditions.conditions}`;
  conditionIcon.src = icons[`${data.currentConditions.icon}.png`];

  conditionDiv.appendChild(conditionIcon);
  conditionDiv.appendChild(conditionData);
  conditionDiv.appendChild(tempData);
  return conditionDiv;
}

function displayTenDayForecast(data) {
  const tenDayDiv = document.createElement("div");
  tenDayDiv.classList.add("forecast");

  const forecast = data.days;
  console.log(forecast);
  forecast.forEach((day, i) => {
    if (i > 9) {
      return;
    } else {
      const card = document.createElement("div");
      card.classList.add("forecast-card");
      const date = document.createElement("p");
      const icon = document.createElement("img");
      const temp = document.createElement("h3");

      date.textContent = `${format(parseISO(day.datetime), "ccc")}`;
      icon.src = icons[`${day.icon}.png`];
      temp.textContent = `${Math.round(day.temp)}\u00B0F`;
      card.appendChild(date);
      card.appendChild(icon);
      card.appendChild(temp);
      tenDayDiv.appendChild(card);
    }
  });

  return tenDayDiv;
}
