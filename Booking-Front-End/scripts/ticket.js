import navBar from './navbar.js';
import { requestURL, sendRequest } from './request.js';

function ticketAttribute(ticket) {
    const ticketDetails = document.createElement('div');

    ticketDetails.setAttribute('class', 'ticket');

    const ticketHeader = document.createElement('div');
    ticketHeader.setAttribute('class', 'ticket-header');

    const ticketEvent = document.createElement('div');
    ticketEvent.setAttribute('class', 'ticket-event');
    ticketEvent.textContent = ticket.event_id.name;

    const ticketStatus = document.createElement('div');
    ticketStatus.setAttribute('class', 'ticket-status');
    ticketStatus.textContent = ticket.status;

    const ticketSeat = document.createElement('div');
    ticketSeat.setAttribute('class', 'ticket-seat');
    ticketSeat.textContent = ticket.seat;
    ticketHeader.appendChild(ticketEvent);
    ticketHeader.appendChild(ticketStatus);
    ticketDetails.appendChild(ticketHeader);
    ticketDetails.appendChild(ticketSeat);

    return ticketDetails;
}

document.addEventListener('DOMContentLoaded', () => {
    navBar();
});

sendRequest('GET', `${requestURL}user/${JSON.parse(sessionStorage.getItem('username'))}/tickets`)
    .then((data) => {
        const ticketsContainer = document.querySelector('.tickets-container');
        data.forEach((post) => {
            sendRequest('GET', `${requestURL}event/${post.event_id}`)
                .then((eventData) => {
                    post.event_id = eventData;
                }).then(() => {
                    const ticket = ticketAttribute(post);
                    ticketsContainer.appendChild(ticket);
                });
        });
    })
    .catch((err) => {
        console.log(err);
    });
