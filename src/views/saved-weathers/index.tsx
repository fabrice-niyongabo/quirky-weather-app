import styled from "@emotion/styled";
import { Clear, Home } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import UserDropDown from "../weather-info/nav-bar/user-dropdown";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import { useEffect, useState } from "react";
import { errorHandler, toastMessage } from "../../helpers";
import { BACKEND_API_URL } from "../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { ICityWeatherInfo } from "../../interfaces";
import FullPageLoader from "../../components/full-page-loader";
import ConfirmationAlert from "../../components/confirmation-alert";
import { isMobile } from "react-device-detect";
import MobileNav from "./mobile";

interface IweatherReaponse {
  _id: string;
  userId: string;
  rwandanCityName: string;
  swedenCityName: string;
  rwandanCityWeatherInfo: ICityWeatherInfo;
  swedenCityWeatherInfo: ICityWeatherInfo;
  createdAt: string;
}
function SavedWeathers() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.userReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState<IweatherReaponse[]>([]);

  const [selectedItem, setSelectedItem] = useState<
    IweatherReaponse | undefined
  >(undefined);

  const [showAlert, setShowAlert] = useState(false);
  const [showFullLoader, setShowFullLoader] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(BACKEND_API_URL + "/weather", {
        headers: { token },
      });
      const data = await response.json();
      setTimeout(() => {
        setIsLoading(false);
        if (response.ok) {
          setWeatherInfo(data.weather);
        } else {
          errorHandler(data);
        }
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      errorHandler(error);
    }
  };

  const handleDelete = async () => {
    try {
      setShowFullLoader(true);
      const response = await fetch(
        BACKEND_API_URL + "/weather/" + selectedItem?._id,
        {
          method: "DELETE",
          headers: {
            token,
          },
        }
      );
      const data = await response.json();
      setTimeout(() => {
        setShowFullLoader(false);
        if (response.ok) {
          toastMessage("success", data.msg);
          setWeatherInfo(
            weatherInfo.filter((item) => item._id !== selectedItem?._id)
          );
          setSelectedItem(undefined);
        } else {
          errorHandler(data);
        }
      }, 1000);
    } catch (error) {
      setShowFullLoader(false);
    }
  };
  return (
    <MainContainer>
      <NavBarContainer theme={theme}>
        {!isMobile ? (
          <>
            <Box
              sx={{ userSelect: "none", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <Typography variant="h3" fontSize={20}>
                Quirky weather App
              </Typography>
            </Box>
            <MenuList>
              <li onClick={() => navigate("/")}>
                <Home />
                <span>Home</span>
              </li>
              <UserDropDown toggleNav={undefined} />
            </MenuList>
          </>
        ) : (
          <MobileNav />
        )}
      </NavBarContainer>
      <StyledContainer theme={theme}>
        <Card>
          <CardHeader
            title=" Saved weather information"
            sx={{ borderBottom: "1px solid #CCC" }}
          />
          <CardContent>
            {isLoading ? (
              <Loader />
            ) : (
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledBorderedHeaderCell>#</StyledBorderedHeaderCell>
                      <StyledBorderedHeaderCell>City</StyledBorderedHeaderCell>
                      <StyledBorderedHeaderCell>
                        Temperature
                      </StyledBorderedHeaderCell>
                      <StyledBorderedHeaderCell>
                        Wind Speed
                      </StyledBorderedHeaderCell>
                      <StyledBorderedHeaderCell>
                        Humidity
                      </StyledBorderedHeaderCell>
                      <StyledBorderedHeaderCell>
                        Description
                      </StyledBorderedHeaderCell>
                      <StyledBorderedHeaderCell>Date</StyledBorderedHeaderCell>
                      <BorderedHeaderCell>Action</BorderedHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {weatherInfo.map((item, index) => (
                      <>
                        <TableRow>
                          <StyledTableCell rowSpan={2}>
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell sx={{ textTransform: "capitalize" }}>
                            {item.swedenCityName}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item.swedenCityWeatherInfo.temperature}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item.swedenCityWeatherInfo.windSpeed} Km/h
                          </StyledTableCell>
                          <StyledTableCell>
                            {item.swedenCityWeatherInfo.humidity}
                          </StyledTableCell>
                          <StyledTableCell sx={{ textTransform: "capitalize" }}>
                            {item.swedenCityWeatherInfo.description}
                          </StyledTableCell>
                          <StyledTableCell rowSpan={2}>
                            {new Date(item.createdAt).toDateString()}
                          </StyledTableCell>
                          <TableCell rowSpan={2}>
                            <Button
                              color="error"
                              onClick={() => {
                                setSelectedItem(item);
                                setShowAlert(true);
                              }}
                            >
                              <Clear />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableCell sx={{ textTransform: "capitalize" }}>
                            {item.rwandanCityName}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item.rwandanCityWeatherInfo.temperature}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item.rwandanCityWeatherInfo.windSpeed} Km/h
                          </StyledTableCell>
                          <StyledTableCell>
                            {item.rwandanCityWeatherInfo.humidity}
                          </StyledTableCell>
                          <StyledTableCell sx={{ textTransform: "capitalize" }}>
                            {item.rwandanCityWeatherInfo.description}
                          </StyledTableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </StyledContainer>
      <ConfirmationAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        title="Do you want to delete this weather info?"
        callback={handleDelete}
      />
      <FullPageLoader open={showFullLoader} />
    </MainContainer>
  );
}

export default SavedWeathers;

const StyledContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
  paddingTop: "1rem",
  paddingBottom: "1rem",
  [theme.breakpoints.down("md")]: {
    paddingTop: "5rem",
  },
}));

const BorderedHeaderCell = styled(TableCell)({
  fontWeight: "bold",
});

const StyledBorderedHeaderCell = styled(BorderedHeaderCell)({
  borderRight: "1px solid #e0e0e0",
});

const StyledTableCell = styled(TableCell)({
  borderRight: "1px solid #e0e0e0",
});

const MenuList = styled("ul")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  userSelect: "none",
  gap: 10,
  li: {
    listStyle: "none",
    textTransform: "capitalize",
    fontWeight: "600",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
    ":hover": {
      cursor: "pointer",
      opacity: 0.5,
    },
  },
});

const NavBarContainer = styled("nav")(({ theme }: { theme: Theme }) => ({
  backgroundColor: "#000",
  height: 100,
  transition: "all 1s",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0rem 5rem",
  color: "whitesmoke",
  [theme.breakpoints.down("md")]: {
    top: 0,
    left: 0,
    right: 0,
    position: "fixed",
    height: "auto",
    padding: "1rem",
  },
}));

const MainContainer = styled("div")({
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "#f2f2f2",
  margin: 0,
  top: 0,
});
