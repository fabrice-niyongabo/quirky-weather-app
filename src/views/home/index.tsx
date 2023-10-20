import { useState, useEffect } from "react";
import {
  MenuItem,
  Select,
  Theme,
  Typography,
  useTheme,
  withTheme,
} from "@mui/material";
import ParticlesBg from "./particles-bg";
import rwandanCities from "../../constants/cities/rwanda/rwanda.json";
import swedenCities from "../../constants/cities/sweden/sweden.json";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { THEME_COLORS } from "../../constants";

function Home() {
  const navigate = useNavigate();
  const [swedenCity, setSwedenCity] = useState("");
  const [rwandanCity, setRwandaCity] = useState("");
  const [disableInputs, setDesableInputs] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    if (swedenCity !== "" && rwandanCity !== "") {
      setDesableInputs(true);
      setTimeout(() => {
        navigate(`/${swedenCity}/${rwandanCity}`);
      }, 500);
    }
  }, [swedenCity, rwandanCity]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <ParticlesBg />
      <HomeContainer theme={theme}>
        <StyledCard theme={theme}>
          <StyledTypograph theme={theme} variant="h3">
            Select a city from Sweden
          </StyledTypograph>
          <StyledSelect
            theme={theme}
            size="medium"
            color="primary"
            fullWidth
            value={swedenCity}
            disabled={disableInputs}
            onChange={(e: any) => setSwedenCity(e.target.value)}
          >
            <MenuItem value=""></MenuItem>
            {swedenCities.map((item, index) => (
              <MenuItem value={item.code} key={index}>
                {item.label}
              </MenuItem>
            ))}
          </StyledSelect>
        </StyledCard>
        <StyledCard theme={theme}>
          <StyledTypograph theme={theme} variant="h3">
            Select a city from Rwanda
          </StyledTypograph>
          <StyledSelect
            theme={theme}
            size="medium"
            color="primary"
            fullWidth
            value={rwandanCity}
            disabled={disableInputs}
            onChange={(e: any) => setRwandaCity(e.target.value)}
          >
            <MenuItem value=""></MenuItem>
            {rwandanCities.map((item, index) => (
              <MenuItem value={item.code} key={index}>
                {item.label}
              </MenuItem>
            ))}
          </StyledSelect>
        </StyledCard>
      </HomeContainer>
    </div>
  );
}

export default Home;

const HomeContainer = styled("div")(({ theme }: { theme: Theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "5rem",
  gap: 10,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    margin: 0,
    padding: "4rem",
  },
}));

const StyledTypograph = styled(Typography)(({ theme }: { theme: Theme }) => ({
  borderBottom: "1px solid #CCC",
  paddingBottom: 5,
  [theme.breakpoints.down("md")]: {
    fontSize: 20,
    textAlign: "center",
  },
}));

const StyledCard = styled("div")(({ theme }: { theme: Theme }) => ({
  padding: "5rem",
  backgroundColor: "rgba(255,255,255,0.5)",
  borderRadius: "10px",
  [theme.breakpoints.down("md")]: {
    padding: "2rem",
    width: "100%",
  },
}));

const StyledSelect = styled(Select)(({ theme }: { theme: Theme }) => ({
  marginTop: "1rem",
  backgroundColor:
    theme.palette.mode === "dark"
      ? THEME_COLORS.dark.background.dark
      : THEME_COLORS.light.background.dark,
  color: "primary",
}));
