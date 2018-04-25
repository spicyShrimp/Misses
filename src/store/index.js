import reducers from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

const navigator = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);

const middlewares = [thunk.withExtraArgument(),navigator];

// if (__DEV__) {
//   middlewares.push(logger);
// }

export default createStore(reducers, composeWithDevTools(
  applyMiddleware(...middlewares),
))
