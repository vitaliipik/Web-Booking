import { requestURL, sendRequest } from './request.js';
import navBar from './navbar.js';

function accountAttribute(data, state) {
    const accountName = document.querySelector('.profile-tab-nav');
    const ButtonLogout = document.querySelector('#logout-tab');
    ButtonLogout.onclick = () => {
        sessionStorage.setItem('basic', null);
        sessionStorage.setItem('username', null);
        window.location.href = '../event/event.html';
    };
    accountName.querySelector('.text-center').textContent = `${data.first_name} ${data.last_name}`;
    let account = document.querySelector('#account').querySelector('.row');
    if (state) {
        const inputs = account.querySelectorAll('input');
        const labels = {};
        account = account.querySelectorAll('.form-group');
        for (let i = 0; i < inputs.length; i += 1) {
            labels[i] = document.createElement('label');
            labels[i].setAttribute('class', 'label-value');
            labels[i].textContent = inputs[i].value;
            account[i].appendChild(document.createElement('br'));
        }
        inputs.forEach((input) => {
            input.remove();
        });
        labels[0].textContent = data.first_name;
        labels[1].textContent = data.last_name;
        labels[2].textContent = data.email;
        labels[3].textContent = data.phone;
        labels[4].textContent = data.username;
        for (let i = 0; i < Object.keys(labels).length; i += 1) {
            account[i].appendChild(labels[i]);
        }
        const button = document.querySelector('.footer-button').querySelectorAll('button');
        button[0].textContent = 'Edit';
        button[0].onclick = () => { accountAttribute(data, false); };
        button[1].style.display = 'none';
    } else {
        const label = account.querySelectorAll('.label-value');
        const inputs = {};
        account.querySelectorAll('br').forEach((brs) => { brs.remove(); });
        account = account.querySelectorAll('.form-group');
        for (let i = 0; i < label.length; i += 1) {
            inputs[i] = document.createElement('input');
            inputs[i].setAttribute('type', 'text');
            inputs[i].setAttribute('class', 'form-control');
            inputs[i].setAttribute('value', label[i].textContent);
        }

        label.forEach((input) => {
            input.remove();
        });
        inputs[0].value = data.first_name;
        inputs[1].value = data.last_name;
        inputs[2].value = data.email;
        inputs[3].value = data.phone;
        inputs[4].value = data.username;
        for (let i = 0; i < Object.keys(inputs).length; i += 1) {
            account[i].appendChild(inputs[i]);
        }
        const button = document.querySelector('.footer-button').querySelectorAll('button');
        button[0].textContent = 'Update';
        button[1].style.display = 'flex';
        button[0].onclick = async (submitevent) => {
            submitevent.preventDefault();
            const accounts = document.querySelector('#account').querySelector('.row');
            const inputss = accounts.querySelectorAll('input');
            const body = {
                first_name: inputss[0].value,
                last_name: inputss[1].value,
                email: inputss[2].value,
                phone: inputss[3].value,
                username: inputss[4].value,
            };

            await sendRequest('PUT', `${requestURL}user`, body)
                .then(() => {
                    sendRequest('GET', `${requestURL}user/${JSON.parse(sessionStorage.getItem('username'))}`)
                        .then((datas) => {
                            accountAttribute(datas, true);
                        }).catch((err) => {
                            alert(err.message);
                        });
                })
                .catch((err) => {
                    alert(err.message);
                });
        };
        button[1].onclick = async (submitevent) => {
            submitevent.preventDefault();

            await sendRequest('GET', `${requestURL}user/${JSON.parse(sessionStorage.getItem('username'))}`)
                .then((datas) => {
                    accountAttribute(datas, true);
                }).catch((err) => {
                    alert(err.message);
                });
        };
    }
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

        await sendRequest('PUT', `${requestURL}user`, body)
            .then(() => {
                sendRequest('GET', `${requestURL}user/${JSON.parse(sessionStorage.getItem('username'))}`)
                    .then((data) => {
                        accountAttribute(data);
                    }).catch((err) => {
                        alert(err.message);
                    });
            })
            .catch((err) => {
                alert(err.message);
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

        await sendRequest('PUT', `${requestURL}user`, body)
            .then(() => {
                sendRequest('GET', `${requestURL}user/${JSON.parse(sessionStorage.getItem('username'))}`)
                    .then((data) => {
                        accountAttribute(data);
                    }).catch((err) => {
                        alert(err.message);
                    });
            })
            .catch((err) => {
                alert(err.message);
            });
    };
});

sendRequest('GET', `${requestURL}user/${JSON.parse(sessionStorage.getItem('username'))}`)
    .then((data) => {
        accountAttribute(data, true);
    }).catch((err) => {
        alert(err.message);
    });
