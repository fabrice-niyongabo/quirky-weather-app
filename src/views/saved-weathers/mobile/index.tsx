import styled from "@emotion/styled";
import { Close, Home, Menu } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import UserDropDown from "../../weather-info/nav-bar/user-dropdown";

export default function MobileNav() {
  const { token } = useSelector((state: RootState) => state.userReducer);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{ userSelect: "none", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <Typography variant="h3" fontSize={20}>
          Quirky weather App
        </Typography>
      </Box>
      <div onClick={() => toggleMenu()}>{showMenu ? <Close /> : <Menu />}</div>
      <MenuBox
        sx={{
          right: showMenu ? -17 : -200,
          background: (theme) => theme.palette.background.paper,
        }}
      >
        <MenuList>
          <li onClick={() => navigate("/")}>
            <Home />
            <span>Home</span>
          </li>
          {token.trim() !== "" && <UserDropDown toggleNav={toggleMenu} />}
        </MenuList>
      </MenuBox>
    </div>
  );
}

const MenuList = styled("ul")({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  userSelect: "none",
  flexDirection: "column",
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

const MenuBox = styled(Box)({
  transition: "all 1s",
  position: "absolute",
  top: 40,
  width: 150,
  padding: "1rem",
});
