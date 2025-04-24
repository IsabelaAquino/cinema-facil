import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#004EE4"
    },
    background:{
      default: "#131313",
      paper: "#252525"
    }
  },
});