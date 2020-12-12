import TextField from "@material-ui/core/TextField";

export default function InputField({
  setFuncErr,
  setFunc,
  value,
  err,
  placeholder,
  type,
  filled,
}) {
  function set(obj, err) {
    setFunc({ ...value, ...obj });
    setFuncErr({ ...err, ...err });
  }

  function handle(e) {
    const newValue = e.target.value;

    // if (type === "name") {
    //     set({ name: newValue }, { nameErr: nameValidate(newValue) });
    //   } else if (type === "id") {
    //     set({ id: newValue }, { idErr: nameValidate(newValue) });
    //   } else if (type === "phone") {
    //     set({ phone: newValue }, { phoneErr: nameValidate(newValue) });
    //   } else if (type === "email") {
    //     set({ email: newValue }, { emailErr: nameValidate(newValue) });
    //   }

    const func = {
      name: () => set({ name: newValue }, { nameErr: nameValidate(newValue) }),
      id: () => set({ id: newValue }, { idErr: nameValidate(newValue) }),
      phone: () =>
        set({ phone: newValue }, { phoneErr: nameValidate(newValue) }),
      email: () =>
        set({ email: newValue }, { emailErr: nameValidate(newValue) }),
    }[type];

    func();
    filled();
  }
  return (
    <TextField
      fullWidth
      required
      placeholder={placeholder}
      InputProps={{ disableUnderline: true }}
      value={value.type}
      onChange={handle}
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
  if (!phonePattern.test(newValue) && newValue) {
    return true;
  } else {
    return false;
  }
}

function emailValidate(newValue) {
  const emailPattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  if (!emailPattern.test(newValue) && newValue.length > 5 && newValue) {
    return true;
  } else {
    return false;
  }
}

function idValidate(id) {
  const tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
  const A1 = [
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
    3,
  ];
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
  const Mx = [9, 8, 7, 6, 5, 4, 3, 2, 1, 1];

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
