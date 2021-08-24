// eslint-disable-next-line import/namespace,import/named
import { api } from './api';
import { ILogin, IRegister, IRegistrationToken } from '../types/types';
import { storage } from './storage';
import { getProfile } from './getProfile';
import { getToken } from './getFromStorage';

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
                return answer.data;
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

    if (getToken()) getProfile();
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

