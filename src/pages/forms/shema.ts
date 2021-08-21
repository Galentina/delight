
import * as yup from 'yup';
// eslint-disable-next-line import/named
import { FieldNames } from '../types/types';


export const schema = yup.object().shape({
    [FieldNames.name]: yup.string().required('Required field'),
    [FieldNames.email]: yup.string().email('Email should be valid').required('Required field'),
    [FieldNames.password]: yup.string().required('Required field'),
});
