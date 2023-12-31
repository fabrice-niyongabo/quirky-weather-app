import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducers";
import { Menu, MenuItem } from "@mui/material";
import FullPageLoader from "../../../../components/full-page-loader";
import { googleLogout } from "@react-oauth/google";
import { resetUser } from "../../../../redux/actions/user";
import ConfirmationAlert from "../../../../components/confirmation-alert";
import { toastMessage } from "../../../../helpers";
import { useNavigate } from "react-router-dom";

interface IProps {
  toggleNav: any;
}
function UserDropDown({ toggleNav }: IProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // handleClose()
    setIsLoading(true);
    setTimeout(() => {
      try {
        googleLogout();
        dispatch(resetUser());
        setIsLoading(false);
        toastMessage("success", "Logged out!");
        if (toggleNav) {
          toggleNav();
        }
      } catch (error) {
        dispatch(resetUser());
        setIsLoading(false);
        toastMessage("success", "Logged out!");
        if (toggleNav) {
          toggleNav();
        }
      }
    }, 1000);
  };
  return (
    <>
      <li
        title={user.email}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img
          src={user.image}
          width={30}
          height={30}
          style={{ borderRadius: "100%" }}
          alt=""
        />
        <span>{user.fName}</span>
      </li>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ marginTop: 2 }}
      >
        <MenuItem>
          <div>
            <p style={{ padding: 0, margin: 0, fontWeight: "600" }}>
              {user.fName} {user.lName}
            </p>
            <span style={{ fontSize: 12 }}>{user.email}</span>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/weathers");
          }}
        >
          Saved Weather
        </MenuItem>
        <MenuItem onClick={() => setShowAlert(true)}>Logout</MenuItem>
      </Menu>
      <ConfirmationAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        title="Do you still want to logout from your account?"
        callback={handleLogout}
      />
      <FullPageLoader open={isLoading} />
    </>
  );
}

export default UserDropDown;
