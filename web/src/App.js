import "./App.css"
import RouterProvider from "./router/RouterProvider"
import { ThemeProvider } from "@mui/material"
import theme from "./common/layout/theme"
import DatabaseProvider from "./database/DatabaseProvider"
import AuthProvider from "./auth/AuthProvider"
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <DatabaseProvider>
          <ThemeProvider theme={theme}>
            <RouterProvider />
          </ThemeProvider>
        </DatabaseProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
