import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from 'next/link';
import login from '../../api/login';
import { Request } from '../../model/login';
import loginAction from '../../store/actions/login';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Alert from '../../components/modal';
import store from '../../store';
import { loginAcctValidate } from '../../functions/validation';

function InputField({ setAcct, value, placeholder }) {
    function handle(e) {
        const newValue = e.target.value;
        const acctVerify = loginAcctValidate(newValue);
        setAcct({ ...value, acct: newValue, acctErr: acctVerify });
    }
    return (
        <TextField
            fullWidth
            required
            placeholder={placeholder}
            InputProps={{ disableUnderline: true }}
            value={value.acct}
            onChange={handle}
        />
    );
}

export default function SignIn() {
    const [values, setAccts] = React.useState({
        password: '',
        showPassword: false,
        open: false,
        alertText: '',
        acct: '',
        acctErr: false,
    });

    const hasLogin = useSelector((state) => state.user);

    const router = useRouter();

    const handleChange = (prop) => (event) => {
        setAccts({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setAccts({ ...values, showPassword: !values.showPassword });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (values.acctErr) return;
        const req = Request(values.acct, values.password);
        console.log(req);
        const res = await login(req, values.acct);

        if (res.ReturnCode == 0) {
            console.log('I am going to postMessage');

            try {
                postMessage({ user: res.ReturnData.AcctID }, '*');
                console.log('i posted no head-------------------------');
                window.postMessage({ user: res.ReturnData.AcctID }, '*');
                console.log('i posted window-------------------------');
                MyApp.postMessage({ user: res.ReturnData.AcctID }, '*');
                console.log('i posted myapp undefined-------------------------');
                console.log(MyApp);
                console.log('i am MyApp-------------------------');
            } catch (e) {
                try {
                    var MyApp = window;
                    MyApp.postMessage({ user: res.ReturnData.AcctID }, '*');
                } catch (e) {
                    console.log('tried and failed-------------------------');
                    console.log(e);
                }
            }

            store.dispatch(loginAction(res.ReturnData.AcctID));
            console.log(store.getState());
            router.push('/updateMember');
        } else {
            setAccts({ ...values, open: true, alertText: res.ReturnMessage });
        }
    };

    return (
        <div className='wid100 fx fx_center'>
            <Alert setFunc={setAccts} modalData={values} />
            <form className='signin wid80' onSubmit={handleSubmit}>
                <label className='wid100 fx fx_center mainTitle'>
                    {hasLogin ? JSON.stringify(hasLogin) : '會員登入'}
                </label>
                <div className='input_box'>
                    <InputField setAcct={setAccts} value={values} placeholder='請輸入您的Email或手機號碼' type='acct' />
                </div>

                {values.acctErr && <span className='input_err'>Email或手機號碼格式錯誤，請重新輸入</span>}

                <div className='input_box'>
                    <InputBase
                        fullWidth
                        required
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        inputProps={{ 'aria-label': 'naked' }}
                        placeholder='請輸入密碼'
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton onClick={handleClickShowPassword}>
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>

                <div className='linkGroup fx fx_nowrap fx_end'>
                    沒有帳號？
                    <Link href='/signup'>
                        <a className='linkText'>加入會員</a>
                    </Link>
                </div>

                <div>
                    <button type='submit' className='btn wid100 btn_00'>
                        確認送出
                    </button>
                    <Link href='/'>
                        <button className='btn wid100 btn_01'>上一頁</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
