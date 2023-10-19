import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Loader from "./loader";
import { Box, Typography } from "@mui/material";
import { IweatherReaponse } from "../../../interfaces";
import AirIcon from "@mui/icons-material/Air";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AnimatedNumber from "../../../components/animated-number";
import WarningIcon from "@mui/icons-material/Warning";

interface IProps {
  cityName: string | undefined;
}
function Weather({ cityName }: IProps) {
  const [weatherResponse, setWeatherResponse] = useState<
    IweatherReaponse | undefined
  >(undefined);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cityName) {
      fetchWeatherInfo();
    }
  }, [cityName]);

  const fetchWeatherInfo = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const request = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=imperial`
      );
      const response = await request.json();
      console.log({ response });
      setTimeout(() => {
        setIsLoading(false);
        if (response.cod !== 200) {
          const msg = response?.message
            ? "Can't find weather. " + response.message
            : "Something went wrong while fetching the weather";
          setErrorMessage(msg);
        } else {
          setWeatherResponse(response);
        }
      }, 1500);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(`Error occured: ${error?.message}`);
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
          {errorMessage !== "" ? (
            <Box
              sx={{
                background: "rgba(255,255,255,0.3)",
                borderRadius: "10px",
                padding: "1.5rem",
                width: "100%",
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                rowGap: 3,
              }}
            >
              <WarningIcon color="error" fontSize="large" />
              <span style={{ textTransform: "capitalize" }}>
                {errorMessage}
              </span>
            </Box>
          ) : (
            weatherResponse && (
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
                      <AnimatedNumber
                        endValue={weatherResponse.main.humidity}
                      />
                    </p>
                    <small style={{ opacity: 0.5 }}>Humidity</small>
                  </IconContiner>
                  <IconContiner>
                    <ThermostatIcon sx={{ color: "white" }} />
                    <p style={{ padding: 0, margin: 0, fontWeight: "600" }}>
                      <AnimatedNumber
                        endValue={weatherResponse.main.pressure}
                      />
                    </p>
                    <small style={{ opacity: 0.5 }}>Pressure</small>
                  </IconContiner>
                </Box>
              </>
            )
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
});

const WeatherContainer = styled("div")({
  //   backgroundColor: "rgba(255,255,255,0.5)",
  marginTop: "1rem",
  padding: "1rem 2rem",
});
