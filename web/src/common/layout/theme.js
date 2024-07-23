import { createTheme } from "@mui/material/styles"

export const PRIMARY_MAIN = "#1c1c1c"
export const SECONDARY_MAIN = "#e1b2b2"

export const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: PRIMARY_MAIN,
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: SECONDARY_MAIN,
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: [
      "Orbitron",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontFeatureSettings: "smcp",
  },
})

export default theme
