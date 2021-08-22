import '../../../css/style.css';
import '../../../css/gadget-page.css';
import { storage } from '../../forms/storage';
import { getProfile } from '../../forms/getProfile';
import { adminProfile, gadgetLink } from '../../forms/elements';
import { getHashProduct } from '../../forms/getHashProduct';

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
if (token) {
    getProfile();
    if (gadgetLink) gadgetLink.className = 'btn-red';
    if (adminProfile) adminProfile.className = 'profile';
    if (loginBtn) { loginBtn.style.display = 'none'; }
    if (logoutBtn) { logoutBtn.style.display = 'inherit'; }
}

const curLoc = window.location.href;
const hash = curLoc.slice(curLoc.indexOf('=') + 1);
getHashProduct(token, hash);


console.log('gadget-page.html');
