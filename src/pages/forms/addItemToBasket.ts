import { storage } from './storage';


export const addItemToBasket = (hash: string) => {
    storage.setItem('basket', hash);


    return hash;
};
