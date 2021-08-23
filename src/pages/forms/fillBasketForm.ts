
import {
    closeBasket, showBasket, totalCost,
} from './elements';
import { createBasketItems, deleteBasketItems } from './createDeleteBasketItems';


export const fillBasketForm = () => {
    const itemPrice = createBasketItems();
    deleteBasketItems(itemPrice);
    if (totalCost) totalCost.innerHTML = `${itemPrice}`;
    // if (blueButton) blueButton.addEventListener('click', () => alert('Your order was successfully placed'));
    if (closeBasket) closeBasket.addEventListener('click', () => { if (showBasket) showBasket.className = 'popup_form popup_cart'; });
};

