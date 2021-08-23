import { storage } from './storage';
import { itemsInBasket, itemsList, totalCost } from './elements';
import { IGetProduct } from '../types/types';


export const createBasketItems = () => {
    if (itemsList) itemsList.innerHTML = '';
    const allItems = storage.getItem('allItems');
    const chosenItems = storage.getItem('basket');
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
        if (listOfItems) listOfItems.insertAdjacentHTML(<'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'>'afterBegin', addedElement);
        // if (document.querySelector('.control-remove')) {
        //     // @ts-ignore
        //     document.querySelector('.control-remove').addEventListener('click', () => {});
        // } return itemPrice;
    }

    return itemPrice;
};
export const deleteBasketItems = (itemPrice: number) => {
    // eslint-disable-next-line array-callback-return
    console.log('I am here');
    let finalPrice = itemPrice;
    Array.from(document.querySelectorAll('.control-remove')).map((el) => {
        el.addEventListener('click', () => {
            const parant = el.parentElement;
            let hash;
            if (parant) {
                hash = parant?.id;
                parant.style.display = 'none';
                const price = parant.querySelector('.item_price')?.getAttribute('value');
                const number = parant.querySelector('.item_count')?.getAttribute('value');
                finalPrice -= Number(price) * Number(number);
                console.log('price', price, 'number', number);
                if (totalCost) totalCost.innerHTML = `${finalPrice}`;
            }
            if (hash) storage.delItem('basket', hash);
            if (itemsInBasket) itemsInBasket.innerHTML = storage.getItem('basket') ? storage.getItem('basket').length : 0;
        });


        return null;
    });
    // for (let i = 1; i < allDelItemsButtons.length; i++) {
    //     const image = allDelItemsButtons[i].getElementsByTagName('img');
    //
    // }
};
