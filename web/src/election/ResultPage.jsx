import { useParams } from "react-router"
import { useRxData } from "rxdb-hooks"
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material"

const ResultPage = () => {
  let { id } = useParams()

  const { result: election, isFetching: isElectionFetching } = useRxData(
    "election",
    (collection) => collection.find().where("id").equals(id),
    { json: true }
  )

  const { result: ballots, isFetching: isBallotsFetching } = useRxData(
    "ballot",
    (collection) => collection.find().where("election_id").equals(id),
    { json: true }
  )

  if (isBallotsFetching || isElectionFetching) {
    return <CircularProgress />
  }

  const result_question_one_option_one = ballots.filter((ballot) => {
    return ballot.question_one === election[0].question_one_option_one
  })

  const result_question_one_option_two = ballots.filter((ballot) => {
    return ballot.question_one === election[0].question_one_option_two
  })

  const result_question_two_option_one = ballots.filter((ballot) => {
    return ballot.question_two === election[0].question_two_option_one
  })

  const result_question_two_option_two = ballots.filter((ballot) => {
    return ballot.question_two === election[0].question_two_option_two
  })

  return (
    <>
      <Box m={4}>
        <Card p={4}>
          <Box p={4}>
            <Grid container rowSpacing={4} spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h3">
                  <b>Résultats</b>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b>Élection</b>: {election[0].name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography mb={2}>
                  <b>1.</b> {election[0].question_one}
                </Typography>
                <Typography mb={2} ml={2}>
                  <b>{election[0].question_one_option_one}</b>:{" "}
                  {result_question_one_option_one.length} votes
                </Typography>
                <Typography mb={2} ml={2}>
                  <b>{election[0].question_one_option_two}</b>:{" "}
                  {result_question_one_option_two.length} votes
                </Typography>
                <Typography mb={2}>
                  <b>2.</b> {election[0].question_two}
                </Typography>
                <Typography mb={2} ml={2}>
                  <b>{election[0].question_two_option_one}</b>:{" "}
                  {result_question_two_option_one.length} votes
                </Typography>
                <Typography mb={2} ml={2}>
                  <b>{election[0].question_two_option_two}</b>:{" "}
                  {result_question_two_option_two.length} votes
                </Typography>
                <Typography mb={2}>
                  <b>Nombre de votre</b>: {ballots.length}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </>
  )
}

export default ResultPage
