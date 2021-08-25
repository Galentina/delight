import { storage } from './storage';


export const cleanStorage = () => {
    storage.delItemFromStorage('admin');
    storage.delItemFromStorage('allItems');
    storage.delItemFromStorage('token');
    storage.delItemFromStorage('basket');
};
