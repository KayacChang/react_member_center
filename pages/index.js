import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import store from '../store';
import { useSelector } from 'react-redux';
export default function Home() {
    const hasLogin = useSelector((state) => state.user);

    React.useEffect(() => {
        try {
            var channel = new MessageChannel();
            var MyApp = channel.MyApp;
            MyApp.postMessage('{"retCode":null,"retMsg":null,"orderNo":null,"authIdResp":null,"last4No":null}', '*');
            console.log(MyApp);
        } catch (e) {
            console.log('tried and failed-------------------------');
            console.log(e);
        }
    }, []);
    return (
        <div className='container'>
            <Head>
                <title>會員中心</title>
            </Head>

            <main>
                <p>{hasLogin ? '會員編號：' + JSON.stringify(hasLogin) : '已登出'}</p>
            </main>

            <footer>
                <Link href={hasLogin ? '/updateMember' : '/signin'}>
                    <a>{hasLogin ? '修改會員資料' : '登入'}</a>
                </Link>
            </footer>
        </div>
    );
}
