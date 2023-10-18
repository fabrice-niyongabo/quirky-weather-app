import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useEffect } from "react";
import Sweden from "./sweden";
import Rwanda from "./rwanda";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

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
        <Sweden swedenCity={swedenCity} />
        <Rwanda />
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
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
