import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarComp(props) {
  const { open, setShowNotification, message, type } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowNotification({
      open: false,
      message: "",
      type: ""
    });
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%", maxWidth: "350px", wordBreak: "break-all" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}