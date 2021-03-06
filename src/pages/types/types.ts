export interface ISubmitEvent {
    target: HTMLFormElement;
}

export interface IToken {
    key: string;
    token: string
}

export interface IRegister {
    name: string;
    email: string;
    password: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegistrationToken {
    data: string;
}

export enum FieldNames {
    name = 'name',
    email = 'email',
    password = 'password',
}

export interface IProducts {
    name: string,
    category: string,
    price: number,
    reviews?: [
        {
            hash: string,
            name: string,
            pros: string,
            cons: string
        },
    ],
    characteristics: {
        memory: number,
        colors: string[],
        processor: string,
        graphics: string,
        brightness: number,
        contrast: string,
        matrix: number,
        cameras: number
    }
}

export interface INewProduct {
    name: string,
    category: string,
    price: number,
    characteristics: {
        memory: number,
        colors: [
            string,
        ],
        processor: number,
        graphics: number,
        brightness: number,
        contrast: number,
        matrix: number,
        cameras: number,
    }
    reviews: [
        {
            name: string,
            hash: string,
            pros: string,
            cons: string
        },
    ],
}

export interface IGetProduct extends INewProduct {
    hash: string,
    // name: string,
    // characteristics: {
    //     memory?: number | string,
    //     colors: [
    //         string,
    //     ],
    //     processor: number | string,
    //     graphics: number | string,
    //     brightness: number | string,
    //     contrast: number | string,
    //     matrix: number | string,
    //     cameras: number
    // },
    // reviews: [
    //     {
    //         name: string,
    //         hash: string,
    //         pros: string,
    //         cons: string
    //     },
    // ],
    created?: number,
    // price: number,
    // category: number | string
}

export type TBasket = {
    hash: string,
    date: number,
    number: number
};

export type TAjacentHTML = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';

export type TReview = {
    'name': string,
    'hash'?: string,
    'pros': string,
    'cons': string
};

export interface IYupErrors {
    path: string;
    message: string;
}
