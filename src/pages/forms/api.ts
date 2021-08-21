import axios from 'axios';
import {
    IGetProduct,
    ILogin, IRegister, IRegistrationToken,
} from '../types/types';
// import { storage } from './storage';


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
        console.log('data from profile', data);

        return data;
    },

    getProducts: async (token:string): Promise<IGetProduct[]> => {
        console.log(token);
        const { data } = await axios.get(`${API_URL}/products`, { headers: { 'x-token': token } });
        console.log('new products', data.data);

        return data.data;
    },
});
