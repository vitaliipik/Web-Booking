export default async function navBar() {
    const navbar = document.querySelector('.navbar');
    if (JSON.parse(sessionStorage.getItem('basic')) !== null) {
        const button = navbar.querySelector('button');
        navbar.removeChild(button);
        const href = document.createElement('a');
        href.setAttribute('href', '../account/index.html');

        const img = document.createElement('img');
        img.setAttribute('src', '../../assets/img/person-svg.svg');
        img.style.width = '100%';
        img.style.maxWidth = '2em';
        href.appendChild(img);

        navbar.appendChild(href);
        navbar.querySelector('.navbar-links').querySelectorAll('a')[1].setAttribute('href', '../ticket/index.html');
    }

    navbar.querySelector('.navbar-links').querySelectorAll('a')[0].setAttribute('href', '../event/event.html');
}
