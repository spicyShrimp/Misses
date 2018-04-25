import { countType } from '../configs/actionTypes';
import { handleActions } from 'redux-actions';

const initialState = { counter: 0 };

export default handleActions({
  [ countType.ADD_COUNT ] : (state, action) => ({ ...state, counter: state.counter + 1 }),
  [ countType.MIN_COUNT ] : (state, action) => ({ ...state, counter: state.counter - 1 }),
}, initialState)
