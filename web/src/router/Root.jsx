import { Drawer, Link, Box, Grid, useMediaQuery } from "@mui/material"
import { isMobile } from "react-device-detect"
import { Navigate } from "react-router"
import { useAuth0 } from "@auth0/auth0-react"
import LogoutButton from "../auth/LogoutButton"
import Loading from "../common/components/Loading"
import { useContext, useState } from "react"
import { AuthContext } from "../auth/AuthProvider"
import { useNavigate } from "react-router"
import theme from "../common/layout/theme"


const drawerWidth = isMobile ? "75px" : "240px"

const drawerWidth = isMobile ? "100px" : "240px"

const Root = ({ children }) => {
  const { logout, error } = useAuth0();
  const { state, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [isMenuOpen, setIsMenuOpen] = useState(isSmallScreen);

  if (!state.isLoggedIn) {
    return <Navigate to="/login" />
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }


  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    })
    logout({ logoutParams: { returnTo: window.location.origin } })
  }


  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: "primary.main",
            // TODO: Make this based on application background color (primary or secondary)
            boxShadow:
              "5px 0px 20px 0px rgba(0, 0, 0, 0.2), 10px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
          },
        }}
        variant="permanent"
        open={isMenuOpen}
        anchor="left"
      >
        <Box p={2} pt={isMobile ? 4 : 6}>
          <Box height={180} sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src="./logo.png" alt="logo" width={isMobile ? 40 : 210} />
          </Box>
        </Box>

        <Box p={2}>
          <Box p={2}>
            <Link
              color="#FAF8F5"
              href="/"
              variant={isMobile ? "content" : "h6"}
              underline="none"
            >
              Mes Élections
            </Link>
          </Box>
          <Box p={2} key={0}>
            <Link
              color="#FAF8F5"
              href="profile"
              variant={isMobile ? "content" : "h6"}
              underline="none"
            >
              Profile
            </Link>
          </Box>
          {/* <Box p={2} key={0}>
            <Link
              color="#FAF8F5"
              href="person"
              variant={isMobile ? "content" : "h6"}
              underline="none"
            >
              Person
            </Link>
          </Box> */}
          <Box p={2} key={1}>
            <Link
              color="#FAF8F5"
              href="election"
              variant={isMobile ? "content" : "h6"}
              underline="none"
            >
              Election
            </Link>
          </Box>
        </Box>
        <Box position="absolute" bottom="16px" width="-webkit-fill-available">
          <Grid container justifyContent="center">
            <LogoutButton onLogout={handleLogout} onlyIcon={isSmallScreen}/>
          </Grid>
        </Box>
      </Drawer>

      <Box p={2} pl={isMobile || isSmallScreen ? 10 : 34}>
        {children}
      </Box>

      <Loading />
    </>
  )
}

export default Root
