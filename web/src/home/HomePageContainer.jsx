import React, { useContext } from "react"
import { useRxData } from "rxdb-hooks"
import { CircularProgress } from "@mui/material"
import { AuthContext } from "../auth/AuthProvider"
import HomePage from "./HomePage"

const HomePageContainer = () => {
  const { state } = useContext(AuthContext)

  const { result: personElectionDocs, isFetching: isPersonElectionFetching } =
    useRxData(
      "person_election",
      (collection) => collection.find().where("user_id").equals(state.user.user_id),
      { json: true }
    )

  const { result: elections, isFetching: isElectionFetching } = useRxData(
    "election",
    (collection) => collection.find(),
    { json: true }
  )

  if (isPersonElectionFetching || isElectionFetching) {
    return <CircularProgress />;
  }

  const electionIds = personElectionDocs.map(election => election.election_id)

  const userElections =   elections.filter(election => electionIds.includes(election.id));

  return <HomePage elections={userElections} />
}

export default HomePageContainer
