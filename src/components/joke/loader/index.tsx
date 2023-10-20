import { Skeleton } from "@mui/material";
import React from "react";
import { THEME_COLORS } from "../../../constants";

function Loader() {
  return (
    <div>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={10}
        sx={{
          background: (theme) =>
            theme.palette.mode === "light"
              ? THEME_COLORS.light.background.light
              : THEME_COLORS.dark.background.light,
        }}
      />
    </div>
  );
}

export default Loader;
