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

function NavBar() {
  const [expandNav, setExpandNav] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const shareUrl = window.location.href;

  const toggleNav = () => {
    setExpandNav(!expandNav);
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
                <li onClick={() => setShowLoginModal(true)}>
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
              </MenuList>
            </>
          )}
          <NavbarButton onClick={() => toggleNav()}>
            {expandNav ? (
              <ArrowDropUpIcon fontSize="small" />
            ) : (
              <ArrowDropDownIcon fontSize="small" />
            )}
          </NavbarButton>
        </NavbarMainContainer>
      </NavBarContainer>
      <QruirkyAppModal
        open={showShareModal}
        setOpen={setShowShareModal}
        title="Share"
      >
        <Grid container>
          <Grid md={3}>
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon style={shareIconStyles} />
            </FacebookShareButton>
          </Grid>
          <Grid md={3}>
            <TelegramShareButton url={shareUrl}>
              <TelegramIcon style={shareIconStyles} />
            </TelegramShareButton>
          </Grid>
          <Grid md={3}>
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon style={shareIconStyles} />
            </WhatsappShareButton>
          </Grid>
          <Grid md={3}>
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon style={shareIconStyles} />
            </TwitterShareButton>
          </Grid>
        </Grid>
      </QruirkyAppModal>
      <QruirkyAppModal open={showLoginModal} setOpen={setShowLoginModal}>
        <>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </>
      </QruirkyAppModal>
    </>
  );
}

export default NavBar;

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
  bottom: -10,
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
