import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Loader from "./loader";
import { Box, Typography } from "@mui/material";
import { IweatherReaponse } from "../../../interfaces";
import AirIcon from "@mui/icons-material/Air";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AnimatedNumber from "../../../components/animated-number";

interface IProps {
  cityName: string | undefined;
}
function Weather({ cityName }: IProps) {
  const [weatherResponse, setWeatherResponse] = useState<
    IweatherReaponse | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (cityName) fetchWeatherInfo();
  }, [cityName]);

  const fetchWeatherInfo = async () => {
    try {
      setIsLoading(true);
      const request = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=imperial`
      );
      const response = await request.json();
      setTimeout(() => {
        setIsLoading(false);
        setWeatherResponse(response);
      }, 1500);
      console.log({ response });
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
    }
  };

  return (
    <WeatherContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <WeatherResultsContainer>
          <Typography
            variant="h3"
            component={"p"}
            style={{ color: "whitesmoke" }}
            fontSize={18}
          >
            Today
          </Typography>
          <Typography
            variant="h3"
            component={"p"}
            style={{
              color: "#CCC",
              marginTop: "1rem",
              marginBottom: "1rem",
              opacity: 0.5,
            }}
            fontSize={14}
          >
            {new Date().toDateString()}
          </Typography>
          {weatherResponse && (
            <>
              <Box
                sx={{
                  background: "rgba(255,255,255,0.5)",
                  borderRadius: 10,
                  minHeight: 100,
                }}
              >
                <img
                  src={`https://openweathermap.org/img/wn/${weatherResponse.weather[0].icon}@2x.png`}
                />
              </Box>
              <Typography variant="h2" sx={{ color: "whitesmoke" }}>
                <AnimatedNumber endValue={weatherResponse.main.temp} />
                &deg;
              </Typography>
              <p style={{ color: "whitesmoke", textTransform: "capitalize" }}>
                {weatherResponse.weather[0].description}
              </p>
              <Box
                sx={{
                  background: "rgba(255,255,255,0.3)",
                  borderRadius: "10px",
                  padding: "1.5rem",
                  width: "100%",
                  marginTop: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  rowGap: 3,
                }}
              >
                <IconContiner>
                  <AirIcon sx={{ color: "white" }} />
                  <p style={{ padding: 0, margin: 0, fontWeight: "600" }}>
                    <AnimatedNumber endValue={weatherResponse.wind.speed} />{" "}
                    Km/h
                  </p>
                  <small style={{ opacity: 0.5 }}>Wind</small>
                </IconContiner>
                <IconContiner>
                  <WbSunnyIcon sx={{ color: "white" }} />
                  <p style={{ padding: 0, margin: 0, fontWeight: "600" }}>
                    <AnimatedNumber endValue={weatherResponse.main.humidity} />
                  </p>
                  <small style={{ opacity: 0.5 }}>Humidity</small>
                </IconContiner>
                <IconContiner>
                  <ThermostatIcon sx={{ color: "white" }} />
                  <p style={{ padding: 0, margin: 0, fontWeight: "600" }}>
                    <AnimatedNumber endValue={weatherResponse.main.pressure} />
                  </p>
                  <small style={{ opacity: 0.5 }}>Pressure</small>
                </IconContiner>
              </Box>
            </>
          )}
        </WeatherResultsContainer>
      )}
    </WeatherContainer>
  );
}

export default Weather;

const IconContiner = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  color: "white",
});

const WeatherResultsContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "2rem",
});

const WeatherContainer = styled("div")({
  //   backgroundColor: "rgba(255,255,255,0.5)",
  marginTop: "1rem",
});
