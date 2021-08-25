import '../../../css/index.css';
import '../../../css/style.css';
import { ISubmitEvent } from '../../types/types';

import { login, registration } from '../../forms/register_login';
import { adminProfile, gadgetLink } from '../../forms/elements';
import { getProfile } from '../../forms/getProfile';
import { getToken } from '../../forms/getFromStorage';
import { cleanStorage } from '../../forms/cleanStorage';


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
        cleanStorage();
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

if (getToken()) {
    getProfile();
    if (gadgetLink) gadgetLink.className = 'btn-red';
    if (adminProfile) adminProfile.className = 'profile';
    loginBtn.style.display = 'none';
    if (logoutBtn) { logoutBtn.style.display = 'inherit'; }
}

const registerForm = <HTMLFormElement>regPane?.querySelector('form');
registerForm.onsubmit = async (event) => {
    event.preventDefault();
    const submitEvent = event as unknown as ISubmitEvent;
    const formData = new FormData(submitEvent.target);
    const data = await registration(formData);
    if (data) closePopUp();
};

const loginInForm = <HTMLFormElement>loginPane?.querySelector('form');
loginInForm.onsubmit = async (event) => {
    event.preventDefault();
    const submitEvent = event as unknown as ISubmitEvent;
    const formData = new FormData(submitEvent.target);
    await login(formData);
    closePopUp();

    if (gadgetLink) gadgetLink.className = 'btn-red';
    if (adminProfile) adminProfile.className = 'profile';
    loginBtn.style.display = 'none';
    if (logoutBtn) {
        logoutBtn.style.display = 'inherit';
    }
};

