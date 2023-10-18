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
import swedenCities from "../../../../constants/cities/sweden/sweden.json";
import { useNavigate, useParams } from "react-router-dom";

interface IProps {
  showModal: boolean;
  setShowModal: any;
}
function SwithCity({ showModal, setShowModal }: IProps) {
  const { swedenCity, rwandanCity } = useParams();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("");

  const handleSwitchTheCity = () => {
    setShowModal(false);
    navigate(`/${selectedCity}/${rwandanCity}`);
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
                {swedenCities.map((item, index) => (
                  <Grid md={4} key={index}>
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
            disabled={selectedCity === "" || selectedCity === swedenCity}
            variant="contained"
            size="medium"
            sx={{ textTransform: "capitalize" }}
          >
            Switch{" "}
            {selectedCity === "" || selectedCity === swedenCity
              ? "City"
              : "to " + selectedCity}
          </Button>
        </Box>
      </>
    </QruirkyAppModal>
  );
}

export default SwithCity;
