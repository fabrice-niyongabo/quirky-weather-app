import { useState } from "react";
import { MenuItem, Select, Typography } from "@mui/material";
import ParticlesBg from "./particles-bg";
import rwandanCities from "../../constants/cities/rwanda/rwanda.json";
import swedenCities from "../../constants/cities/sweden/sweden.json";

function Home() {
  const [swedenCity, setSwedenCity] = useState("");
  const [rwandanCity, setRwandaCity] = useState("");
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <ParticlesBg />
      <div
        style={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          margin: "5rem",
        }}
      >
        <div style={styles.card}>
          <Typography sx={{ borderBottom: "1px solid #CCC" }} variant="h3">
            Select a city from Sweden
          </Typography>
          <Select
            size="medium"
            color="primary"
            fullWidth
            sx={styles.input}
            value={swedenCity}
            onChange={(e: any) => setSwedenCity(e.target.value)}
          >
            <MenuItem value=""></MenuItem>
            {swedenCities.map((item, index) => (
              <MenuItem value={item.code} key={index}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div style={styles.card}>
          <Typography sx={{ borderBottom: "1px solid #CCC" }} variant="h3">
            Select a city from Rwanda
          </Typography>
          <Select
            size="medium"
            color="primary"
            fullWidth
            sx={styles.input}
            value={rwandanCity}
            onChange={(e: any) => setRwandaCity(e.target.value)}
          >
            <MenuItem value=""></MenuItem>
            {rwandanCities.map((item, index) => (
              <MenuItem value={item.code} key={index}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}

export default Home;

const styles = {
  card: {
    padding: "5rem",
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: "10px",
  },
  input: { marginTop: "1rem", backgroundColor: "rgba(255,255,255,0.5)" },
};
