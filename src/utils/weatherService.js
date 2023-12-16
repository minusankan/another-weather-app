const WEATHER_API_URL = process.env.REACT_APP_WEATHER_API_URL;
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeather = async (lat, lon) => {
  try {
    let [weatherPromise, forcastPromise] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
    ]);

    const weatherResponse = await weatherPromise.json();
    const forcastResponse = await forcastPromise.json();

    return [weatherResponse, forcastResponse];
  } catch (error) {
    console.error(error);
  }
};
