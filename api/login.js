import { Response, FailedResponse } from '../model/login';

function log(myJson) {
    if (myJson.ReturnCode == 0) {
        console.log('AcctID: ' + myJson.ReturnData.AcctID);
    } else {
        console.log(myJson.ReturnMessage + '(' + myJson.ReturnCode + ')');
    }
}

function real(request) {
    return fetch('https://10.2.108.136:3366/carplus/member/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    })
        .then((response) => response.json())
        .then((myJson) => {
            log(myJson);

            return myJson;
        });
}

function wait(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

async function mock(acct) {
    await wait(1000);
    if (acct === '0963379159') {
        return Response();
    } else {
        return FailedResponse();
    }
}

export default function login(request, acct) {
    return mock(acct);
    //return real(request);
}
