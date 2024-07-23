import { RouterProvider as ReactRouterProvider } from "react-router-dom"
import router from "./Router"

const RouterProvider = (props) => {
  return (
    <ReactRouterProvider router={ router }>
      { props.children }
    </ReactRouterProvider>
  )
}

export default RouterProvider
