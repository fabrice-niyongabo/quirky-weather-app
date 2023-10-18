import { Button, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import {
  setRwandanCity,
  setRwandanCityImages,
} from "../../../redux/actions/app";
import SwithCity from "./switch-city";

interface IProps {
  rwandanCity: string | undefined;
}
function Rwanda(props: IProps) {
  const dispatch = useDispatch();
  const { rwandanCity, rwandanCityImages } = useSelector(
    (state: RootState) => state.appReducer
  );

  const [showModal, setShowModal] = useState(false);

  //background image state
  let currentImageIndex = 0;
  const fallbackImage = require("../../../assets/clouds.gif");
  const defaultImage =
    rwandanCityImages.length > 0
      ? rwandanCityImages[0].urls.small
      : fallbackImage;
  const [backgroundImage, setBackgroundImage] = useState(defaultImage);

  useEffect(() => {
    if (!props.rwandanCity) return;
    //fetching images only if sweden city in the params is defferent from the store
    if (rwandanCity !== props.rwandanCity) {
      setBackgroundImage(fallbackImage);
      dispatch(setRwandanCity(props.rwandanCity));
      fetchCityImages();
    } else if (rwandanCityImages.length === 0) {
      fetchCityImages();
    }
  }, [props.rwandanCity]);

  //image interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (rwandanCityImages.length > 0) {
        currentImageIndex += 1;
        if (rwandanCityImages[currentImageIndex]) {
          setBackgroundImage(rwandanCityImages[currentImageIndex].urls.small);
        } else {
          setBackgroundImage(rwandanCityImages[0].urls.small);
          currentImageIndex = 0;
        }
      }
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, [rwandanCityImages]);

  const fetchCityImages = async () => {
    try {
      const imageReq = await fetch(
        `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UN_SPLASH_ACCESS_KEY}&query=${props.rwandanCity}`
      );
      const response = await imageReq.json();
      if (response?.results) {
        if (response.results.length > 0) {
          setBackgroundImage(response.results[0].urls.small);
        }
        dispatch(setRwandanCityImages(response.results));
      } else {
        dispatch(setRwandanCityImages([]));
      }
    } catch (error) {
      //error while fetching city images
      console.log({ error });
    }
  };
  return (
    <CountryContainer style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          position: "absolute",
          padding: "2rem",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <CityHeader>
          <CountryInfo>
            <img
              src={require("../../../assets/rwanda.png")}
              width={20}
              height={20}
              style={{ borderRadius: 100 }}
            />
            <Typography variant="h3" fontSize={18} textTransform={"capitalize"}>
              Rwanda - {props.rwandanCity}
            </Typography>
          </CountryInfo>
          <Button
            sx={{ color: "#000", padding: 0 }}
            onClick={() => setShowModal(true)}
          >
            <ArrowDropDownCircleIcon fontSize="large" />
          </Button>
        </CityHeader>
      </div>
      <SwithCity setShowModal={setShowModal} showModal={showModal} />
    </CountryContainer>
  );
}

export default Rwanda;

const CityHeader = styled("div")({
  backgroundColor: "rgba(255,255,255,0.5)",
  padding: "1rem",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const CountryInfo = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 5,
});

const CountryContainer = styled("div")({
  height: "100%",
  width: "50%",
  transition: "all 1.5s",
  backgroundSize: "100% 100%",
  position: "relative",
});
