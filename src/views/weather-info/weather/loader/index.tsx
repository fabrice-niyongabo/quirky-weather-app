import { Skeleton } from "@mui/material";
import React from "react";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Skeleton
        variant="rectangular"
        width={100}
        height={20}
        style={{ background: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}
      />
      <Skeleton
        variant="rectangular"
        width={150}
        height={10}
        style={{ background: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}
      />
      <Skeleton
        variant="circular"
        width={150}
        height={150}
        style={{ background: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}
      />
      <Skeleton
        variant="rectangular"
        width={170}
        height={40}
        style={{ background: "rgba(255,255,255,0.5)", marginBottom: "2rem" }}
      />
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={150}
        style={{ background: "rgba(255,255,255,0.5)", borderRadius: "10px" }}
      />
    </div>
  );
}

export default Loader;
