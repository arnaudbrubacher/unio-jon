import { useForm } from "react-hook-form"
import Button from "@mui/material/Button"
import { Grid, CircularProgress } from "@mui/material"
import { Box } from "@mui/system"
import { useRxCollection } from "rxdb-hooks"
import TextInput from "../common/components/forms/inputs/TextInput"
import DropdownInput from "../common/components/forms/inputs/DropdownInput"
import DateInput from "../common/components/forms/inputs/DateInput"
import MultipleSelectInput from "../common/components/forms/inputs/MultipleSelectInput"
import { useQuery } from "react-query"

const ElectionForm = () => {
  const election = useRxCollection("election")
  const personElection = useRxCollection("person_election")

  const { isLoading, data: persons } = useQuery('users', () =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/`).then(res => res.json())
  )

  const { control, register, handleSubmit } = useForm()

  // todo
  // await document?.putAttachment({
  //  id: "logo.jpg",
  //  data: data.logo,
  //  type: "image/png",
  //})
  //

  const onSubmit = async (data) => {
    const electionId = Date.now().toString()

    await election.insert({
      ...data,
      id: electionId,
      updatedAt: new Date().getTime(),
    })

    const filteredPersons = persons.filter((person) =>
      data.participants.includes(person.email)
    )

    filteredPersons.forEach(async (person) => {
      await personElection.insert({
        election_id: electionId,
        user_id: person.user_id,
        id: Date.now()
          .toString()
          .concat(Math.floor(Math.random() * 10).toString()),
        updatedAt: new Date().getTime(),
      })
    })
  }

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Box m={2} py={3} maxWidth={400}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} justifyItems="space-around">
          <Grid item key={0} xs={12}>
            <Box mb={2}>
              <TextInput
                type="Text"
                name="name"
                label="Titre de l'élection"
                register={register}
              />
            </Box>
          </Grid>

          <Grid item key={1} xs={12}>
            <Box mb={2}>
              <TextInput
                type="Text"
                name="description"
                label="Description"
                register={register}
              />
            </Box>
          </Grid>

          <Grid item key={2} xs={12}>
            <Box mb={2}>
              <DropdownInput
                type="Dropdown"
                name="status"
                label="Statut"
                options={[
                  "configuration",
                  "registration",
                  "notice",
                  "voter",
                  "verification",
                  "tally",
                  "post-tally",
                  "reserved",
                ]}
                register={register}
              />
            </Box>
          </Grid>

          <Grid item key={3} xs={12}>
            <Box mb={2}>
              <TextInput
                type="Text"
                name="notice_interval_hours"
                label="Notice interval hours"
                register={register}
              />
            </Box>
          </Grid>

          <Grid item key={4} xs={12}>
            <Box mb={2}>
              <TextInput
                type="Text"
                name="participant_number"
                label="Participants Number"
                register={register}
              />
            </Box>
          </Grid>

          <Grid item key={5} xs={12}>
            <Box mb={2}>
              <DateInput
                type="Date"
                name="voting_start_datetime"
                label="Notice interval hours"
                control={control}
              />
            </Box>
          </Grid>

          <Grid item key={6} xs={12}>
            <Box mb={2}>
              <DateInput
                type="Date"
                name="voting_end_datetime"
                label="Notice interval hours"
                control={control}
              />
            </Box>
          </Grid>

          <Grid item key={8} xs={12}>
            <Box mb={2}>
              <TextInput
                type="Text"
                name="question_one"
                label="Question 1"
                register={register}
              />
            </Box>

            <Box mb={2}>
              <TextInput
                type="Text"
                dense
                name="question_one_option_one" // Update name for options (assuming a single option here)
                label="Option 1"
                register={register}
              />
            </Box>

            <Box mb={2}>
              <TextInput
                type="Text"
                dense
                name="question_one_option_two" // Update name for options (assuming a single option here)
                label="Option 2"
                register={register}
              />
            </Box>
          </Grid>

          <Grid item key={8} xs={12}>
            <Box mb={2}>
              <TextInput
                type="Text"
                name="question_two"
                label="Question 2"
                register={register}
              />
            </Box>

            <Box mb={2}>
              <TextInput
                type="Text"
                dense
                name="question_two_option_one" // Update name for options (assuming a single option here)
                label="Option 1"
                register={register}
              />
            </Box>

            <Box mb={2}>
              <TextInput
                type="Text"
                dense
                name="question_two_option_two" // Update name for options (assuming a single option here)
                label="Option 2"
                register={register}
              />
            </Box>
          </Grid>

          <Grid item key={9} xs={12}>
            <Box mb={2}>
              <MultipleSelectInput
                type="Dropdown"
                name="participants"
                label="Electors"
                options={persons.map((person) => person.name)}
                register={register}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              sx={{ width: "100%" }}
              color="primary"
              size="large"
              type="submit"
              variant="contained"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default ElectionForm
