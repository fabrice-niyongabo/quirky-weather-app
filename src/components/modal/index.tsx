import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Modal,
  Paper,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactElement } from "react";
import { isMobile } from "react-device-detect";

interface IProps {
  setOpen: any;
  open: boolean;
  width?: number | string;
  children: ReactElement;
  title?: string;
}
function QruirkyAppModal({ open, setOpen, width, children, title }: IProps) {
  const theme = useTheme();
  return (
    <>
      <Modal
        open={open}
        autoFocus={false}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box > */}
        <StyledPaper
          theme={theme}
          sx={{ pt: 2, px: 4, pb: 3, boxShadow: 24 }}
          style={{ width: width ? width : isMobile ? "80%" : 450 }}
        >
          <Box sx={{ position: "relative" }}>
            {title && (
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ fontWeight: "600" }}
              >
                {title}
              </Typography>
            )}

            <Box sx={{ position: "absolute", right: -20, top: 0 }}>
              <Button
                onClick={() => setOpen(false)}
                color="inherit"
                sx={{
                  fontWeight: "600",
                  padding: 0,
                  margin: 0,
                  width: "auto",
                }}
              >
                <Close />
              </Button>
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>{children}</Box>
        </StyledPaper>
        {/* </Box> */}
      </Modal>
    </>
  );
}

export default QruirkyAppModal;

const StyledPaper = styled(Paper)(({ theme }: { theme: Theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: isMobile ? "80%" : 400,
  // bgcolor: "rgba(255,255,255,0.8)",
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(255,255,255,0.8)"
      : theme.palette.background.paper,
  borderRadius: "10px",
  outline: "none",
}));
