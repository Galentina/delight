import '../../../css/index.css';
import '../../../css/style.css';
import { ISubmitEvent } from '../../types/types';

// eslint-disable-next-line import/named
import { login, registration } from '../../forms/register_login';
import { adminProfile, gadgetLink } from '../../forms/elements';
import { storage } from '../../forms/storage';
import { getProfile } from '../../forms/getProfile';
// import { getHashProduct } from '../../forms/getHashProduct';


const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const overlay = document.getElementById('overlay');
const loginForm = document.getElementById('loginForm');
const regLink = document.getElementById('regLink');
const loginLink = document.getElementById('loginLink');
const regPane = document.getElementById('regPane');
const loginPane = document.getElementById('loginPane');
const closeImg = loginForm?.querySelector('img');


// eslint-disable-next-line max-len
if (!loginForm || !closeImg || !overlay || !loginBtn || !regLink || !loginLink || !regPane || !loginPane) {
    throw new Error('Отсутствуют необходимые элементы');
}

export const resetFormLinks = () => {
    loginForm.querySelectorAll('.tab_pane').forEach((el) => {
        el.classList.remove('show');
    });
};

export const saveTokenToLocaleStorage = (token: string) => {
    localStorage.setItem('token', token);
};

export const closePopUp = () => {
    overlay.classList.remove('visible');
    loginForm.classList.remove('popup-show');
};

loginBtn.onclick = () => {
    overlay.classList.add('visible');
    loginForm.classList.add('popup-show');
};

if (logoutBtn) {
    logoutBtn.onclick = () => {
        loginBtn.style.display = 'inherit';
        logoutBtn.style.display = 'none';
        if (gadgetLink) gadgetLink.className = 'btn-red hidden';
        if (adminProfile) adminProfile.className = 'profile hidden';
    };
}

regLink.onclick = () => {
    resetFormLinks();

    regPane.classList.add('show');
    regLink.classList.add('active');
    loginLink.classList.remove('active');
};

loginLink.onclick = () => {
    resetFormLinks();

    loginPane.classList.add('show');
    loginLink.classList.add('active');
    regLink.classList.remove('active');
};

closeImg.onclick = () => {
    overlay.classList.remove('visible');
    loginForm.classList.remove('popup-show');
};

if (storage.getItem('token')) {
    getProfile();
    if (gadgetLink) gadgetLink.className = 'btn-red';
    if (adminProfile) adminProfile.className = 'profile';
    loginBtn.style.display = 'none';
    if (logoutBtn) { logoutBtn.style.display = 'inherit'; }
}

const registerForm = <HTMLFormElement>regPane?.querySelector('form');
registerForm.onsubmit = (event) => {
    event.preventDefault();
    const submitEvent = event as unknown as ISubmitEvent;
    const formData = new FormData(submitEvent.target);
    registration(formData);
    closePopUp();
};

const loginInForm = <HTMLFormElement>loginPane?.querySelector('form');
loginInForm.onsubmit = (event) => {
    event.preventDefault();
    const submitEvent = event as unknown as ISubmitEvent;
    const formData = new FormData(submitEvent.target);
    login(formData);

    closePopUp();

    if (gadgetLink) gadgetLink.className = 'btn-red';
    if (adminProfile) adminProfile.className = 'profile';
    loginBtn.style.display = 'none';
    if (logoutBtn) { logoutBtn.style.display = 'inherit'; }
};

// const cardsEvent: any = allCards.querySelectorAll('.item_card');
// console.log(cardsEvent[0]);
// console.log(cardsEvent.length);
// for (let i = 0; i < cardsEvent.length; i++) {
//     cardsEvent[i].addEventListener('click', () => {
//         const link = cardsEvent[i].href;
//         const hash = link.slice(link.indexOf('=') + 1);
//         storage.setItem('chosenItem', hash);
//         console.log(hash);
//         getHashProduct(cardsEvent[i]);
//     });
// }