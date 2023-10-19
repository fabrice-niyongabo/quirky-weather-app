import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import City from "./city";

function WeatherInfo() {
  const { swedenCity, rwandanCity } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!swedenCity || !rwandanCity) {
      navigate("/");
    }
  }, []);
  return (
    <WeatherWrapper>
      <WeatherInfoGrid>
        <City cityType="Sweden" cityName={swedenCity} />
        <City cityType="Rwandan" cityName={rwandanCity} />
      </WeatherInfoGrid>
    </WeatherWrapper>
  );
}

export default WeatherInfo;

const WeatherWrapper = styled(Box)({
  width: "100vw",
  height: "100vh",
  position: "relative",
});

const WeatherInfoGrid = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
