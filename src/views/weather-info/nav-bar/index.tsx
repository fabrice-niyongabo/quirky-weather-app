import styled from "@emotion/styled";
import { Save, Share } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Typography } from "@mui/material";
import { useState } from "react";

function NavBar() {
  const [expandNav, setExpandNav] = useState(false);

  const toggleNav = () => {
    setExpandNav(!expandNav);
  };
  return (
    <NavBarContainer style={{ height: expandNav ? 100 : 10 }}>
      <NavbarMainContainer>
        {expandNav && (
          <>
            <Typography variant="h3" fontSize={20}>
              Quirky weather App
            </Typography>
            <MenuList>
              <li>
                <Save />
                <span>save</span>
              </li>
              <li>
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
  );
}

export default NavBar;

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
