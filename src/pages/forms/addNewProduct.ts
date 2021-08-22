import { IGetProduct } from '../types/types';
import { allCards } from './elements';
// import { storage } from './storage';
// import { getHashProduct } from './getHashProduct';


export const addNewProduct = (el:IGetProduct) => {
    const {
        hash, name, category, price, reviews,
    } = el;
    const element = `<a href="gadget-page.html?hash=${hash}" class="item_card">
                     <img src="img/item-image-02.png" class="card_cover" alt="Item image">
                     <p class="item_category">${category}</p>
                     <p class="item_name">${name}</p>
                     <p class="item_price">${price}&nbsp;&#8364;</p>
                     <p class="item_comments"><span>${reviews.length}</span>reviews</p>
                     </a>`;

    if (allCards) allCards.insertAdjacentHTML(<'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'>'afterBegin', element);
};
