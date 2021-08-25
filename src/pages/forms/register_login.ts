import { api } from './api';
import { ILogin, IRegister, IRegistrationToken } from '../types/types';
import { storage } from './storage';
import { getProfile } from './getProfile';
import { getToken } from './getFromStorage';
import { resetValidationErrors, schema, setValidationErrors } from './shema';
import { closePopUp } from '../index/scripts';
import { wrongReg } from './elements';

export const registration = async (formData: FormData) => {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    const payload = { name, email, password };
    if (storage.getItem('token')) getProfile();
    else {
        try {
            await schema.validate(payload, { abortEarly: false });
            resetValidationErrors();
        } catch (error) {
            if (Array.isArray(error.inner)) {
                setValidationErrors(error.inner);
            }

            return null;
        }
        try {
            const reg = api.register(<IRegister>payload);
            reg.then((answer: IRegistrationToken) => {
                resetValidationErrors();
                wrongReg.style.opacity = '0';
                closePopUp();

                return answer.data;
            })
                .catch((error) => {
                    console.log(error.messade);
                    wrongReg.style.opacity = '100%';
                });
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

