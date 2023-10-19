import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
interface IConfirmationProps {
  showAlert: boolean;
  setShowAlert: any;
  callback: any;
  title: string;
}
function ConfirmationAlert({
  showAlert,
  setShowAlert,
  callback,
  title,
}: IConfirmationProps) {
  return (
    <div>
      <Dialog
        open={showAlert}
        onClose={() => setShowAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ borderBottom: "1px solid #CCC" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* <WarningIcon style={{ fontWeight: "500", color: "#000" }} /> */}
            <Typography
              variant="h4"
              style={{ fontSize: 18, fontWeight: "600", color: "#000" }}
            >
              Confirmation
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ paddingTop: "1rem", fontSize: 14 }}
          >
            {title ? title : " Do you want to perform this process?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAlert(false)} color="primary">
            Not Sure
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              callback();
              setShowAlert(false);
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationAlert;
