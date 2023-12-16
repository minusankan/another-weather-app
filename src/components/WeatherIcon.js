import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import CloudIcon from "@mui/icons-material/Cloud";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import OpacityIcon from "@mui/icons-material/Opacity";

const WeatherIcon = ({ name }) => {
  // Map the weather description to an icon
  const iconMap = {
    clear: <WbSunnyIcon />,
    clouds: <CloudIcon />,
    snow: <AcUnitIcon />,
    rain: <WaterDropIcon />,
    drizzle: <OpacityIcon />,
    thunderstorm: <ThunderstormIcon />,
  };

  return iconMap[name.toLowerCase()] || <WbSunnyIcon />; // Default icon
};

export default WeatherIcon;
