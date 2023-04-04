import { requestURL, sendRequest } from './request.js';


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.onsubmit = async (submitevent) => {
        submitevent.preventDefault();
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        const bodyLogin = {
            username,
            password,
        };
        await sendRequest('POST', `${requestURL}user/login`, bodyLogin)
            .then((data) => {
                sessionStorage.setItem('basic', JSON.stringify(data));
                sessionStorage.setItem('username', JSON.stringify(username));
                window.location.href = '../event/event.html';
            })
            .catch((err) => {
                alert(err.message);
            });
    };
});
