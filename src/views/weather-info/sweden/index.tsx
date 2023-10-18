import { Button, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { setSwedenCity, setSwedenCityImages } from "../../../redux/actions/app";
import SwithCity from "./switch-city";
import Weather from "../weather";
import Joke from "../../../components/joke";

interface IProps {
  swedenCity: string | undefined;
}
function Sweden(props: IProps) {
  const dispatch = useDispatch();
  const { swedenCity, swedenCityImages } = useSelector(
    (state: RootState) => state.appReducer
  );

  const [showModal, setShowModal] = useState(false);
  //background image state
  let currentImageIndex = 0;
  const fallbackImage = require("../../../assets/clouds.gif");
  const defaultImage =
    swedenCityImages.length > 0
      ? swedenCityImages[0].urls.small
      : fallbackImage;
  const [backgroundImage, setBackgroundImage] = useState(defaultImage);

  useEffect(() => {
    if (!props.swedenCity) return;
    //fetching images only if sweden city in the params is defferent from the store
    if (swedenCity !== props.swedenCity) {
      setBackgroundImage(fallbackImage);
      dispatch(setSwedenCity(props.swedenCity));
      fetchCityImages();
    } else if (swedenCityImages.length === 0) {
      fetchCityImages();
    }
  }, [props.swedenCity]);

  //image interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (swedenCityImages.length > 0) {
        currentImageIndex += 1;
        if (swedenCityImages[currentImageIndex]) {
          setBackgroundImage(swedenCityImages[currentImageIndex].urls.small);
        } else {
          setBackgroundImage(swedenCityImages[0].urls.small);
          currentImageIndex = 0;
        }
      }
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, [swedenCityImages]);

  const fetchCityImages = async () => {
    try {
      const imageReq = await fetch(
        `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UN_SPLASH_ACCESS_KEY}&query=${props.swedenCity}`
      );
      const response = await imageReq.json();
      if (response?.results) {
        if (response.results.length > 0) {
          setBackgroundImage(response.results[0].urls.small);
        }

        dispatch(setSwedenCityImages(response.results));
      } else {
        dispatch(setSwedenCityImages([]));
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
          backgroundColor: "rgba(0,0,0,0.8)",
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
              src={require("../../../assets/sweden.png")}
              width={20}
              height={20}
              style={{ borderRadius: 100 }}
            />
            <Typography variant="h3" fontSize={18} textTransform={"capitalize"}>
              Sweden - {props.swedenCity}
            </Typography>
          </CountryInfo>
          <Button
            sx={{ color: "#000", padding: 0 }}
            onClick={() => setShowModal(true)}
          >
            <ArrowDropDownCircleIcon fontSize="large" />
          </Button>
        </CityHeader>
        <Weather cityName={props.swedenCity} />
        <Joke />
      </div>
      <SwithCity setShowModal={setShowModal} showModal={showModal} />
    </CountryContainer>
  );
}

export default Sweden;

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
