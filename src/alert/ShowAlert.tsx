import { Alert, Snackbar } from "@mui/material";
import { IShowAlertProps } from "./interface/IShowAlertProps.interface";


export function ShowAlert({ severity = "success", message, onClose }: IShowAlertProps) {
  return (
    <Snackbar
      open={true}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
