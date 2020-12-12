import React, { createRef, useState } from "react";
import styles from "../../components/layout.module.css";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Link from "next/link";
import login from "../../api/login";
import { Request } from "../../model/login";
import loginAction from "../../store/actions/login";
import { useSelector } from "react-redux";

import store from "../../store";
// import { useRouter } from "next/router";

function acctValidate(newValue) {
  if (!newValue) return;

  const emailPattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  const phonePattern = new RegExp(/^09\d{2}-?\d{3}-?\d{3}$/);
  //acctID
  if (
    (!isNaN(Number(newValue)) &&
      !phonePattern.test(newValue) &&
      newValue.length > 9) ||
    (isNaN(Number(newValue)) &&
      !emailPattern.test(newValue) &&
      newValue.length > 5)
  ) {
    return true;
  }
}

function InputField({
  setAcctErr,
  setAcct,
  acct,
  inputRef,
  placeholder,
  type,
}) {
  function handle(e) {
    const newValue = e.target.value;
    const acctVerify = acctValidate(newValue);
    setAcct(newValue);
    setAcctErr(acctVerify);
  }
  return (
    <TextField
      fullWidth
      required
      placeholder={placeholder}
      InputProps={{ disableUnderline: true }}
      value={acct}
      inputRef={inputRef}
      onChange={handle}
    />
  );
}

export default function SignIn() {
  const [values, setAccts] = React.useState({
    password: "",
    showPassword: false,
  });

  const hasLogin = useSelector((state) => state.user);

  const handleChange = (prop) => (event) => {
    setAccts({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setAccts({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const router = useRouter();
  const acctInput = createRef();
  const passwordInput = createRef();
  const [acctErr, setAcctErr] = useState(false);
  const [acct, setAcct] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (acctErr) return;

    const req = Request(acctInput.current.value, passwordInput.current.value);

    const res = await login(req);

    store.dispatch(loginAction(res.ReturnData));
  };

  return (
    <div className="wid100 fx fx_center">
      <form className={styles.signin + " wid50"} onSubmit={handleSubmit}>
        <label
          className="wid100 fx fx_center"
          style={{ margin: "20px 0", fontSize: "1.3em", fontWeight: "bold" }}
        >
          {hasLogin ? JSON.stringify(hasLogin) : "會員登入"}
        </label>
        <div className="input_box">
          <InputField
            setAcctErr={setAcctErr}
            setAcct={setAcct}
            value={acct}
            inputRef={acctInput}
            placeholder="請輸入您的Email或手機號碼"
            type="acct"
          />
        </div>

        {acctErr && (
          <span className="input_err">Email或手機號碼格式錯誤，請重新輸入</span>
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
          <Link href="/">
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
