import * as React from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

const MultipleSelectInput = ({
  errors,
  label,
  options,
  register,
  name,
  defaultValue,
}) => {
  const [values, setValues] = React.useState(defaultValue || [])

  const handleChange = (event) => {
    const selectedValues = event.target.value
    setValues(selectedValues)
  }

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        {...register(name, { required: true })}
        error={errors ? true : false}
        label={label} // for label width
        value={values}
        multiple
        required
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default MultipleSelectInput
