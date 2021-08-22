import { storage } from './storage';
import { api } from './api';
import { profileName } from './elements';
import { addNewProduct } from './addNewProduct';

export const getProfile = () => {
    const token = storage.getItem('token');
    if (token) {
        const data = api.profile(token);
        data.then((res) => {
            if (profileName) profileName.textContent = res.data.name;

            return null;
        })
            .catch((error) => console.log(error.message));

        const arrayNewProducts = api.getProducts(token);
        arrayNewProducts.then((res) => {
            res.map((el) => {
                addNewProduct(el);

                return null;
            });

            return console.log('');
        })
            .catch((error) => console.log(error.message));
    }
};
