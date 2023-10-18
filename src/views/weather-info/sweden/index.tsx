import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { setSwedenCity, setSwedenCityImages } from "../../../redux/actions/app";

interface IProps {
  swedenCity: string | undefined;
}
function Sweden(props: IProps) {
  const dispatch = useDispatch();
  const { swedenCity, swedenCityImages } = useSelector(
    (state: RootState) => state.appReducer
  );

  //background image state
  let currentImageIndex = 0;
  const defaultImage =
    swedenCityImages.length > 0 ? swedenCityImages[0].urls.small : "";
  const [backgroundImage, setBackgroundImage] = useState(defaultImage);

  useEffect(() => {
    if (!props.swedenCity) return;
    //fetching images only if sweden city in the params is defferent from the store
    if (swedenCity !== props.swedenCity) {
      setBackgroundImage("");
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
    <SwedenContainer style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          height: "100%",
          width: "1005",
        }}
      ></div>
    </SwedenContainer>
  );
}

export default Sweden;

const SwedenContainer = styled("div")({
  height: "100%",
  width: "50%",
  transition: "all 1.5s",
  backgroundSize: "100% 100%",
});
