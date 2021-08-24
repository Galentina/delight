import { api } from './api';
import { profileName } from './elements';
import { getProducts } from './getProducts';
import { getToken } from './getFromStorage';

export const getProfile = () => {
    const token = getToken();
    if (token) {
        const data = api.profile(token);
        data.then((res) => {
            if (profileName) profileName.textContent = res.data.name;

            return null;
        })
            .catch((error) => console.log(error.message));

        getProducts(token);
    }
};
