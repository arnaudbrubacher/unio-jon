import { Grid, Typography } from "@mui/material"
import React from "react"

const RejectedPage = () => {
  return (
    <>
      <Grid container justifyContent="center" mt={8}>
        <Grid item xs={6}>
          <Typography variant="h3" textAlign="center">Vous n'êtes plus admis dans cette élection</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default RejectedPage
