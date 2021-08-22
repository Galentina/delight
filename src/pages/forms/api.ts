import axios from 'axios';
import {
    IGetProduct,
    ILogin, IRegister, IRegistrationToken,
} from '../types/types';


const API_URL = 'https://lab.lectrum.io/js2/api/zavidovo';
// process.env.REGISTRATION_API_URL;


export const api = Object.freeze({
    register:
        async (payload: IRegister): Promise<IRegistrationToken> => {
            const { data } = await axios.post(`${API_URL}/register`, payload);

            return data;
        },

    login:
        async (payload: ILogin): Promise<IRegistrationToken> => {
            const { data } = await axios.post(`${API_URL}/login`, payload);

            return data;
        },

    profile: async (token: string) => {
        const { data } = await axios.get(`${API_URL}/profile`, { headers: { 'x-token': token } });

        return data;
    },

    getProducts: async (token:string): Promise<IGetProduct[]> => {
        const { data } = await axios.get(`${API_URL}/products`, { headers: { 'x-token': token } });

        return data.data;
    },

    hashProduct: async (token: string, hash: string): Promise<IGetProduct> => {
        const header = { 'x-token': token, hash:'hash' };
        const { data } = await axios.get(`${API_URL}/products/${hash}`, { headers: header });

        return data.data;
    },
});
