import { Skeleton } from "@mui/material";
import React from "react";

function Loader() {
  return (
    <div>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={10}
        style={{ background: "rgba(255,255,255,0.5)" }}
      />
    </div>
  );
}

export default Loader;
