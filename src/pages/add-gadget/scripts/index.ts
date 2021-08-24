import '../../../css/style.css';
import '../../../css/add-gadget.css';
import { getAdminName } from '../../forms/getFromStorage';
import { closeModal, modal, profileName } from '../../forms/elements';
import { gadgetForm } from '../../forms/formAddGadget';


profileName.innerHTML = getAdminName();
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

gadgetForm();

console.log('add-gadget.html');
