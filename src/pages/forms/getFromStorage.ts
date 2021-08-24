import { storage } from './storage';

export const getToken = () => {
    return storage.getItem('token');
};

export const getBasket = () => {
    return storage.getItem('basket');
};

export const getAllItems = () => {
    return storage.getItem('allItems');
};
