import '../../../css/style.css';
import '../../../css/gadget-page.css';
import { storage } from '../../forms/storage';
import { getProfile } from '../../forms/getProfile';
import {
    adminProfile, blueButton, cartIcon, gadgetLink, itemsInBasket, showBasket,
} from '../../forms/elements';
import { getHashProduct } from '../../forms/getHashProduct';
import { fillBasketForm } from '../../forms/fillBasketForm';
import { additionalReview } from '../../forms/generateReviewTable';
import { getBasket, getToken } from '../../forms/getFromStorage';
import { cleanStorage } from '../../forms/cleanStorage';

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

if (logoutBtn) {
    logoutBtn.onclick = () => {
        if (loginBtn) loginBtn.style.display = 'inherit';
        logoutBtn.style.display = 'none';
        if (gadgetLink) gadgetLink.className = 'btn-red hidden';
        if (adminProfile) adminProfile.className = 'profile hidden';
        cleanStorage();
    };
}

const token = getToken();
const inBasket = getBasket() ? storage.getItem('basket').length : 0;
if (token) {
    getProfile();
    if (gadgetLink) gadgetLink.className = 'btn-red';
    if (adminProfile) adminProfile.className = 'profile';
    if (loginBtn) { loginBtn.style.display = 'none'; }
    if (logoutBtn) { logoutBtn.style.display = 'inherit'; }
    itemsInBasket.innerHTML = inBasket;
}

// item descriptions
const curLoc = window.location.href;
const hash = curLoc.slice(curLoc.indexOf('=') + 1);
getHashProduct(token, hash);

cartIcon.addEventListener('click', () => {
    showBasket.className = 'popup_form popup_cart popup-show';
    fillBasketForm();
});

blueButton.addEventListener('click', () => alert('Your order was successfully placed'));

// user reviews
additionalReview(hash);

console.log('gadget-page.html');
