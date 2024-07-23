import { Box } from "@mui/material"
import { Navigate } from "react-router"
import { AuthContext } from "../auth/AuthProvider"
import { useContext } from "react"

const RootTest = ({ children }) => {
  // Add to template when user add authentification login service oauth
  const { state, } = useContext(AuthContext)

  if (!state.isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Box p={2}>{children}</Box>
    </>
  )
}

export default RootTest
