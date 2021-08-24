
import * as yup from 'yup';
// // eslint-disable-next-line import/named
import { FieldNames } from '../types/types';
import {
    reviewCons, reviewForm, reviewName, reviewPros,
} from './elements';


export const schema = yup.object().shape({
    [FieldNames.name]: yup.string().required('Required field'),
    [FieldNames.email]: yup.string().email('Email should be valid').required('Required field'),
    [FieldNames.password]: yup.string().required('Required field'),
});


export const validateReviewError = (payload: {
    pros: File | string | null; name: File | string | null; cons: File | string | null,
}) => {
    const { name, pros, cons } = payload;
    if (name === '') {
        reviewName.style.color = 'red';
        reviewForm.FieldNames.name.reset();
    }
    if (pros === '') {
        reviewPros.style.color = 'red';
        reviewForm.FieldNames.pros.reset();
    }
    if (cons === '') {
        reviewCons.style.color = 'red';
        reviewForm.FieldNames.cons.reset();
    }
};


export const validateNewGadget = (payload: any) => {
    const {
        name, price, category, memory, colors, processor, graphics,
        brightness, contrast, matrix, cameras,
    } = payload;
    let answer = '';
    if (!name) answer += 'Name is required.\n';
    if (!price || typeof price !== 'number') answer += 'Price is required an it should be a number.\n';
    if (!category) answer += 'Category is required. ';
    if (!memory || typeof memory !== 'number') answer += 'Memory is required an it should be a number.\n';
    if (!colors) answer += 'Colors is required. ';
    if (!processor || typeof processor !== 'number') answer += 'Processor is required an it should be a number.\n';
    if (!graphics || typeof graphics !== 'number') answer += 'Graphics is required an it should be a number.\n';
    if (!brightness || typeof brightness !== 'number') answer += 'Brightness is required an it should be a number.\n';
    if (!contrast || typeof contrast !== 'number') answer += 'Contrast is required an it should be a number.\n';
    if (!matrix || typeof matrix !== 'number') answer += 'Matrix is required an it should be a number.\n';
    if (!cameras || typeof cameras !== 'number') answer += 'Cameras is required an it should be a number.\n';

    return answer;
};
