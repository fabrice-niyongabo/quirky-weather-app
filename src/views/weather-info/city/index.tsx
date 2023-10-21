import { Theme, Typography, styled, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

import SwithCity from "./switch-city";
import Weather from "../weather";
import Joke from "../../../components/joke";
import { cityTpe } from "../../../interfaces";
import { isMobile } from "react-device-detect";
import {
  RWANDAN_FLAG_COLORS,
  SWEDEN_FLAG_COLORS,
  THEME_COLORS,
} from "../../../constants";

interface IProps {
  cityName: string | undefined;
  cityType: cityTpe;
  mobileBgColor: string;
}
function City(props: IProps) {
  const [showModal, setShowModal] = useState(false);

  const theme = useTheme();

  //background color state
  let currentBgColorIndex = 0;
  const bgColorsToUse =
    props.cityType === "Rwandan" ? RWANDAN_FLAG_COLORS : SWEDEN_FLAG_COLORS;
  const [backGroundColor, setBackGroundColor] = useState(bgColorsToUse[0]);
  //image interval
  useEffect(() => {
    const interval = setInterval(() => {
      currentBgColorIndex += 1;
      if (bgColorsToUse[currentBgColorIndex]) {
        setBackGroundColor(bgColorsToUse[currentBgColorIndex]);
      } else {
        setBackGroundColor(bgColorsToUse[0]);
        currentBgColorIndex = 0;
      }
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <CountryContainer
      style={{
        backgroundColor: isMobile ? props.mobileBgColor : backGroundColor,
      }}
    >
      <CountryContentsWrapper>
        <CityHeader theme={theme}>
          <CountryInfo onClick={() => isMobile && setShowModal(true)}>
            <img
              src={
                props.cityType === "Rwandan"
                  ? require("../../../assets/rwanda.png")
                  : require("../../../assets/sweden.png")
              }
              width={20}
              height={20}
              style={{ borderRadius: 100 }}
              alt=""
            />
            <Typography variant="h3" fontSize={18} textTransform={"capitalize"}>
              <CountryNameSpan theme={theme}>
                {props.cityType === "Rwandan" ? "Rwanda" : "Sweden"} -{" "}
              </CountryNameSpan>
              {props.cityName}
            </Typography>
          </CountryInfo>
          <div
            style={{ padding: 0, cursor: "pointer" }}
            onClick={() => setShowModal(true)}
          >
            <ArrowDropDownCircleIcon fontSize="large" />
          </div>
        </CityHeader>
        <Weather cityName={props.cityName} cityType={props.cityType} />
        {!isMobile && <Joke color="whitesmoke" />}
      </CountryContentsWrapper>
      <SwithCity
        setShowModal={setShowModal}
        showModal={showModal}
        cityType={props.cityType}
      />
    </CountryContainer>
  );
}

export default City;

const CountryNameSpan = styled("span")(({ theme }: { theme: Theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const CityHeader = styled("div")(({ theme }: { theme: Theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? THEME_COLORS.light.background.dark
      : THEME_COLORS.dark.background.light,
  padding: "1rem",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color:
    theme.palette.mode === "light"
      ? THEME_COLORS.light.textColor.dark
      : THEME_COLORS.dark.textColor.dark,
  [theme.breakpoints.down("md")]: {
    padding: "0.5rem",
  },
}));

const CountryInfo = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 5,
});

const CountryContentsWrapper = styled("div")(({ theme }: { theme: Theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.8)",
  position: "absolute",
  padding: "2rem",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  [theme.breakpoints.down("md")]: {
    padding: 10,
    paddingTop: 30,
  },
}));

const CountryContainer = styled("div")({
  height: "100%",
  width: "50%",
  transition: "all 1.5s",
  backgroundSize: "100% 100%",
  position: "relative",
});
