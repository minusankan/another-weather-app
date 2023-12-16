import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Backdrop,
  CircularProgress,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCityByName, fetchCityByCords } from "./utils/locationService";
import { fetchWeather } from "./utils/weatherService";

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const citiesList = await fetchCityByName(inputValue);
      return {
        options: citiesList.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (err) {
      setError(true);
      return { options: [] };
    }
  };

  const onChangeHandler = async (enteredData) => {
    setSearchValue(enteredData);
    const [latitude, longitude] = enteredData.value.split(" ");
    setIsLoading(true);
    try {
      await refreshWeather(latitude, longitude);
      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      getPosition()
        .then(async (position) => {
          const cityList = await fetchCityByCords(
            position.coords.latitude,
            position.coords.longitude
          );
          if (Object.keys(cityList?.data).length > 0) {
            const city = cityList.data[0];
            setSearchValue({
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            });
            await refreshWeather(city.latitude, city.longitude);
          }
          setIsLoading(false);
        })
        .catch(() => {
          setError(true);
          setIsLoading(false);
        });
    } else {
      setError(true);
    }
  }, []);

  const refreshWeather = async (lat, long) => {
    try {
      const [_currentWeather, _forecast] = await fetchWeather(lat, long);
      setCurrentWeather(_currentWeather);
      setForecast(_forecast);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: isMobile ? "100vw" : "50vw",
          width: "100%",
          margin: "auto",
          padding: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              Weather Forecasting
            </Typography>
            <AsyncPaginate
              placeholder="Search for cities"
              debounceTimeout={600}
              value={searchValue}
              onChange={onChangeHandler}
              loadOptions={loadOptions}
            />
          </Grid>

          {currentWeather && (
            <WeatherCard title="Current Weather" weather={currentWeather} />
          )}

          {forecast && <ForecastCard forecast={forecast} />}
        </Grid>
      </Paper>

      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Alert onClose={() => setError(false)} severity="error">
          Error fetching weather data.
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default App;
