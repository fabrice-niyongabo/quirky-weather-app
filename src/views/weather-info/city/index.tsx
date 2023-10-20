import { Button, Theme, Typography, styled, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import {
  setRwandanCity,
  setRwandanCityImages,
  setSwedenCity,
  setSwedenCityImages,
} from "../../../redux/actions/app";
import SwithCity from "./switch-city";
import Weather from "../weather";
import Joke from "../../../components/joke";
import { cityTpe } from "../../../interfaces";
import { toastMessage } from "../../../helpers";
import { isMobile } from "react-device-detect";
import { THEME_COLORS } from "../../../constants";

interface IProps {
  cityName: string | undefined;
  cityType: cityTpe;
  mobileBgColor: string;
}
function City(props: IProps) {
  const dispatch = useDispatch();
  const { rwandanCity, swedenCity, rwandanCityImages, swedenCityImages } =
    useSelector((state: RootState) => state.appReducer);

  const [showModal, setShowModal] = useState(false);

  const theme = useTheme();

  //background image state
  let currentImageIndex = 0;
  const fallbackImage = require("../../../assets/clouds.gif");
  const defaultImage =
    props.cityType === "Rwandan"
      ? rwandanCityImages.length > 0
        ? rwandanCityImages[0].urls.small
        : fallbackImage
      : swedenCityImages.length > 0
      ? swedenCityImages[0].urls.small
      : fallbackImage;
  const [backgroundImage, setBackgroundImage] = useState(defaultImage);
  const currentCityImages =
    props.cityType === "Rwandan" ? rwandanCityImages : swedenCityImages;

  useEffect(() => {
    if (!props.cityName) return;
    //fetching images only if city in the params is defferent from the one in the store

    if (props.cityType === "Rwandan") {
      if (rwandanCity !== props.cityName) {
        setBackgroundImage(fallbackImage);
        dispatch(setRwandanCity(props.cityName));
        fetchCityImages();
      } else if (rwandanCityImages.length === 0) {
        fetchCityImages();
      }
    } else {
      if (swedenCity !== props.cityName) {
        setBackgroundImage(fallbackImage);
        dispatch(setSwedenCity(props.cityName));
        fetchCityImages();
      } else if (swedenCityImages.length === 0) {
        fetchCityImages();
      }
    }
  }, [props.cityName]);

  //image interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentCityImages.length > 0) {
        currentImageIndex += 1;
        if (currentCityImages[currentImageIndex]) {
          setBackgroundImage(currentCityImages[currentImageIndex].urls.small);
        } else {
          setBackgroundImage(currentCityImages[0].urls.small);
          currentImageIndex = 0;
        }
      }
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, [currentCityImages]);

  const fetchCityImages = async () => {
    try {
      if (isMobile) {
        return;
      }
      const imageReq = await fetch(
        `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UN_SPLASH_ACCESS_KEY}&query=${props.cityName}`
      );
      const response = await imageReq.json();
      if (response?.results) {
        if (response.results.length > 0) {
          setBackgroundImage(response.results[0].urls.small);
        }
        if (props.cityType === "Rwandan") {
          dispatch(setRwandanCityImages(response.results));
        } else {
          dispatch(setSwedenCityImages(response.results));
        }
      } else {
        if (props.cityType === "Rwandan") {
          dispatch(setRwandanCityImages([]));
        } else {
          dispatch(setSwedenCityImages([]));
        }
      }
    } catch (error) {
      //error while fetching city images
      console.log({ error });
      toastMessage("error", JSON.stringify(error));
    }
  };
  return (
    <CountryContainer
      style={{
        backgroundImage: isMobile ? "" : `url(${backgroundImage})`,
        backgroundColor: isMobile ? props.mobileBgColor : "",
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
            style={{ padding: 0 }}
            onClick={() => !isMobile && setShowModal(true)}
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
