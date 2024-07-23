import React, { useState, useEffect, useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "./AuthProvider"
import { Box, Grid } from "@mui/material"
import { PRIMARY_MAIN } from "../common/layout/theme"
import LoginButton from "./LoginButton"
import { useAuth0 } from "@auth0/auth0-react"

const LoginPage = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { state, dispatch } = useContext(AuthContext)
  const [, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;

      try {
        console.log(domain)
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await metadataResponse.json();
        setUserMetadata(data);
        dispatch({
          type: "LOGIN",
          payload: { user: data, isLoggedIn: true },
        })
      } catch (e) {
        console.log("Error:", e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub, dispatch]);

  if (state.isLoggedIn) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Box height="100vh" backgroundColor={PRIMARY_MAIN}>
        <Grid container p={4} justifyContent="space-between" alignItems="center">
          <img src="./logo.png" alt="Logo" width="140em" />
          <LoginButton />
        </Grid>


      </Box>

    </>
  )
}

export default LoginPage
