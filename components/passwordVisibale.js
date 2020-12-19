import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
export default function PasswordVisibale({
  showPassword,
  psw,
  handlePswChange,
  setShowPassword,
  placeholder,
}) {
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <InputBase
      fullWidth
      error
      required
      type={showPassword ? "text" : "password"}
      value={psw}
      onChange={handlePswChange}
      inputProps={{ "aria-label": "naked" }}
      placeholder={placeholder}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    />
  );
}
