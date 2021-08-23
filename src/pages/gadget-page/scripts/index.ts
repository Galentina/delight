import '../../../css/style.css';
import '../../../css/gadget-page.css';
import { storage } from '../../forms/storage';
import { getProfile } from '../../forms/getProfile';
import {
    adminProfile, cartIcon, gadgetLink, itemsInBasket, showBasket,
} from '../../forms/elements';
import { getHashProduct } from '../../forms/getHashProduct';
import { fillBasketForm } from '../../forms/fillBasketForm';

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const overlay = document.getElementById('overlay');
const loginForm = document.getElementById('loginForm');


if (loginBtn) {
    loginBtn.onclick = () => {
        overlay?.classList.add('visible');
        loginForm?.classList.add('popup-show');
    };
}

const token = storage.getItem('token');
const inBasket = storage.getItem('basket') ? storage.getItem('basket').length : 0;
if (token) {
    getProfile();
    if (gadgetLink) gadgetLink.className = 'btn-red';
    if (adminProfile) adminProfile.className = 'profile';
    if (loginBtn) { loginBtn.style.display = 'none'; }
    if (logoutBtn) { logoutBtn.style.display = 'inherit'; }
    if (itemsInBasket) itemsInBasket.innerHTML = inBasket;
    console.log(inBasket);
}

const curLoc = window.location.href;
const hash = curLoc.slice(curLoc.indexOf('=') + 1);
getHashProduct(token, hash);

if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        if (showBasket) showBasket.className = 'popup_form popup_cart popup-show';
        fillBasketForm();
    });
}


console.log('gadget-page.html');
