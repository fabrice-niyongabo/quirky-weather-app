import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Loader from "./loader";
import { Box, Typography } from "@mui/material";
import { IweatherReaponse } from "../../../interfaces";

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
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
      );
      const response = await request.json();
      setIsLoading(false);
      setWeatherResponse(response);
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
            style={{ color: "#CCC", marginTop: "1rem", opacity: 0.5 }}
            fontSize={14}
          >
            {new Date().toDateString()}
          </Typography>
          {weatherResponse && (
            <>
              <Box>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherResponse.weather[0].icon}@2x.png`}
                />
              </Box>
              <Typography variant="h2" sx={{ color: "whitesmoke" }}>
                {weatherResponse.main.temp}&deg;
              </Typography>
              <p style={{ color: "whitesmoke", textTransform: "capitalize" }}>
                {weatherResponse.weather[0].description}
              </p>
            </>
          )}
        </WeatherResultsContainer>
      )}
    </WeatherContainer>
  );
}

export default Weather;

const WeatherResultsContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const WeatherContainer = styled("div")({
  //   backgroundColor: "rgba(255,255,255,0.5)",
  marginTop: "1rem",
});
