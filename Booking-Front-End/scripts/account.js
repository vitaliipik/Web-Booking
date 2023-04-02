import { requestURL, sendRequest } from './request.js';
import navBar from './navbar.js';

function sendRequestBody(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');
        const token = JSON.parse(sessionStorage.getItem('basic'));
        xhr.setRequestHeader('Authorization', `Basic ${token.basic}`);
        xhr.onload = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 403) {
                    reject(xhr.response);
                } else {
                    resolve(xhr.response);
                }
            }
        };
        xhr.onerror = () => {
            reject(xhr.response);
        };
        xhr.send(JSON.stringify(body));
    });
}

function accountAttribute(data) {
    const accountName = document.querySelector('.profile-tab-nav');
    accountName.querySelector('.text-center').textContent = `${data.first_name} ${data.last_name}`;
    const account = document.querySelector('#account').querySelector('.row');
    const inputs = account.querySelectorAll('input');
    inputs[0].value = data.first_name;
    inputs[1].value = data.last_name;
    inputs[2].value = data.email;
    inputs[3].value = data.phone;
    inputs[4].value = data.username;
}

document.addEventListener('DOMContentLoaded', () => {
    navBar();
    const button = document.querySelectorAll('.footer-button');
    button[0].querySelector('button').onclick = async (submitevent) => {
        submitevent.preventDefault();
        const account = document.querySelector('#account').querySelector('.row');
        const inputs = account.querySelectorAll('input');
        const body = {
            first_name: inputs[0].value,
            last_name: inputs[1].value,
            email: inputs[2].value,
            phone: inputs[3].value,
            username: inputs[4].value,
        };

        await sendRequestBody('PUT', `${requestURL}user`, body)
            .then(() => {
                sendRequest('GET', `${requestURL}user/${JSON.parse(sessionStorage.getItem('username'))}`)
                    .then((data) => {
                        accountAttribute(data);
                    }).catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
                console.log('error');
            });
    };
    button[1].querySelector('button').onclick = async (submitevent) => {
        submitevent.preventDefault();
        const password = document.querySelector('#password').querySelectorAll('.row');
        const inputs = [...password].map((item) => item.querySelectorAll('input'));
        const body = {
            password: inputs[1][0].value,
            username: JSON.parse(sessionStorage.getItem('username')),
        };

        await sendRequestBody('PUT', `${requestURL}user`, body)
            .then(() => {
                sendRequest('GET', `${requestURL}user/${JSON.parse(sessionStorage.getItem('username'))}`)
                    .then((data) => {
                        accountAttribute(data);
                    }).catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
                console.log('error');
            });
    };
});

sendRequest('GET', `${requestURL}user/${JSON.parse(sessionStorage.getItem('username'))}`)
    .then((data) => {
        accountAttribute(data);
    }).catch((err) => {
        console.log(err);
    });
