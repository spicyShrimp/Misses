import { createAction } from 'redux-actions';
import { countType } from '../configs/actionTypes';

export const addAction = createAction(countType.ADD_COUNT);
export const minAction = createAction(countType.MIN_COUNT);
