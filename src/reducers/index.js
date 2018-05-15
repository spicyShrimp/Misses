import Nav from '../components/Navigator/Nav';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import Friend from './Friend';
import { combineReducers } from 'redux';

const Navigator = createNavigationReducer(Nav);

export default combineReducers({
    Navigator,
    Friend,
})
