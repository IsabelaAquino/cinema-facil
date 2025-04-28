import { AlertColor } from "@mui/material";

export interface IShowAlertProps {
  severity?: AlertColor;
  message: string;
  onClose?: () => void;
}
