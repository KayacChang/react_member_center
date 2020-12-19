import React, { useState } from "react";
import Input from "../../components/_InputField";
import Link from "next/link";

import {
  nameValidate,
  passwordValidate,
  phoneValidate,
  emailValidate,
  idValidate,
} from "../../functions/validation";

export default function signup() {
  const [payload, setPayload] = useState({
    name: "",
    id: "",
    birth: "",
    phone: "",
    email: "",
    password: "",
  });

  const [hasValidated, setValidated] = useState(false);

  function onSubmit(event) {
    event.preventDefault();

    if (!hasValidated) {
      return;
    }

    console.log(payload);

    // const form = event.target;
    // const input = form.querySelector("#id");
    // console.log(input);
  }

  return (
    <div className="wid100 fx fx_center">
      {/* <Alert setFunc={setUser} modalData={user} /> */}

      <form className="signup wid80" onSubmit={onSubmit}>
        <label className="wid100 fx fx_center mainTitle">會員註冊</label>

        {[
          {
            id: "name",
            label: "姓名",
            placeholder: "請輸入姓名",
            validate: nameValidate,
            error: "請輸入姓名",
            onChange: (name) => setPayload((origin) => ({ ...origin, name })),
            onError: (err) => setValidated(!err),
          },
          {
            id: "id",
            label: "身分證字號",
            placeholder: "請輸入您的身分證字號",
            validate: idValidate,
            error: "請輸入正確的身分證字號",
            onChange: (id) => setPayload((origin) => ({ ...origin, id })),
            onError: (err) => setValidated(!err),
          },
        ].map((props) => (
          <Input {...props} />
        ))}

        <Input
          id="birthday"
          label="出生年月日"
          type="datepicker"
          onChange={(birth) => setPayload((origin) => ({ ...origin, birth }))}
          onError={(err) => setValidated(!err)}
        />

        <Input
          id="phone"
          label="行動電話"
          placeholder="請輸入您的行動電話"
          validate={phoneValidate}
          error="請輸入正確的行動電話。"
          onChange={(phone) => setPayload((origin) => ({ ...origin, phone }))}
          onError={(err) => setValidated(!err)}
        />

        <Input
          id="email"
          label="Email"
          placeholder="請輸入您的Email"
          validate={emailValidate}
          error="請輸入正確的Email，建議避免使用hotmail"
          onChange={(email) => setPayload((origin) => ({ ...origin, email }))}
          onError={(err) => setValidated(!err)}
        />

        <Input
          id="password"
          label="密碼"
          placeholder="請輸入6~16位英數字元混合"
          validate={passwordValidate}
          type="password"
          error="密碼格式不正確，請輸入6~16位英數字元標點符號混合"
          onChange={(password) =>
            setPayload((origin) => ({ ...origin, password }))
          }
          onError={(err) => setValidated(!err)}
        />

        <Input
          id="password_confirm"
          label="確認密碼"
          placeholder="請再次輸入您的密碼"
          validate={passwordValidate}
          type="password"
          error="兩次密碼輸入不相同"
          onError={(err) => setValidated(!err)}
        />

        <div className="btnGroup fx fx_nowrap">
          <Link href="/signin">
            <button className="btn btn50 btn_01">回上一頁</button>
          </Link>
          <div style={{ width: "5%" }}></div>
          <button
            type="submit"
            className={
              "btn btn50 btn_00"

              // isSubmit ? "btn btn50 btn_00" : "btn btn50 btn_disable"
            }
          >
            確認送出
          </button>
        </div>
      </form>
    </div>
  );
}
