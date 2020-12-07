import React, { useRef, useState } from "react";
import styles from "./components/layout.module.css";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Link from "next/link";
// import { useRouter } from "next/router";

function InputField({ setFlag }) {
  const [value, setValue] = useState("");
  const emailInput = useRef();

  function validate(e) {
    const newValue = e.target.value;
    let acctVerify = false;
    const emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    const phonePattern = new RegExp(/^09\d{2}-?\d{3}-?\d{3}$/);
    if (newValue) {
      if (!isNaN(Number(newValue))) {
        if (!phonePattern.test(newValue)) {
          acctVerify = true;
          console.log("phonePattern failed");
        }
      } else {
        if (!emailPattern.test(newValue)) {
          acctVerify = true;
          console.log("emailPattern failed");
        }
      }
    }
    setValue(newValue);
    setFlag(acctVerify);
  }

  return (
    <TextField
      fullWidth
      required
      placeholder="請輸入您的Email或手機號碼"
      InputProps={{ disableUnderline: true }}
      inputRef={emailInput}
      onChange={validate}
      value={value}
    />
  );
}
export default function signup() {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const router = useRouter();

  //console.log(emailInput);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    console.log(JSON.stringify({ email, password }));
    // const response = await fetch("/Login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password })
    // });

    // if (response.ok) {
    //     return router.push("/memberPage");
    // }
  };
  const passwordInput = useRef();
  const [flag, setFlag] = useState(false);

  return (
    <div className="wid100 fx fx_center">
      <form className="wid50" onSubmit={handleSubmit}>
        <label
          className="wid100 fx fx_center"
          style={{ margin: "20px 0", fontSize: "1.3em", fontWeight: "bold" }}
        >
          會員登入
        </label>
        <div className="input_box">
          <InputField setFlag={setFlag} />
        </div>

        {flag && (
          <span style={{ color: "red" }}>
            Email或手機號碼格式錯誤，請重新輸入
          </span>
        )}

        <div className="input_box">
          <InputBase
            fullWidth
            required
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            inputProps={{ "aria-label": "naked" }}
            inputRef={passwordInput}
            placeholder="請輸入密碼"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>

        <div className={styles.linkGroup + " fx fx_nowrap fx_between"}>
          <Link href="/forgetPw">
            <a>忘記密碼？</a>
          </Link>
          <label>
            沒有帳號？
            <Link href="/signup">
              <a>加入會員</a>
            </Link>
          </label>
        </div>

        <div>
          <button type="submit" className="btn btn100 btn_00">
            確認送出
          </button>
        </div>
      </form>
    </div>
  );
}
