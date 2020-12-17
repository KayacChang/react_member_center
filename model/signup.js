/** 
[會員註冊]
Path
"carplus/member/registration"

Requests
{
   "Data":{
      "AcctName":"test",
      "Email":"test@test.com",
      "Psw":123123,
      "MainCell":"0900123123",
      "EpaperSts":"Y",
      "SMSSts":"Y"
   },
   "Source_id":4
}

Response
{
   "ReturnCode":0,
   "ReturnMessage":"",
   "ReturnDate":"2020-12-08 13:00:20",
   "ResultData":{
      "level":"Normal",
      "AcctID":389225,
      "CreDate":"2020-12-08 05:00:20",
      "VerifyCode":"2052"
   }
}
*/

export function Request(user) {
    return {
        Data: {
            AcctName: user.name,
            Email: user.email,
            Psw: user.psw,
            MainCell: user.phone,
            LoginID: user.id,
            Birth: user.year + '-' + user.month + '-' + user.day,
        },
        Source_id: 4,
    };
}

export function Response() {
    return {
        ReturnCode: 0,
        ReturnMessage: '',
        ReturnDate: '2020-12-08 13:00:20',
        ResultData: {
            level: 'Normal',
            AcctID: 389225,
            CreDate: '2020-12-08 05:00:20',
            VerifyCode: '2052',
        },
    };
}

export function FailedResponse() {
    return {
        ReturnCode: 9999,
        ReturnDate: '2020-12-08 11:56:49',
        ReturnMessage: '此身分證字號已註冊過。',
        ReturnData: {},
    };
}
