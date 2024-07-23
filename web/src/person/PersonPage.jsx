import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { Box } from "@mui/system"
import PersonTable from "./PersonTable"
import PersonForm from "./PersonForm"
import { useState } from "react";

const PersonPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Person
          </Typography>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsFormOpen(true)}
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box py={4}>
        <PersonTable />
      </Box>

      <Drawer
        anchor="right"
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      >
        <PersonForm />
      </Drawer>
    </>
  )
}

export default PersonPage
