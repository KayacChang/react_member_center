import React, { createRef, useState, useEffect } from 'react';
import styles from '../../components/layout.module.css';
import InputField from '../../components/inputField';
import BirthdayPiker from '../../components/birthdayPiker';
import logoutAction from '../../store/actions/logout';
import store from '../../store';
import Link from 'next/link';
import getData from '../../api/getMember';
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
    React.useEffect(() => {
        const fetchUsers = async () => {
            const data = await getData();
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
        };

        fetchUsers();
    }, []);

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

    const [isSubmit, setIsSubmit] = useState(false);

    const filled = () => {
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
            setIsSubmit(true);
        } else {
            setIsSubmit(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        editArrayCreate(user.name, data.Data.AcctName, 'AcctName');
        console.log(editArray);
        // const name = user.name;
        // const birthday = user.year + '-' + user.month + '-' + user.day;
        // const id = user.id;
        // const phone = user.phone;
        // const email = user.email;
        // if (isSubmit) {
        //     console.log(
        //         JSON.stringify({
        //             Data: { name, birthday, id, phone, email, psw },
        //             source_id: 4,
        //         })
        //     );
        // }
    };

    let editArray = [];

    function editArrayCreate(newData, orgData, name) {
        if (newData != orgData) {
            editArray.push({ name: newData });
        }
    }

    return (
        <div className=' wid100 fx fx_center'>
            <form className={styles.signup + ' wid50'} onSubmit={handleSubmit}>
                <label
                    className='wid100 fx fx_center'
                    style={{ margin: '20px 0', fontSize: '1.3em', fontWeight: 'bold' }}
                >
                    修改會員資料
                </label>

                <div className={styles.formGroup}>
                    <div className={styles.formTitle}>
                        <p>
                            姓名<label>*</label>
                        </p>
                    </div>
                    <InputField
                        setFuncErr={setErr}
                        setFunc={setUser}
                        value={user.name}
                        placeholder='請輸入姓名'
                        type='name'
                        filled={filled}
                    />

                    {err.nameErr && <span className='input_err'>請輸入姓名</span>}
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.formTitle}>
                        <p>
                            身分證字號<label>*</label>
                        </p>
                    </div>
                    <InputField
                        setFuncErr={setErr}
                        setFunc={setUser}
                        value={user.id}
                        placeholder='請輸入您的身分證字號'
                        type='id'
                        filled={filled}
                    />

                    {err.idErr && <span className='input_err'>請輸入正確的身分證字號。</span>}
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.formTitle}>
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

                <div className={styles.formGroup}>
                    <div className={styles.formTitle}>
                        <p>
                            行動電話<label>*</label>
                        </p>
                    </div>
                    <InputField
                        setFuncErr={setErr}
                        setFunc={setUser}
                        value={user.phone}
                        placeholder='請輸入您的行動電話'
                        type='phone'
                        filled={filled}
                    />

                    {err.phoneErr && <span className='input_err'>請輸入正確的行動電話。</span>}
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.formTitle}>
                        <p>
                            Email<label>*</label>
                        </p>
                    </div>
                    <InputField
                        setFuncErr={setErr}
                        setFunc={setUser}
                        value={user.email}
                        placeholder='請輸入您的Email'
                        type='email'
                        filled={filled}
                    />

                    {err.emailErr && <span className='input_err'>請輸入正確的Email，建議避免使用hotmail。</span>}
                </div>

                <div className={styles.btnGroup + ' fx fx_nowrap'}>
                    <button onClick={logout} className='btn btn50 btn_01'>
                        登出
                    </button>

                    <div style={{ width: '5%' }}></div>
                    <button type='submit' className={isSubmit ? 'btn btn50 btn_00' : 'btn btn50 btn_disable'}>
                        確認送出
                    </button>
                </div>
                <Link href='/'>
                    <a>回首頁</a>
                </Link>
            </form>
        </div>
    );
}
