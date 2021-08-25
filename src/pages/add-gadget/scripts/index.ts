import '../../../css/style.css';
import '../../../css/add-gadget.css';
import { getAdminName, getToken } from '../../forms/getFromStorage';
import {
    adminProfile, closeModal, gadgetLink, modal, profileName,
} from '../../forms/elements';
import { gadgetForm } from '../../forms/formAddGadget';
import { getProfile } from '../../forms/getProfile';
import { cleanStorage } from '../../forms/cleanStorage';

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const overlay = document.getElementById('overlay');
const loginForm = document.getElementById('loginForm');

if (loginBtn) {
    loginBtn.onclick = () => {
        if (overlay) overlay.classList.add('visible');
        if (loginForm) loginForm.classList.add('popup-show');
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

if (getToken()) {
    getProfile();
    if (gadgetLink) gadgetLink.className = 'btn-red';
    if (adminProfile) adminProfile.className = 'profile';
    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) { logoutBtn.style.display = 'inherit'; }
}

profileName.innerHTML = getAdminName();
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

gadgetForm();

console.log('add-gadget.html');
