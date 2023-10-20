import styled from "@emotion/styled";
import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import City from "./city";
import NavBar from "./nav-bar";
import { isMobile } from "react-device-detect";
import Joke from "../../components/joke";
import { RWANDAN_FLAG_COLORS, SWEDEN_FLAG_COLORS } from "../../constants";
import { useTheme, Theme } from "@mui/material";

const mobileBgColors = [...SWEDEN_FLAG_COLORS, ...RWANDAN_FLAG_COLORS];
function WeatherInfo() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { swedenCity, rwandanCity } = useParams();

  let currentMobileBgColorIndex = 0;
  const [mobileBgColor, setMobileBgColor] = useState(mobileBgColors[0]);

  //image interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (isMobile) {
        currentMobileBgColorIndex += 1;
        if (mobileBgColors[currentMobileBgColorIndex]) {
          setMobileBgColor(mobileBgColors[currentMobileBgColorIndex]);
        } else {
          setMobileBgColor(mobileBgColors[0]);
          currentMobileBgColorIndex = 0;
        }
      } else {
        clearInterval(interval);
      }
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!swedenCity || !rwandanCity) {
      navigate("/");
    }
  }, []);
  return (
    <WeatherWrapper>
      <NavBar />
      <WeatherInfoGrid theme={theme}>
        <City
          mobileBgColor={mobileBgColor}
          cityType="Sweden"
          cityName={swedenCity}
        />
        <City
          mobileBgColor={mobileBgColor}
          cityType="Rwandan"
          cityName={rwandanCity}
        />
      </WeatherInfoGrid>
      {isMobile && (
        <Paper>
          <Joke />
        </Paper>
      )}
    </WeatherWrapper>
  );
}

export default WeatherInfo;

const WeatherWrapper = styled(Box)({
  width: "100vw",
  height: "100vh",
  position: "relative",
  transition: "all 1s",
});

const WeatherInfoGrid = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    paddingTop: 60,
  },
}));
