import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { Box } from "@mui/system"
import ElectionTable from "./ElectionTable"
import ElectionForm from "./ElectionForm"
import { useState } from "react";

const ElectionPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Election
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
        <ElectionTable />
      </Box>

      <Drawer
        anchor="right"
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      >
        <ElectionForm />
      </Drawer>
    </>
  )
}

export default ElectionPage
