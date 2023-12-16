import React from "react";
import { Card, Grid, CardContent, Typography, Box } from "@mui/material";
import WeatherIcon from "./WeatherIcon";
import { formatDate, groupByDate } from "../utils/dateUtils";

const ForecastCard = ({ forecast }) => {
  const next7DaysForecast = Object.values(groupByDate(forecast?.list)).slice(
    1,
    8
  );

  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Forecast
          </Typography>
          {next7DaysForecast?.map((day, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              marginBottom={2}
            >
              <Box alignItems="center">
                <Typography variant="body1">{formatDate(day.dt)}</Typography>
                <WeatherIcon name={day.weather[0].main} />
              </Box>
              <Box marginLeft={2}>
                <Typography variant="body1">
                  Max Temp: {day.main.temp_max}°C
                </Typography>
                <Typography variant="body1">
                  Min Temp: {day.main.temp_min}°C
                </Typography>
                <Typography variant="body1">
                  Weather: {day.weather[0].description}
                </Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ForecastCard;
