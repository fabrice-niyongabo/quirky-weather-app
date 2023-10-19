import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

interface IFullPageLoader {
  open: boolean;
}

const FullPageLoader: React.FC<IFullPageLoader> = (props) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    >
      <CircularProgress color="info" />
    </Backdrop>
  );
};

export default FullPageLoader;
