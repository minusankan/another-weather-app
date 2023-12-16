import React from "react";
import {
    Card,
    Grid,
    CardContent,
    Typography
} from "@mui/material";
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
            <Grid container key={index} spacing={1}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">{formatDate(day.dt)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  Max Temp: {day.main.temp_max}°C
                </Typography>
                <Typography variant="body1">
                  Min Temp: {day.main.temp_min}°C
                </Typography>
                <Typography variant="body1">
                  Weather: {day.weather[0].description}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ForecastCard;
