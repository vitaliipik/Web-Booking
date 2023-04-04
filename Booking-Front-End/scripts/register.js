import { requestURL, sendRequest } from './request.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.onsubmit = async (submitevent) => {
        submitevent.preventDefault();
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const firstName = document.querySelector('#first-name').value;
        const lastName = document.querySelector('#last-name').value;
        const email = document.querySelector('#email').value;
        const phone = document.querySelector('#phone').value;

        const bodyRegister = {
            username,
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            password,
        };
        await sendRequest('POST', `${requestURL}user`, bodyRegister)
            .then(() => {
                sendRequest('POST', `${requestURL}user/login`, bodyRegister)
                    .then((dataLogin) => {
                        sessionStorage.setItem('basic', JSON.stringify(dataLogin));
                        sessionStorage.setItem('username', JSON.stringify(username));
                        window.location.href = '../event/event.html';
                    })
                    .catch((err) => {
                        alert(err.message);
                    });
            })
            .catch((err) => {
                alert(err.message);
            });
    };
});
