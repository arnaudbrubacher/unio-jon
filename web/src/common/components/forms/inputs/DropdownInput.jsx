import * as React from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

const DropdownInput = ({
  errors,
  label,
  options,
  register,
  name,
  defaultValue,
}) => {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        {...register(name, { required: true })}
        error={errors ? true : false}
        label={label} // for label width
        value={value}
        required
        onChange={(e) => setValue(e.target.value)}
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

export default DropdownInput
