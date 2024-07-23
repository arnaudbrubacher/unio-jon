import { createBrowserRouter } from "react-router-dom"
import Root from "./Root"
import RootTest from "./RootTest"
import HomePageContainer from "../home/HomePageContainer"
import ElectionPage from "../election/ElectionPage"
import BallotContainer from "../election/BallotContainer"
import ResultPage from "../election/ResultPage"
import LoginPage from "../auth/LoginPage"
import ProfilePage from "../auth/ProfilePage"

const router =
  createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: (
        <Root>
          <HomePageContainer />
        </Root>
      ),
    },
    // {
    //   path: "person",
    //   element: (
    //     <Root>
    //       <PersonPage />
    //     </Root>
    //   ),
    // },
    {
      path: "profile",
      element: (
        <Root>
          <ProfilePage />
        </Root>
      ),
    },
    {
      path: "election",
      element: (
        <Root>
          <ElectionPage />
        </Root>
      ),
    },
    {
      path: "election/:id",
      element: (
        <RootTest>
          <BallotContainer />
        </RootTest>
      ),
    },
    {
      path: "election/:id/result",
      element: <ResultPage />,
    },
  ])

export default router
