import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import WeatherIcon from "./WeatherIcon";

const WeatherCard = ({ title, weather }) => (
  <Grid item xs={12} md={6}>
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Box display="flex" alignItems="center" marginBottom={2}>
          <Box>
            <WeatherIcon name={weather?.weather[0]?.main} />
          </Box>
          <Box marginLeft={2}>
            <Typography variant="body1">
              Temperature: {weather?.main?.temp}°C
            </Typography>
            <Typography variant="body1">
              Temp range: {weather?.main?.temp_min}°C -{" "}
              {weather?.main?.temp_max}°C
            </Typography>
            <Typography variant="body1">
              Feels like: {weather?.main?.feels_like}°C
            </Typography>
            <Typography variant="body1">
              Pressure: {weather?.main?.pressure}
            </Typography>
            <Typography variant="body1">
              Humidity: {weather?.main?.humidity}
            </Typography>
            <Typography variant="body1">
              Weather: {weather?.weather[0]?.description}
            </Typography>
            <Typography variant="body1">
              Wind: {weather?.wind?.speed}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Grid>
);

export default WeatherCard;
