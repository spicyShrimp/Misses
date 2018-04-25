import countReducer from './countReducer';
import navigatorReducer from './navigatorReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    count: countReducer,
    nav: navigatorReducer,
})
