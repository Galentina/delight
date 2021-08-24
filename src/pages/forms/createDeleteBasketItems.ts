import { storage } from './storage';
import { itemsInBasket, itemsList, totalCost } from './elements';
import { IGetProduct, TAjacentHTML } from '../types/types';
import { getAllItems, getBasket } from './getFromStorage';


export const createBasketItems = () => {
    itemsList.innerHTML = '';
    const allItems = getAllItems();
    const chosenItems = getBasket();
    const listOfItems = itemsList;
    let itemPrice = 0;
    for (let i = 0; i < chosenItems.length; i++) {
        const itemData = allItems.filter((el: IGetProduct) => el.hash === chosenItems[i].hash);
        itemPrice += itemData[0].price * chosenItems[i].number;
        const addedElement = `<div id=${itemData[0].hash} class="cart_item">
                            <p class="item_name">${itemData[0].name}</p>
                            <p class="item_price" value="${itemData[0].price}">&#8364; ${itemData[0].price}</p>
                            <input type="text" class="item_count" value=${chosenItems[i].number}>
                            <div class="control-remove">
                            <img src="img/icon/plus.svg" data-hash="${chosenItems[i].hash}" alt="">
                            </div>
                            </div>`;
        if (listOfItems) listOfItems.insertAdjacentHTML(<TAjacentHTML>'afterBegin', addedElement);
    }

    return itemPrice;
};
export const deleteBasketItems = (itemPrice: number) => {
    let finalPrice = itemPrice;
    Array.from(document.querySelectorAll('.control-remove')).map((el) => {
        el.addEventListener('click', () => {
            const parent = el.parentElement;
            let hash;
            if (parent) {
                hash = parent?.id;
                parent.style.display = 'none';
                const price = parent.querySelector('.item_price')?.getAttribute('value');
                const number = parent.querySelector('.item_count')?.getAttribute('value');
                finalPrice -= Number(price) * Number(number);
                console.log('price', price, 'number', number);
                totalCost.innerHTML = `${finalPrice}`;
            }
            if (hash) storage.delItem('basket', hash);
            itemsInBasket.innerHTML = storage.getItem('basket') ? storage.getItem('basket').length : 0;
        });


        return null;
    });
};
