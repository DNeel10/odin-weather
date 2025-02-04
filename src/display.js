import { getWeather } from "./weather";
import { format } from "date-fns";

const currentConditions = document.getElementById("current-conditions");
const loc = document.getElementById("location");
const forecast = document.getElementById("forecast");

export async function displayWeather(location) {
  try {
    currentConditions.innerHTML = "";
    forecast.innerHTML = "";
    const weather = await getWeather(location);
    console.log(weather);

    loc.textContent = `${weather.resolvedAddress}`;

    currentConditions.appendChild(displayCurrentConditions(weather));
    forecast.appendChild(displayTenDayForecast(weather));
  } catch (err) {
    console.error(err);
  }
}

function displayCurrentConditions(data) {
  const conditionDiv = document.createElement("div");

  const tempData = document.createElement("p");
  tempData.classList.add("temp");
  const conditionData = document.createElement("p");
  conditionData.classList.add("condition");

  tempData.textContent = `${Math.round(data.currentConditions.temp)}`;
  conditionData.textContent = `${data.currentConditions.conditions}`;

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
      const date = document.createElement("p");
      const temp = document.createElement("h3");
      date.textContent = `${format(day.datetime, "eee")}`;
      temp.textContent = `${Math.round(day.temp)}`;
      card.appendChild(date);
      card.appendChild(temp);
      tenDayDiv.appendChild(card);
    }
  });

  return tenDayDiv;
}
