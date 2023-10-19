import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import QruirkyAppModal from "../../../../components/modal";
import rwandanCities from "../../../../constants/cities/rwanda/rwanda.json";
import swedenCities from "../../../../constants/cities/sweden/sweden.json";
import { useNavigate, useParams } from "react-router-dom";
import { cityTpe } from "../../../../interfaces";

interface IProps {
  showModal: boolean;
  setShowModal: any;
  cityType: cityTpe;
}
function SwithCity({ showModal, setShowModal, cityType }: IProps) {
  const { swedenCity, rwandanCity } = useParams();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("");

  const currentCity = cityType === "Rwandan" ? rwandanCity : swedenCity;
  const citiesToUse = cityType === "Rwandan" ? rwandanCities : swedenCities;

  const handleSwitchTheCity = () => {
    setShowModal(false);
    const url =
      cityType === "Rwandan"
        ? `/${swedenCity}/${selectedCity}`
        : `/${selectedCity}/${rwandanCity}`;
    navigate(url);
  };
  return (
    <QruirkyAppModal
      open={showModal}
      setOpen={setShowModal}
      title="Change the city"
      width={"50%"}
    >
      <>
        <div style={{ height: 250, overflowY: "auto" }}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <Grid container>
                {citiesToUse.map((item, index) => (
                  <Grid xs={6} sm={6} md={4} key={index}>
                    <FormControlLabel
                      value={item.label}
                      control={<Radio />}
                      label={item.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </FormControl>
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginTop: "0.5rem",
          }}
        >
          <Button
            onClick={() => handleSwitchTheCity()}
            disabled={selectedCity === "" || selectedCity === currentCity}
            variant="contained"
            size="medium"
            sx={{ textTransform: "capitalize" }}
          >
            Switch{" "}
            {selectedCity === "" || selectedCity === currentCity
              ? "City"
              : "to " + selectedCity}
          </Button>
        </Box>
      </>
    </QruirkyAppModal>
  );
}

export default SwithCity;
