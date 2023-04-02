export const requestURL = 'http://127.0.0.1:5000/api/v1/';

export function sendRequest(method, url, body = 0) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');
        const token = JSON.parse(sessionStorage.getItem('basic'));
        xhr.setRequestHeader('Authorization', `Basic ${token.basic}`);
        xhr.onload = () => {
            if (xhr.status === 403) {
                reject(xhr.response);
            } else if (xhr.status === 401) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };
        xhr.onerror = () => {
            reject(xhr.response);
        };

        xhr.send();
    });
}