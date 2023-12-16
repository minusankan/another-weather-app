import React from 'react'
import {
    Grid,
    Card,
    CardContent,
    Typography
} from "@mui/material";

const WeatherCard = ({ title, weather }) => (
  <Grid item xs={12} md={6}>
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">
          Temperature: {weather?.main?.temp}°C
        </Typography>
        <Typography variant="body1">
          Weather: {weather?.weather[0]?.description}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default WeatherCard;