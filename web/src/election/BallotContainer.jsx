import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import { useRxData } from "rxdb-hooks"
import BallotPage from "./BallotPage"
import { CircularProgress } from "@mui/material"
import { AuthContext } from "../auth/AuthProvider"
import RejectedPage from "./RejectedPage"

const isParticipantValid = (allowedParticipants, user) =>
  allowedParticipants.some(participant =>
    user.user_id === participant.user_id
  )

const BallotContainer = () => {
  const { id } = useParams()
  const { state } = useContext(AuthContext)

  const { result: election, isFetching: isElectionFetching } = useRxData(
    "election",
    (collection) => collection.findOne().where("id").equals(id),
    { json: true }
  )

  const { result: personElectionDocs, isFetching: isPersonElectionFetching } =
    useRxData(
      "person_election",
      (collection) => collection.find().where("election_id").equals(id),
      { json: true }
    )
  
    const { result: userballot, isFetching: isUserBallotFetching } = useRxData(
      "ballot",
      (collection) => collection.find().where("election_id").equals(id),
      { json: true }
    )

  if (
    isElectionFetching ||
    isPersonElectionFetching || 
    isUserBallotFetching
  ) {
    return <CircularProgress />
  }


  if (isParticipantValid(personElectionDocs, state.user))
    return <BallotPage election={election[0]} canSubmit={userballot.length < 1} />
  else return <RejectedPage />
}

export default BallotContainer
