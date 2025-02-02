export async function getWeather(location) {
  try {
    const weather = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&key=X6FRJ8EG2KQ97Y3JL8H934V46&`,
      { mode: "cors" }
    );
    const weatherData = await weather.json();

    return weatherData;
  } catch (error) {
    console.error("Failed to load weather: ", error);
  }
}
