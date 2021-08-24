
import * as yup from 'yup';
// eslint-disable-next-line import/named
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
