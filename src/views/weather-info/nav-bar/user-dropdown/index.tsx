import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducers";
import { Menu, MenuItem } from "@mui/material";
import FullPageLoader from "../../../../components/full-page-loader";
import { googleLogout } from "@react-oauth/google";
import { resetUser } from "../../../../redux/actions/user";
import QruirkyAppModal from "../../../../components/modal";
import ConfirmationAlert from "../../../../components/confirmation-alert";

function UserDropDown() {
  const dispatch = useDispatch();
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
      } catch (error) {
        dispatch(resetUser());
        setIsLoading(false);
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
        <MenuItem onClick={handleClose}>
          <div>
            <p style={{ padding: 0, margin: 0, fontWeight: "600" }}>
              {user.fName} {user.lName}
            </p>
            <span style={{ fontSize: 12 }}>{user.email}</span>
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>Saved Weather</MenuItem>
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
