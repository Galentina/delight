
import * as yup from 'yup';
import { FieldNames, IProducts, IYupErrors } from '../types/types';
import {
    emailInputError, nameInputError, signUpEmail, username, passwordInputError,
    reviewCons, reviewForm, reviewName, reviewPros, signUpPassword,
    emailInputErrorLogin, pasInputErrorLogin,
} from './elements';


export const schema = yup.object().shape({
    [FieldNames.name]: yup.string().required('Required field'),
    [FieldNames.email]: yup.string().email('Email should be valid').required('Required field'),
    [FieldNames.password]: yup.string().required('Required field'),
});
export const resetValidationErrors = () => {
    if (nameInputError && username) {
        nameInputError.textContent = '';
        nameInputError.style.opacity = '0';
    }
    if (signUpEmail && emailInputError) {
        emailInputError.textContent = '';
        emailInputError.style.opacity = '0';
    }
    if (signUpPassword && passwordInputError) {
        passwordInputError.textContent = '';
        passwordInputError.style.opacity = '0';
    }
};

export const resetValidationErrorsLogin = () => {
    if (signUpEmail && emailInputError) {
        emailInputErrorLogin.textContent = '';
        emailInputErrorLogin.style.opacity = '0';
    }
    if (signUpPassword && passwordInputError) {
        pasInputErrorLogin.textContent = '';
        pasInputErrorLogin.style.opacity = '0';
    }
};

export const setValidationErrors = (errors: IYupErrors[]) => {
    resetValidationErrors();
    for (const errorElement of errors) {
        const { path } = errorElement;
        if (path === FieldNames.name && username) {
            nameInputError.textContent = 'required';
            nameInputError.style.opacity = '100%';
        } else if (path === FieldNames.email && signUpEmail) {
            emailInputError.innerHTML = 'required';
            emailInputError.style.opacity = '100%';
        } else if (path === FieldNames.password && signUpPassword) {
            passwordInputError.textContent = 'required';
            passwordInputError.style.opacity = '100%';
        }
    }
};

export const setValidationErrorsLogin = (errors: IYupErrors[]) => {
    resetValidationErrorsLogin();
    for (const errorElement of errors) {
        const { path } = errorElement;
        if (path === FieldNames.email && signUpEmail) {
            emailInputErrorLogin.innerHTML = 'required';
            emailInputErrorLogin.style.opacity = '100%';
        } else if (path === FieldNames.password && signUpPassword) {
            pasInputErrorLogin.textContent = 'required';
            pasInputErrorLogin.style.opacity = '100%';
        }
    }
};

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


export const validateNewGadget = (payload: IProducts) => {
    const {
        memory, colors, processor, graphics,
        brightness, contrast, matrix, cameras,
    } = payload.characteristics;
    const { name, price, category } = payload;
    let answer = '';
    if (!name) answer += 'Name is required.\n';
    if (!price || typeof price !== 'number') answer += 'Price is required an it should be a number.\n';
    if (!category) answer += 'Category is required. ';
    if (!memory || typeof memory !== 'number') answer += 'Memory is required an it should be a number.\n';
    if (!colors) answer += 'Colors is required. ';
    if (!processor || typeof processor !== 'string') answer += 'Processor is required an it should be a number.\n';
    if (!graphics || typeof graphics !== 'string') answer += 'Graphics is required an it should be a number.\n';
    if (!brightness || typeof brightness !== 'number') answer += 'Brightness is required an it should be a number.\n';
    if (!contrast || typeof contrast !== 'number') answer += 'Contrast is required an it should be a number.\n';
    if (!matrix || typeof matrix !== 'number') answer += 'Matrix is required an it should be a number.\n';
    if (!cameras || typeof cameras !== 'number') answer += 'Cameras is required an it should be a number.\n';

    return answer;
};
