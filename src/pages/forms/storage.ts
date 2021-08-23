import { IGetProduct, TBasket } from '../types/types';


class Storage {
    getItem(key: string) {
        // @ts-ignore
        return JSON.parse(localStorage.getItem(key));
    }

    setItem(key: string, item: string) {
        if (key === 'basket') {
            let allItems;
            if (!this.getItem('basket')) allItems = [];
            else allItems = this.getItem('basket');
            let quantity = false;
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i].hash === item) {
                    allItems[i].number += 1; allItems[i].date = Date.now(); quantity = true; break;
                }
            }
            if (quantity === false) allItems.push({ hash: item, date: Date.now(), number: 1 });
            localStorage.setItem(key, JSON.stringify(allItems));
        } else {
            localStorage.setItem(key, JSON.stringify(item));
        }
    }

    setAllItems(key: string, items: IGetProduct[]) {
        localStorage.setItem(key, JSON.stringify(items));
    }

    delItem(key: string, item: string) {
        const allItems = this.getItem(key);
        const restOfItems = allItems.filter((el: TBasket | IGetProduct) => el.hash !== item);
        localStorage.setItem(key, JSON.stringify(restOfItems));
    }
}

export const storage = new Storage();
