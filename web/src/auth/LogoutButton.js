import { Button, IconButton } from "@mui/material"
import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = ({ onLogout, onlyIcon }) => {
  if (onlyIcon) 
    return (
      <IconButton color="secondary">
        <LogoutIcon />
      </IconButton>
    );
  else 
    return (
      <Button
        variant="outlined"
        color="secondary"
        sx={{ width: "90%" }}
        onClick={onLogout}
      >
        Log Out
      </Button>
    );
};

export default LogoutButton;