import '../../../css/index.css';
import '../../../css/style.css';

const loginBtn = document.getElementById('loginBtn');
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

