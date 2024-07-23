import { TextField } from "@material-ui/core"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from "react-hook-form";

const DateInput = ({ control, defaultValue, label, name }) => {
  
  return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ? dayjs(defaultValue) : dayjs().format('YYYY-MM-DD HH:mm:ss')}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <DateTimePicker
          label={label}
          value={value}
          onChange={(newValue) => {
            const formattedDate = dayjs(newValue).format('YYYY-MM-DD HH:mm:ss.SSS Z');
            onChange(formattedDate);
          }}
          renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
        />
      )}
    />
  </LocalizationProvider>
);
  
}

export default DateInput
