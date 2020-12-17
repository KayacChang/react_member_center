/** 
[會員登入]
Path
"carplus/member/Login"

Requests
{
   "Data":{
      "Account":"0963379159",
      "Password":"123123"
   },
   "source_id":4
}

Response
{
   "ReturnCode":1,
   "ReturnDate":"2020-12-08 11:56:49",
   "ReturnMessage":"查無此帳號",
   "ReturnData":{
      "firstlogings":false,
      "level":"VIP",
      "memberlabel":"國軍會員",
      "AcctID":388848,
      "LoginID":"O200253285",
      "Status":0
   }
}
*/

export function Request(account, password) {
    // console.log(account + "/" + password);
    return {
        Data: {
            Account: account,
            Password: password,
        },
        source_id: 4,
    };
}

export function Response() {
    return {
        ReturnCode: 0,
        ReturnDate: '2020-12-08 11:56:49',
        ReturnData: {
            firstlogings: false,
            level: 'VIP',
            memberlabel: '國軍會員',
            AcctID: 388848,
            LoginID: 'O200253285',
            Status: 0,
        },
    };
}

export function FailedResponse() {
    return {
        ReturnCode: 9999,
        ReturnDate: '2020-12-08 11:56:49',
        ReturnMessage: '查無此帳號',
        ReturnData: {},
    };
}
