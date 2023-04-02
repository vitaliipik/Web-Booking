const requestURL = 'http://127.0.0.1:5000/api/v1/';

function sendRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');
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
const body = {
    username: 'derera',
    password: '1111abcd',
};

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
                console.log(err);
                console.log('error');
            });
    };
});
