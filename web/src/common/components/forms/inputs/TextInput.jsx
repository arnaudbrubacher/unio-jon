import { TextField } from "@material-ui/core";
  import React from "react";
  
  const TextInput = ({ errors, label, name, register, type  }) => {
    return (
      <>
        <TextField
          {...register(name, { required: true })}
          error={errors ? true : false}
          fullWidth
          label={label}
          name={name}
          placeholder={label}
          type={type}
          required
          variant="outlined"
        />
      </>
    );
  };
  
  export default TextInput;
  