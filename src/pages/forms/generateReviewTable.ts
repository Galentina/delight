
import { IGetProduct, ISubmitEvent, TReview } from '../types/types';
import {
    reviewCons,
    reviewForm, reviewName, reviewNumber, reviewPros,
} from './elements';
import { createNewReview, deleteReview } from './createNewReview';
import { getToken } from './getFromStorage';
// eslint-disable-next-line import/namespace,import/named
import { api } from './api';
import { validateReviewError } from './shema';
import { getProducts } from './getProducts';


export const generateReviewTable = (answer: IGetProduct) => {
    const reviewN = String(answer.reviews.length);
    reviewNumber.textContent = reviewN;
    createNewReview(answer);
    deleteReview(answer);
};

export const additionalReview = (hash: string) => {
    reviewForm.onsubmit = (event) => {
        event.preventDefault();
        const submitEvent = event as unknown as ISubmitEvent;
        const formData = new FormData(submitEvent.target);
        const name = formData.get('name');
        const pros = formData.get('pros');
        const cons = formData.get('cons');

        const payload = {
            name, pros, cons,
        };
        const token = getToken();
        if (!name || !pros || !cons) {
            validateReviewError(payload);
        } else {
            try {
                const postRev = api.postReview(token, <TReview>payload, hash);
                postRev.then((data) => {
                    getProducts(token);
                    generateReviewTable(data);
                    // deleteReview(data.hash);
                    reviewForm.reset();

                    return null;
                })
                    .catch((error) => console.log(error.message));
            } catch (error) {
                console.log(error.message);

                return null;
            }
        }
        reviewForm.reset();
        reviewName.style.color = '#262626';
        reviewPros.style.color = '#262626';
        reviewCons.style.color = '#262626';
    };
};
