import { useParams } from "react-router"
import {
  Button,
  Box,
  Card,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material"
import { useRxCollection } from "rxdb-hooks"
import { useForm } from "react-hook-form"
import React, { useContext, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { AuthContext } from "../auth/AuthProvider"

const BallotPage = ({ election, canSubmit }) => {
  const memoizedElection = useMemo(() => election, [election])

  const collection = useRxCollection("ballot")

  let { id } = useParams() // could remove this from here?
  const { handleSubmit } = useForm()
  const navigate = useNavigate()
  const { state } = useContext(AuthContext)

  const [questionOneSelectedValue, setQuestionOneSelectedValue] =
    useState(undefined)
  const [questionTwoSelectedValue, setQuestionTwoSelectedValue] =
    useState(undefined)

  const handleQuestionOneRadioChange = (event) => {
    setQuestionOneSelectedValue(event.target.value)
  }

  const handleQuestionTwoRadioChange = (event) => {
    setQuestionTwoSelectedValue(event.target.value)
  }

  const onSubmit = async (data) => {
    try {
      await collection.insert({
        ...data,
        user_id: state.user.user_id,
        person_name: state.user.nickname,
        election_id: memoizedElection.id,
        question_one: questionOneSelectedValue,
        question_two: questionTwoSelectedValue,
        id: Date.now().toString(),
        updatedAt: new Date().getTime(),
      })
    } catch (e) {
      debugger
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box m={4}>
          <Card p={4}>
            <Box p={4}>
              <Grid container rowSpacing={4} spacing={4}>
                <Grid item xs={12}>
                  <Typography>
                    <b>Élections</b>: {memoizedElection.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <b>Participant</b>: {state.user.nickname}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel>
                      <b>Question #1</b>: {memoizedElection.question_one}
                    </FormLabel>
                    <RadioGroup
                      defaultValue="outlined"
                      name="radio-buttons-group"
                      onChange={handleQuestionOneRadioChange}
                    >
                      <FormControlLabel
                        value={memoizedElection.question_one_option_one}
                        control={<Radio />}
                        label={memoizedElection.question_one_option_one}
                      />
                      <FormControlLabel
                        value={memoizedElection.question_one_option_two}
                        control={<Radio />}
                        label={memoizedElection.question_one_option_two}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel>
                      <b>Question #2</b>:{memoizedElection.question_two}
                    </FormLabel>
                    <RadioGroup
                      defaultValue="outlined"
                      name="radio-buttons-group"
                      onChange={handleQuestionTwoRadioChange}
                    >
                      <FormControlLabel
                        value={memoizedElection.question_two_option_one}
                        control={<Radio />}
                        label={memoizedElection.question_two_option_one}
                      />
                      <FormControlLabel
                        value={memoizedElection.question_two_option_two}
                        control={<Radio />}
                        label={memoizedElection.question_two_option_two}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Box>
      </form>
      <Button
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: '16px',
          margin: '0 auto', // Center the button horizontally
          maxWidth: '500px', // Optional: limit the max width
        }}
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        disabled={!canSubmit}
      >
        Soumettre votre vote
      </Button>


      
    </>
  )
}

export default React.memo(BallotPage)
