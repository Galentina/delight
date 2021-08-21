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
    reviews: [
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

export interface IGetProduct {
    'hash': string,
    'name': string,
    'characteristics': {
        'colors': [
            string,
        ],
        'memory': number,
        'processor': string,
        'graphics': number,
        'brightness': number,
        'contrast': number,
        'matrix': number,
        'cameras': number
    },
    'reviews': [
        {
            'name': number,
            'hash': number,
            'pros': number,
            'cons': number
        },
    ],
    'created': number,
    'price': number,
    'category': number
}
