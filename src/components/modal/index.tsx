import { Close } from "@mui/icons-material";
import { Box, Button, Modal, Typography } from "@mui/material";
import { ReactElement } from "react";

interface IProps {
  setOpen: any;
  open: boolean;
  width?: number | string;
  children: ReactElement;
  title?: string;
}
function QruirkyAppModal({ open, setOpen, width, children, title }: IProps) {
  return (
    <>
      <Modal
        open={open}
        autoFocus={false}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={width ? { ...style, width } : style}>
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
                sx={{
                  color: "black",
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
        </Box>
      </Modal>
    </>
  );
}

export default QruirkyAppModal;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgba(255,255,255,0.8)",
  borderRadius: "10px",
  outline: "none",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
