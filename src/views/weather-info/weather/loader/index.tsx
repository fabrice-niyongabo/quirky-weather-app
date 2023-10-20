import styled from "@emotion/styled";
import { Skeleton, Theme, useTheme } from "@mui/material";
import { THEME_COLORS } from "../../../../constants";

function Loader() {
  const theme = useTheme();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <StyledSkeleton
        theme={theme}
        variant="rectangular"
        width={100}
        height={20}
        style={{
          marginBottom: "1rem",
          marginTop: "1rem",
        }}
      />
      <StyledSkeleton
        theme={theme}
        variant="rectangular"
        width={150}
        height={10}
        style={{ marginBottom: "1rem" }}
      />
      <StyledSkeleton
        theme={theme}
        variant="circular"
        width={150}
        height={150}
        style={{ marginBottom: "1rem" }}
      />
      <StyledSkeleton
        theme={theme}
        variant="rectangular"
        width={170}
        height={40}
        style={{ marginBottom: "2rem" }}
      />
      <StyledSkeleton
        theme={theme}
        variant="rectangular"
        width={"100%"}
        height={120}
        style={{ borderRadius: "10px" }}
      />
    </div>
  );
}

export default Loader;

const StyledSkeleton = styled(Skeleton)(({ theme }: { theme: Theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? THEME_COLORS.dark.background.light
      : THEME_COLORS.light.background.light,
}));
