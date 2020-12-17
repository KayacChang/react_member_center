import { Response } from '../model/signup';

function log(myJson) {
    if (myJson.ReturnCode == 0) {
        console.log('name: ' + myJson.Data.AcctName);
    } else {
        console.log(myJson.ReturnMessage + '(' + myJson.ReturnCode + ')');
    }
}

function real(request) {
    return fetch('https://10.2.108.136:3366/carplus/member/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    })
        .then((response) => response.json())
        .then((myJson) => {
            //log(myJson);

            return myJson;
        });
}

function wait(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

async function mock() {
    await wait(100);

    return Response();
}

export default function getMemberData(request) {
    return mock();
    //return real(request);
}
