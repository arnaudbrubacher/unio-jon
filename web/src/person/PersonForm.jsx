import { useForm } from "react-hook-form"
import Button from "@mui/material/Button"
import { Grid } from "@mui/material"
import { Box } from "@mui/system"
import { useRxCollection } from "rxdb-hooks"
import TextInput from "../common/components/forms/inputs/TextInput"
import PhoneNumberInput from "../common/components/forms/inputs/PhoneNumberInput"

const PersonForm = () => {
  const collection = useRxCollection("person")

  const { register, handleSubmit } = useForm()

  // todo
  // await document?.putAttachment({
  //  id: "logo.jpg",
  //  data: data.logo,
  //  type: "image/png",
  //})
  //

  const onSubmit = async (data) =>
    await collection.insert({
      ...data,
      id: Date.now().toString(),
      updatedAt: new Date().getTime(),
    })

  return (
    <Box m={2} py={3} maxWidth={400}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} justifyItems="space-around">
          <Grid item key={0} xs={12}>
            <Box mb={2}>
              <TextInput
                type="Text"
                name="first_name"
                label="Prénom"
                register={register}
              />
            </Box>
          </Grid>

          <Grid item key={1} xs={12}>
            <Box mb={2}>
              <TextInput
                type="Text"
                name="last_name"
                label="Nom de famille"
                register={register}
              />
            </Box>
          </Grid>

          <Grid item key={2} xs={12}>
            <Box mb={2}>
              <TextInput
                type="Text"
                name="email"
                label="Courriel"
                register={register}
              />
            </Box>
          </Grid>

          <Grid item key={3} xs={12}>
            <Box mb={2}>
              <PhoneNumberInput
                type="PhoneNumber"
                name="phone_number"
                label="Numéro de téléphone"
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

export default PersonForm
