import TextField from '@material-ui/core/TextField';
import { nameValidate, phoneValidate, emailValidate, idValidate } from '../functions/validation';

export default function InputField({ setFuncErr, setFunc, value, placeholder, type, filled }) {
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
            id: () => set({ id: newValue }, { idErr: idValidate(newValue) }),
            phone: () => set({ phone: newValue }, { phoneErr: phoneValidate(newValue) }),
            email: () => set({ email: newValue }, { emailErr: emailValidate(newValue) }),
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
            value={value[type]}
            onChange={handle}
        />
    );
}


