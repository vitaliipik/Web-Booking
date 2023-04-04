export const requestURL = 'http://127.0.0.1:5000/api/v1/';

export function sendRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');
        let token = JSON.parse(sessionStorage.getItem('basic'));
        if (token === null) {
            token = '';
        }
        xhr.setRequestHeader('Authorization', `Basic ${token.basic}`);
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(xhr.response);
            }
        };
        xhr.onloadstart = () => {
            document.querySelector('#loading').style.display = 'inline-block';
        };
        xhr.onloadend = () => {
            document.querySelector('#loading').style.display = 'none';
        };
        xhr.onerror = () => {
            reject(xhr.response);
        };
        xhr.send(JSON.stringify(body));
    });
}
