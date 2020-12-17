import React, { createRef, useState, useEffect } from 'react';
import InputField from '../../components/inputField';
import BirthdayPiker from '../../components/birthdayPiker';
import logoutAction from '../../store/actions/logout';
import store from '../../store';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Request } from '../../model/getMember';
import GetMember from '../../api/getMember';

export default function updateMember() {
    const [user, setUser] = useState({
        name: '',
        id: '',
        phone: '',
        email: '',
        year: '',
        month: '',
        day: '',
    });
    const hasLogin = useSelector((state) => state.user);
    const [orgData, setData] = useState();
    React.useEffect(() => {
        if (!hasLogin) {
            logout();
            return;
        }

        const fetchUsers = async () => {
            const req = Request(hasLogin);
            console.log(req);
            const data = await GetMember(req);
            setData(data);
            init(data);
        };
        fetchUsers();
    }, []);

    function init(data) {
        const subyear = data.Data.Birth.substring(0, 4);
        const submonth = data.Data.Birth.substring(5, 7);
        const subday = data.Data.Birth.substring(8, 10);

        setUser({
            ...user,
            name: data.Data.AcctName,
            id: data.Data.LoginID,
            phone: data.Data.MainCell,
            email: data.Data.Email,
            year: parseInt(subyear, 10),
            month: parseInt(submonth, 10),
            day: parseInt(subday, 10),
        });
    }

    const [err, setErr] = useState({
        nameErr: '',
        idErr: '',
        phoneErr: '',
        emailErr: '',
        yearErr: '',
    });

    const logout = () => {
        store.dispatch(logoutAction());
        window.location.href = '/';
    };

    const dataCheck = () => {
        if (
            !err.nameErr &&
            !err.idErr &&
            !err.phoneErr &&
            !err.emailErr &&
            user.name !== '' &&
            user.id !== '' &&
            user.phone !== '' &&
            user.email !== ''
        ) {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = user.name;
        const birthday = user.year + '-' + user.month + '-' + user.day;
        const id = user.id;
        const phone = user.phone;
        const email = user.email;
        if (dataCheck()) {
            console.log(
                JSON.stringify({
                    Data: { name, birthday, id, phone, email },
                    source_id: 4,
                })
            );
        }
    };

    let editArray = [];

    function editArrayCreate(newData, orgData, name) {
        if (newData != orgData) {
            editArray.push({ name: newData });
        }
    }

    const [isSubmit, setIsSubmit] = useState(false);
    const filled = () => {
        setIsSubmit(true);
    };

    return (
        <div className=' wid100 fx fx_center'>
            <form className='signup wid80' onSubmit={handleSubmit}>
                <label className='wid100 fx fx_center mainTitle'>修改會員資料</label>

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
                        placeholder='請輸入姓名'
                        filled={filled}
                        type='name'
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
                        placeholder='請輸入您的身分證字號'
                        filled={filled}
                        type='id'
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
                        placeholder='請輸入您的行動電話'
                        filled={filled}
                        type='phone'
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
                        placeholder='請輸入您的Email'
                        filled={filled}
                        type='email'
                    />

                    {err.emailErr && <span className='input_err'>請輸入正確的Email，建議避免使用hotmail。</span>}
                </div>

                <div className='btnGroup fx fx_nowrap'>
                    <button type='submit' className={isSubmit ? 'btn btn50 btn_00' : 'btn btn50 btn_disable'}>
                        確定修改
                    </button>
                </div>

                <div className='btnGroup fx fx_nowrap'>
                    <button onClick={logout} className='btn wid50 btn_01'>
                        登出
                    </button>

                    <div style={{ width: '5%' }}></div>
                    <Link href='/'>
                        <button className='btn wid50 btn_01'>回首頁</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
