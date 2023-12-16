const GEO_API_URL = process.env.REACT_APP_GEO_API_URL;
const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;

const cityApiBuilder = async (params) => {
  const response = await fetch(`${GEO_API_URL}/${params}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": GEO_API_KEY,
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  });

  const data = await response.json();
  return data;
};

const toISO6709 = (latitude, longitude) => {
  // Convert latitude and longitude to ISO-6709 format with fixed 4 decimal places
  const latISO = (latitude >= 0 ? "+" : "") + latitude.toFixed(4);
  const lonISO = (longitude >= 0 ? "+" : "") + longitude.toFixed(4);

  // Combine them as per ISO 6709 standard format
  return encodeURIComponent(`${latISO}${lonISO}`);
};

export const fetchCityByName = async (search) => {
  try {
    return cityApiBuilder(
      `?minPopulation=10000&namePrefix=${encodeURI(search)}`
    );
  } catch (error) {
    console.error(error);
    return;
  }
};

export const fetchCityByCords = async (lat, long) => {
  try {
    return cityApiBuilder(
      `?minPopulation=10000&location=${toISO6709(lat, long)}`
    );
  } catch (error) {
    console.error(error);
    return;
  }
};
