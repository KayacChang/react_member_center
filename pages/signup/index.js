import React, { createRef, useState } from 'react';
import InputField from '../../components/inputField';
import PasswordVisibale from '../../components/passwordVisibale';
import BirthdayPiker from '../../components/birthdayPiker';
import Link from 'next/link';
import signupApi from '../../api/signup';
import { Request } from '../../model/signup';
import loginAction from '../../store/actions/login';
import store from '../../store';
import { useRouter } from 'next/router';
import { wait } from '../../functions/util';
import Alert from '../../components/modal';
export default function signup() {
    const [user, setUser] = useState({
        name: '',
        id: '',
        phone: '',
        email: '',
        year: '',
        month: '',
        day: '',
        psw: '',
        pswConfirm: '',
        open: false,
        alertText: '',
    });

    const [err, setErr] = useState({
        nameErr: '',
        idErr: '',
        phoneErr: '',
        emailErr: '',
        yearErr: '',
        pswErr: false,
        pswConfirmErr: false,
    });

    const router = useRouter();

    const pswInput = createRef();
    const [showPassword, setShowPassword] = useState(false);
    const handlePswChange = (e) => {
        const newValue = e.target.value;
        setUser({ ...user, psw: newValue });
        if (newValue.length < 6 || newValue.length > 16) {
            setErr({ ...err, pswErr: true });
        } else {
            const confirm = user.pswConfirm;
            if (newValue == confirm && confirm !== '') {
                setErr({ ...err, pswErr: false, pswConfirmErr: false });
            } else {
                setErr({ ...err, pswErr: false, pswConfirmErr: true });
            }
        }
        filled();
    };

    const pswConfirmInput = createRef();
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const handlePswConfirmChange = (e) => {
        const newValue = e.target.value;
        const oldPsw = user.psw;
        setUser({ ...user, pswConfirm: newValue });
        if (newValue !== oldPsw) {
            setErr({ ...err, pswConfirmErr: true });
        } else {
            setErr({ ...err, pswConfirmErr: false });
        }
        filled();
    };

    const [isSubmit, setIsSubmit] = useState(false);

    const filled = () => {
        const psw = pswInput.current.value;
        const pswC = pswConfirmInput.current.value;
        if (
            !err.nameErr &&
            !err.idErr &&
            !err.phoneErr &&
            !err.emailErr &&
            !err.pswErr &&
            user.name !== '' &&
            user.id !== '' &&
            user.phone !== '' &&
            user.email !== '' &&
            psw !== '' &&
            psw === pswC
        ) {
            setIsSubmit(true);
        } else {
            setIsSubmit(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isSubmit) return;

        const req = Request(user);
        console.log(req);
        const res = await signupApi(req);

        if (res.ReturnCode == 0) {
            store.dispatch(loginAction(res.ResultData.AcctID));
            console.log(store.getState());
            setUser({ ...user, open: true, alertText: '註冊成功，將自動導回首頁...' });
            passed();
        } else {
            setUser({ ...user, open: true, alertText: res.ReturnMessage });
        }
    };
    async function passed() {
        await wait(3000);
        router.push('/');
    }

    return (
        <div className='wid100 fx fx_center'>
            <Alert setFunc={setUser} modalData={user} />
            <form className='signup wid80' onSubmit={handleSubmit}>
                <label className='wid100 fx fx_center mainTitle'>會員註冊</label>

                <div className='formGroup'>
                    <div className='formTitle'>
                        <p>
                            姓名<label>*</label>
                        </p>
                    </div>
                    <InputField
                        setFuncErr={setErr}
                        setFunc={setUser}
                        value={user}
                        err={err}
                        placeholder='請輸入姓名'
                        type='name'
                        filled={filled}
                    />

                    {err.nameErr && <span className='input_err'>請輸入姓名</span>}
                </div>

                <div className='formGroup'>
                    <div className='formTitle'>
                        <p>
                            身分證字號<label>*</label>
                        </p>
                    </div>
                    <InputField
                        setFuncErr={setErr}
                        setFunc={setUser}
                        value={user}
                        err={err}
                        placeholder='請輸入您的身分證字號'
                        type='id'
                        filled={filled}
                    />

                    {err.idErr && <span className='input_err'>請輸入正確的身分證字號。</span>}
                </div>

                <div className='formGroup'>
                    <div className='formTitle'>
                        <p>
                            出生年月日<label>*</label>
                        </p>
                    </div>
                    <div>
                        <BirthdayPiker
                            value={user}
                            setFunc={setUser}
                            year={user.year}
                            month={user.month}
                            day={user.day}
                            css={'fx fx_nowrap fx_center fx_between'}
                        ></BirthdayPiker>
                    </div>
                </div>

                <div className='formGroup'>
                    <div className='formTitle'>
                        <p>
                            行動電話<label>*</label>
                        </p>
                    </div>
                    <InputField
                        setFuncErr={setErr}
                        setFunc={setUser}
                        value={user}
                        err={err}
                        placeholder='請輸入您的行動電話'
                        type='phone'
                        filled={filled}
                    />

                    {err.phoneErr && <span className='input_err'>請輸入正確的行動電話。</span>}
                </div>

                <div className='formGroup'>
                    <div className='formTitle'>
                        <p>
                            Email<label>*</label>
                        </p>
                    </div>
                    <InputField
                        setFuncErr={setErr}
                        setFunc={setUser}
                        value={user}
                        err={err}
                        placeholder='請輸入您的Email'
                        type='email'
                        filled={filled}
                    />

                    {err.emailErr && <span className='input_err'>請輸入正確的Email，建議避免使用hotmail。</span>}
                </div>

                <div className='formGroup'>
                    <div className='formTitle'>
                        <p>
                            密碼<label>*</label>
                        </p>
                    </div>
                    <PasswordVisibale
                        showPassword={showPassword}
                        psw={user.psw}
                        handlePswChange={handlePswChange}
                        pswInput={pswInput}
                        setShowPassword={setShowPassword}
                        placeholder={'請輸入6~16位英數字元混合'}
                    />

                    {err.pswErr && (
                        <span className='input_err'>密碼格式不正確，請輸入6~16位英數字元標點符號混合。</span>
                    )}
                </div>

                <div className='formGroup'>
                    <div className='formTitle'>
                        <p>
                            確認密碼<label>*</label>
                        </p>
                    </div>
                    <PasswordVisibale
                        showPassword={showPasswordConfirm}
                        psw={user.pswConfirm}
                        handlePswChange={handlePswConfirmChange}
                        pswInput={pswConfirmInput}
                        setShowPassword={setShowPasswordConfirm}
                        placeholder={'請再次輸入您的密碼'}
                    />

                    {err.pswConfirmErr && <span className='input_err'>兩次密碼輸入不相同。</span>}
                </div>

                <div className='btnGroup fx fx_nowrap'>
                    <Link href='/signin'>
                        <button className='btn btn50 btn_01'>回上一頁</button>
                    </Link>
                    <div style={{ width: '5%' }}></div>
                    <button type='submit' className={isSubmit ? 'btn btn50 btn_00' : 'btn btn50 btn_disable'}>
                        確認送出
                    </button>
                </div>
            </form>
        </div>
    );
}
