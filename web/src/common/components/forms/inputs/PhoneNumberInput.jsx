import TextField from '@material-ui/core/TextField'
import { useState } from 'react'
import ReactInputMask from 'react-input-mask'

const PhoneNumberInput = ({ errors, label, name, register }) => {
  const [value, setValue] = useState()

  return (
    <ReactInputMask
      mask="(999) 999 9999"
      value={value}
      disabled={false}
      maskChar=" "
      onChange={(event) => setValue(event.target.value)}
      {...register(name, { required: true })}
    >
      {(inputProps) => 
        <TextField
          {...inputProps}
          error={errors ? true : false}
          fullWidth
          label={label}
          placeholder={label}
          required
          type="text"
          variant="outlined"
        />
      }
    </ReactInputMask>
  )
}
export default PhoneNumberInput
