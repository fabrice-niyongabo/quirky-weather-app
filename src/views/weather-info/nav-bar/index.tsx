import styled from "@emotion/styled";
import { Save, Share } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import QruirkyAppModal from "../../../components/modal";
import { GoogleLogin } from "@react-oauth/google";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import FullPageLoader from "../../../components/full-page-loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { errorHandler, toastMessage } from "../../../helpers";
import { BACKEND_API_URL } from "../../../constants";
import { setUser, setUserToken } from "../../../redux/actions/user";
import UserDropDown from "./user-dropdown";

function NavBar() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.userReducer);
  const {
    swedenCity,
    rwandanCity,
    swedenCityWeatherInfo,
    rwandanCityWeatherInfo,
  } = useSelector((state: RootState) => state.appReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [expandNav, setExpandNav] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const shareUrl = window.location.href;

  const toggleNav = () => {
    setExpandNav(!expandNav);
  };

  const handleSave = () => {
    if (token.trim() === "") {
      setShowLoginModal(true);
      return;
    }
    saveWeather();
  };

  const saveWeather = async () => {
    try {
      if (
        !(
          rwandanCity &&
          swedenCity &&
          rwandanCityWeatherInfo &&
          swedenCityWeatherInfo
        )
      ) {
        toastMessage("info", "No correct weather information available yet!");
        return;
      }
      setIsLoading(true);
      const response = await fetch(BACKEND_API_URL + "/weather", {
        method: "POST",
        body: JSON.stringify({
          swedenCityName: swedenCity,
          rwandanCityName: rwandanCity,
          swedenCityWeatherInfo,
          rwandanCityWeatherInfo,
        }),
        headers: {
          token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTimeout(() => {
        setIsLoading(false);

        if (response.ok) {
          toastMessage("success", data.msg);
          toggleNav();
        } else {
          errorHandler(data);
        }
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      errorHandler(error);
    }
  };

  const handleLogin = async (credential: string | undefined) => {
    try {
      setIsLoading(true);
      const response = await fetch(BACKEND_API_URL + "/users/login", {
        method: "POST",
        body: JSON.stringify({ credential }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        //login the user
        const { user, token, msg } = data;
        dispatch(setUser(user));
        dispatch(setUserToken(token));
        toastMessage("success", msg);

        setShowLoginModal(false);

        //save weather info
        saveWeather();
      } else {
        errorHandler(data);
      }
    } catch (error) {
      setIsLoading(true);
      errorHandler(error);
    }
  };
  return (
    <>
      <NavBarContainer style={{ height: expandNav ? 100 : 10 }}>
        <NavbarMainContainer>
          {expandNav && (
            <>
              <Typography variant="h3" fontSize={20}>
                Quirky weather App
              </Typography>
              <MenuList>
                <li onClick={() => handleSave()}>
                  <Save />
                  <span>save</span>
                </li>
                <li
                  onClick={() => {
                    toggleNav();
                    setShowShareModal(true);
                  }}
                >
                  <Share />
                  <span>share</span>
                </li>
                {token.trim() !== "" && <UserDropDown />}
              </MenuList>
            </>
          )}
          <NavbarButton onClick={() => toggleNav()}>
            <div
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                display: "flex",
              }}
            >
              <div style={{ position: "absolute", top: expandNav ? -20 : -15 }}>
                {expandNav ? (
                  <ArrowDropUpIcon fontSize="large" />
                ) : (
                  <ArrowDropDownIcon fontSize="large" />
                )}
              </div>
            </div>
          </NavbarButton>
        </NavbarMainContainer>
      </NavBarContainer>
      <QruirkyAppModal
        open={showShareModal}
        setOpen={setShowShareModal}
        title="Share"
      >
        <Grid container>
          <Grid item md={3}>
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon style={shareIconStyles} />
            </FacebookShareButton>
          </Grid>
          <Grid item md={3}>
            <TelegramShareButton url={shareUrl}>
              <TelegramIcon style={shareIconStyles} />
            </TelegramShareButton>
          </Grid>
          <Grid item md={3}>
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon style={shareIconStyles} />
            </WhatsappShareButton>
          </Grid>
          <Grid item md={3}>
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon style={shareIconStyles} />
            </TwitterShareButton>
          </Grid>
        </Grid>
      </QruirkyAppModal>

      <QruirkyAppModal open={showLoginModal} setOpen={setShowLoginModal}>
        <LoginContainer>
          <p>Please Login First!</p>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleLogin(credentialResponse.credential);
            }}
            onError={() => {
              toastMessage("error", "Login Failed. Please try again");
            }}
          />
        </LoginContainer>
      </QruirkyAppModal>

      <FullPageLoader open={isLoading} />
    </>
  );
}

export default NavBar;

const LoginContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "1rem",
});

const shareIconStyles = {
  borderRadius: "100%",
};

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

const NavbarButton = styled("div")({
  height: 15,
  color: "whitesmoke",
  backgroundColor: "#000",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  position: "absolute",
  bottom: -15,
  left: "45%",
  right: "45%",
  "&:hover": {
    cursor: "pointer",
  },
});
const NavbarMainContainer = styled("div")({
  position: "relative",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0rem 5rem",
  color: "whitesmoke",
});

const NavBarContainer = styled("nav")({
  top: 0,
  right: 0,
  left: 0,
  backgroundColor: "#000",
  position: "absolute",
  height: 10,
  zIndex: 1,
  transition: "all 1s",
});
