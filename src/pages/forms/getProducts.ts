import { api } from './api';
import { addNewProduct } from './addNewProduct';
import { storage } from './storage';


export const getProducts = (token: string) => {
    const arrayNewProducts = api.getProducts(token);
    arrayNewProducts.then((res) => {
        res.map((el) => {
            addNewProduct(el);
            storage.setAllItems('allItems', res);

            return null;
        });

        return console.log('');
    })
        .catch((error) => console.log(error.message));
};
