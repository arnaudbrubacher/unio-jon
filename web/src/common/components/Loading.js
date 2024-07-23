import { CircularProgress } from "@material-ui/core";
import { Box } from "@mui/material";
import React from "react";

const Loading = () => (
  <Box height="100vh" sx={{ backgroundColor: "transparent" }}>
    <CircularProgress />
  </Box>
);

export default Loading;