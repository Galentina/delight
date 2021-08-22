import { api } from './api';
import { ILogin, IRegister, IRegistrationToken } from '../types/types';
import { storage } from './storage';
// import { profileName } from './elements';
// import { addNewProduct } from './addNewProduct';
import { getProfile } from './getProfile';

export const registration = (formData: FormData) => {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    const payload = { name, email, password };
    if (storage.getItem('token')) getProfile();
    else {
        try {
            const reg = api.register(<IRegister>payload);
            reg.then((answer: IRegistrationToken) => {
                console.log(answer.data);

                return null;
            })
                .catch((error) => console.log(error.messade));
        } catch (error) {
            console.log(error.message);

            return null;
        }
    }
};

export const login = (formData: FormData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    const payload = { email, password };

    if (storage.getItem('token')) getProfile();
    else {
        try {
            const log = api.login(<ILogin>payload);
            log.then((answer: IRegistrationToken) => {
                storage.setItem('token', answer.data);
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                getProfile();

                return null;
            })
                .catch((error) => console.log(error.message));
        } catch (error) {
            console.log(error.messade);

            return null;
        }
    }
};

// export const getProfile = () => {
//     const token = storage.getItem('token');
//     console.log('token from storage', token);
//     if (token) {
//         const data = api.profile(token);
//         data.then((res) => {
//             if (profileName) profileName.textContent = res.data.name;
//
//             return null;
//         })
//             .catch((error) => console.log(error.message));
//
//         const arrayNewProducts = api.getProducts(token);
//         arrayNewProducts.then((res) => {
//             console.log(res);
//             res.map((el) => {
//                 addNewProduct(el);
//
//                 return console.log('done');
//             });
//
//             return console.log('done');
//         })
//             .catch((error) => console.log(error.message));
//     }
// };

