import { IGetProduct, TAjacentHTML } from '../types/types';
import { reviewNumber, userReviews } from './elements';
import { api } from './api';
import { getToken } from './getFromStorage';
import { additionalReview } from './generateReviewTable';


export const createNewReview = (item: IGetProduct) => {
    userReviews.innerHTML = '';
    const reviewList = userReviews;
    for (let i = 0; i < item.reviews.length; i++) {
        const addNewElement = `<article>
                        <p class="name">${item.reviews[i].name}<img id=${item.reviews[i].hash} src="img/icon/close-red.svg" class="close-icon" alt="Close icon"></p>
                        <div class="feedback_info pros">
                            <p class="feedback_title">Advantages</p>
                            <p class="feedback_content">${item.reviews[i].pros}</p>
                        </div>
                        <div class="feedback_info cons">
                            <p class="feedback_title">Disadvantages</p>
                            <p class="feedback_content">${item.reviews[i].cons}</p>
                        </div>
                        </article>`;

        reviewList.insertAdjacentHTML(<TAjacentHTML>'afterBegin', addNewElement);
        reviewNumber.textContent = String(item.reviews.length);
    }
};


export const deleteReview = (item: IGetProduct) => {
    const { hash } = item;
    const token = getToken();
    Array.from(document.querySelectorAll('.close-icon')).map((el) => {
        el.addEventListener('click', () => {
            const { id } = el;
            const reviewHashId = id;
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            el.closest('article').style.display = 'none';
            const data = api.removeReviewByHash(token, hash, reviewHashId);
            // eslint-disable-next-line @typescript-eslint/no-shadow
            data.then((data) => {
                Number(reviewNumber.textContent) > 0
                    ? reviewNumber.textContent = String(Number(reviewNumber.textContent) - 1) : 0;

                return data;
            })
                .catch((error) => console.log(error.message));
        });
        additionalReview(hash);


        return null;
    });
};
