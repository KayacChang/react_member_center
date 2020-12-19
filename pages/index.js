import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";

function temp() {
  // port1.onmessage = function (event) {
  //     console.log('port1收到来自port2的数据：' + event.data);
  // };
  // React.useEffect(() => {
  //     try {
  //         var channel = new MessageChannel();
  //         var MyApp = channel.MyApp;
  //         MyApp.onmessage = function (event) {
  //             console.log('port1收到来自port2的数据：' + event.data);
  //         };
  //         MyApp.postMessage('{"retCode":null,"retMsg":null,"orderNo":null,"authIdResp":null,"last4No":null}', '*');
  //         console.log(MyApp);
  //     } catch (e) {
  //         console.log('tried and failed-------------------------');
  //         console.log(e);
  //     }
  // }, []);
}

export default function Home() {
  const hasLogin = useSelector((state) => state.user);

  return (
    <div className="container">
      <Head>
        <title>會員中心</title>
      </Head>

      <main>
        <p>{hasLogin ? "會員編號：" + JSON.stringify(hasLogin) : "已登出"}</p>
      </main>

      <footer>
        <Link href={hasLogin ? "/updateMember" : "/signin"}>
          <a>{hasLogin ? "修改會員資料" : "登入"}</a>
        </Link>
      </footer>
    </div>
  );
}
