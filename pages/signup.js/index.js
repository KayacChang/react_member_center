import React, { createRef, useState } from "react";
import styles from "../components/layout.module.css";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function signup() {
  const handleValue = (payload) => {
    setValue((value) => {
      return { ...value, [payload.id]: payload.text };
    });
  };
  const nameInput = createRef();
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);

  const idInput = createRef();
  const [id, setId] = useState("");
  const [idErr, setIdErr] = useState(false);

  const phoneInput = createRef();
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState(false);

  const emailInput = createRef();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);

  const yearInput = createRef();
  const [year, setYear] = useState("");
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const monthInput = createRef();
  const [month, setMonth] = useState("");
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const dayInput = createRef();
  const [day, setDay] = useState("");
  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const pswInput = createRef();
  const [psw, setPsw] = useState("");
  const [pswErr, setPswErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handlePswChange = (e) => {
    const newValue = e.target.value;
    setPsw(newValue);
    if (newValue.length < 6 || newValue.length > 16) {
      setPswErr(true);
    } else {
      setPswErr(false);
      const confirm = pswConfirmInput.current.value;
      if (newValue === confirm && confirm !== "") {
        setPswConfirmErr(false);
      } else {
        setPswConfirmErr(true);
      }
    }
    filled();
  };

  const pswConfirmInput = createRef();
  const [pswConfirm, setPswConfirm] = useState("");
  const [pswConfirmErr, setPswConfirmErr] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const handlePswConfirmChange = (e) => {
    const newValue = e.target.value;
    const oldPsw = pswInput.current.value;
    setPswConfirm(newValue);
    if (newValue !== oldPsw) {
      setPswConfirmErr(true);
    } else {
      setPswConfirmErr(false);
    }
    filled();
  };

  const [isSubmit, setIsSubmit] = useState(false);

  const filled = () => {
    const name = nameInput.current.value;
    const id = idInput.current.value;
    const phone = phoneInput.current.value;
    const email = emailInput.current.value;
    const pswConfirm = pswConfirmInput.current.value;
    if (
      !nameErr &&
      !idErr &&
      !phoneErr &&
      !emailErr &&
      !pswErr &&
      name !== "" &&
      id !== "" &&
      phone !== "" &&
      email !== "" &&
      psw !== "" &&
      psw === pswConfirm
    ) {
      setIsSubmit(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameInput.current.value;
    const birthday =
      yearInput.current.value +
      "-" +
      monthInput.current.value +
      "-" +
      dayInput.current.value;
    const id = idInput.current.value;
    const phone = phoneInput.current.value;
    const email = emailInput.current.value;
    const psw = pswInput.current.value;
    if (isSubmit) {
      console.log(
        JSON.stringify({
          Data: { name, birthday, id, phone, email, psw },
          source_id: 4,
        })
      );
    }
  };

  return (
    <div className=" wid100 fx fx_center">
      <form className={styles.signup + " wid50"} onSubmit={handleSubmit}>
        <label
          className="wid100 fx fx_center"
          style={{ margin: "20px 0", fontSize: "1.3em", fontWeight: "bold" }}
        >
          會員註冊
        </label>

        <div className={styles.formGroup}>
          <div className={styles.formTitle}>
            <p>
              姓名<label>*</label>
            </p>
          </div>
          <InputField
            setFuncErr={setNameErr}
            setFunc={setName}
            value={name}
            inputRef={nameInput}
            placeholder="請輸入姓名"
            type="name"
            filled={filled}
          />

          {nameErr && <span className="input_err">請輸入姓名</span>}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formTitle}>
            <p>
              身分證字號<label>*</label>
            </p>
          </div>
          <InputField
            setFuncErr={setIdErr}
            setFunc={setId}
            value={id}
            inputRef={idInput}
            placeholder="請輸入您的身分證字號"
            type="id"
            filled={filled}
          />

          {idErr && <span className="input_err">請輸入正確的身分證字號。</span>}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formTitle}>
            <p>
              出生年月日<label>*</label>
            </p>
          </div>
          <div>
            <BirthdayPiker
              year={year}
              yearInput={yearInput}
              handleYearChange={handleYearChange}
              month={month}
              monthInput={monthInput}
              handleMonthChange={handleMonthChange}
              day={day}
              dayInput={dayInput}
              handleDayChange={handleDayChange}
              css={"fx fx_nowrap fx_center fx_between"}
            ></BirthdayPiker>
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formTitle}>
            <p>
              行動電話<label>*</label>
            </p>
          </div>
          <InputField
            setFuncErr={setPhoneErr}
            setFunc={setPhone}
            value={phone}
            inputRef={phoneInput}
            placeholder="請輸入您的行動電話"
            type="phone"
            filled={filled}
          />

          {phoneErr && (
            <span className="input_err">請輸入正確的行動電話。</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formTitle}>
            <p>
              Email<label>*</label>
            </p>
          </div>
          <InputField
            setFuncErr={setEmailErr}
            setFunc={setEmail}
            value={email}
            inputRef={emailInput}
            placeholder="請輸入您的Email"
            type="email"
            filled={filled}
          />

          {emailErr && (
            <span className="input_err">
              請輸入正確的Email，建議避免使用hotmail。
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formTitle}>
            <p>
              密碼<label>*</label>
            </p>
          </div>
          <PasswordVisibale
            showPassword={showPassword}
            psw={psw}
            handlePswChange={handlePswChange}
            pswInput={pswInput}
            setShowPassword={setShowPassword}
            placeholder={"請輸入6~16位英數字元標點符號混合"}
          />

          {pswErr && (
            <span className="input_err">
              密碼格式不正確，請輸入6~16位英數字元標點符號混合。
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formTitle}>
            <p>
              確認密碼<label>*</label>
            </p>
          </div>
          <PasswordVisibale
            showPassword={showPasswordConfirm}
            psw={pswConfirm}
            handlePswChange={handlePswConfirmChange}
            pswInput={pswConfirmInput}
            setShowPassword={setShowPasswordConfirm}
            placeholder={"請再次輸入您的密碼"}
          />

          {pswConfirmErr && (
            <span className="input_err">兩次密碼輸入不相同。</span>
          )}
        </div>

        <div className={styles.btnGroup + " fx fx_nowrap"}>
          <button type="reset" className="btn btn50 btn_01">
            重新填寫
          </button>
          <div style={{ width: "5%" }}></div>
          <button
            type="submit"
            className={isSubmit ? "btn btn50 btn_00" : "btn btn50 btn_disable"}
          >
            確認送出
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({
  setFuncErr,
  setFunc,
  value,
  inputRef,
  placeholder,
  type,
  filled,
}) {
  function handle(e) {
    const newValue = e.target.value;
    setFunc(newValue);
    if (type === "name") {
      setFuncErr(nameValidate(newValue));
    } else if (type === "id") {
      setFuncErr(idValidate(newValue));
    } else if (type === "phone") {
      setFuncErr(phoneValidate(newValue));
    } else if (type === "email") {
      setFuncErr(emailValidate(newValue));
    }
    filled();
  }
  return (
    <TextField
      fullWidth
      required
      placeholder={placeholder}
      InputProps={{ disableUnderline: true }}
      value={value}
      inputRef={inputRef}
      onChange={handle}
    />
  );
}

function BirthdayPiker({
  year,
  yearInput,
  handleYearChange,
  month,
  monthInput,
  handleMonthChange,
  day,
  dayInput,
  handleDayChange,
  css,
}) {
  const createYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    let items = [];
    for (let i = year; i >= year - 100; i--) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return items;
  };

  const createMonth = () => {
    let items = [];
    for (let i = 1; i <= 12; i++) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return items;
  };

  function createDay(tempYear, tempMonth) {
    const days = new Date(tempYear, tempMonth, 0).getDate();
    let items = [];
    for (let i = 1; i <= days; i++) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return items;
  }

  return (
    <div className={css}>
      <select
        className="wid40"
        onChange={handleYearChange}
        value={year}
        ref={yearInput}
      >
        {createYear()}
      </select>
      <span className={styles.formSelectSpan}>年</span>
      <select
        className="wid30"
        onChange={handleMonthChange}
        value={month}
        ref={monthInput}
      >
        {createMonth()}
      </select>
      <span className={styles.formSelectSpan}>月</span>
      <select
        className="wid30"
        onChange={handleDayChange}
        value={day}
        ref={dayInput}
      >
        {createDay(year, month)}
      </select>
      <span className={styles.formSelectSpan}>日</span>
    </div>
  );
}

function PasswordVisibale({
  showPassword,
  psw,
  handlePswChange,
  pswInput,
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
      inputRef={pswInput}
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

function nameValidate(newValue) {
  //Name
  if (newValue && newValue.length < 2) {
    return true;
  } else {
    return false;
  }
}

function phoneValidate(newValue) {
  const phonePattern = new RegExp(/^09\d{2}-?\d{3}-?\d{3}$/);
  if (newValue) {
    //phone
    if (!phonePattern.test(newValue)) {
      return true;
    } else {
      return false;
    }
  }
}

function emailValidate(newValue) {
  const emailPattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  if (newValue) {
    //email
    if (!emailPattern.test(newValue) && newValue.length > 5) {
      return true;
    } else {
      return false;
    }
  }
}

function idValidate(id) {
  const tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
  const A1 = new Array(
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3
  );
  const A2 = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    1,
    2,
    3,
    4,
    5,
  ];
  const Mx = new Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 1);

  if (id.length !== 10) return true;
  let i = tab.indexOf(id.charAt(0));
  if (i === -1) return true;
  let sum = A1[i] + A2[i] * 9;

  for (i = 1; i < 10; i++) {
    let v = parseInt(id.charAt(i));
    if (isNaN(v)) return true;
    sum = sum + v * Mx[i];
  }
  if (sum % 10 !== 0) return true;
  return false;
}
