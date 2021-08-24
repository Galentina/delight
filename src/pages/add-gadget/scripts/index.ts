import '../../../css/style.css';
import '../../../css/add-gadget.css';
import { getAdminName } from '../../forms/getFromStorage';
import { profileName } from '../../forms/elements';
import { gadgetForm } from '../../forms/formAddGadget';


profileName.innerHTML = getAdminName();

gadgetForm();

console.log('add-gadget.html');
