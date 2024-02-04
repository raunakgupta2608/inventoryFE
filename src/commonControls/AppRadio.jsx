import React from "react";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

const AppRadio = ({
  column = false,
  id,
  error,
  name,
  options,
  onChange,
  row = false,
  textContent,
  value,
}) => {
  return (
    <>
      <FormLabel id={id}>{textContent}</FormLabel>
      <RadioGroup
        id={id}
        column={column}
        aria-labelledby={id}
        name={name}
        row={row}
        value={value}
        onChange={onChange}
        error={Boolean(error)}
      >
        {options.map((ele, index) => (
          <FormControlLabel
            key={index}
            value={ele.value}
            control={<Radio />}
            label={ele.label}
          />
        ))}
      </RadioGroup>
    </>
  );
};

export default AppRadio;
