import navBar from './navbar.js';
import { requestURL, sendRequest } from './request.js';

const body = {
    username: 'derera',
    first_name: 'streys',
    last_name: 'Jase',
    email: 'struss@email.com',
    password: '1111abcd',
    phone: '223231722672',
    role: 'user',
};

function eventAttribute(post) {
    const eventDetails = document.createElement('div');
    eventDetails.setAttribute('class', 'event-details');

    const eventHeader = document.createElement('div');
    eventHeader.setAttribute('class', 'event-header');

    const eventName = document.createElement('h3');
    eventName.setAttribute('class', 'event-name');
    eventName.textContent = post.name;

    const image = document.createElement('img');
    image.setAttribute('class', 'event-photo');
    image.setAttribute('src', `https://picsum.photos/${Math.floor(Math.random() * (800 - 785) + 790)}/600`);
    image.setAttribute('alt', 'Event Photo');

    const eventBody = document.createElement('div');
    eventBody.setAttribute('class', 'event-body');

    const eventInfo = document.createElement('div');
    eventInfo.setAttribute('class', 'event-info');

    for (let i = 0; i < 2; i += 1) {
        const eventInfoItem = document.createElement('div');
        eventInfoItem.setAttribute('class', 'event-info-item');

        const eventInfoLabel = document.createElement('div');
        eventInfoLabel.setAttribute('class', 'event-info-label');

        const eventInfoValue = document.createElement('div');
        eventInfoValue.setAttribute('class', 'event-info-value');
        if (i === 0) {
            eventInfoLabel.textContent = 'Location:';
            eventInfoValue.textContent = post.address;
        } else {
            eventInfoLabel.textContent = 'Date:';
            eventInfoValue.textContent = post.date;
        }
        eventInfoItem.appendChild(eventInfoLabel);
        eventInfoItem.appendChild(eventInfoValue);
        eventInfo.appendChild(eventInfoItem);
    }
    eventBody.appendChild(eventInfo);
    eventHeader.appendChild(eventName);
    eventDetails.appendChild(eventHeader);
    eventDetails.appendChild(image);
    eventDetails.appendChild(eventBody);

    return eventDetails;
}

document.addEventListener('DOMContentLoaded', () => {
    navBar();
});

sendRequest('GET', `${requestURL}event`, body)
    .then((data) => {
        const eventContainer = document.querySelector('.events-container');
        data.forEach((post) => {
            const event = eventAttribute(post);
            eventContainer.appendChild(event);
        });
    })
    .catch((err) => {
        console.log(err);
        // window.location.href = '../login/index.html';
    });
