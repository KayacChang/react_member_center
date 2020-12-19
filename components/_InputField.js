import TextField from "@material-ui/core/TextField";
import PasswordVisibale from "./passwordVisibale";
import DateGroup from "./birthdayPiker";
import React, { useEffect, useState } from "react";

function InputField({ id, value, placeholder, onChange }) {
  return (
    <TextField
      fullWidth
      required
      id={id}
      placeholder={placeholder}
      InputProps={{ disableUnderline: true }}
      value={value}
      onChange={onChange}
    />
  );
}

export default function Input({
  id,
  label,
  placeholder,
  validate,
  error,
  type,
  onChange = () => {},
  onError = (err = true) => err,
}) {
  const [typed, setTyped] = useState(false);
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    onChange(value);
  }, [value]);

  function handle(event) {
    setValue(event.target.value);
    setTyped(true);
  }

  const err = typed && validate(value);

  useEffect(() => {
    onError(err);
  }, [err]);

  return (
    <fieldset className="formGroup">
      <label htmlFor={id}>
        <span>{label}</span>
        <span>*</span>
      </label>

      {type === "password" ? (
        <PasswordVisibale
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          psw={value}
          handlePswChange={handle}
          placeholder={placeholder}
        />
      ) : type === "datepicker" ? (
        <DateGroup onChange={setValue} />
      ) : (
        <InputField
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={handle}
        />
      )}

      {err && <span className="input_err">{error}</span>}
    </fieldset>
  );
}
