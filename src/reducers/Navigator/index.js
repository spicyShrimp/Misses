import Nav from '../../components/Navigator/Nav';
import { NavigationActions } from 'react-navigation';

function routeIsInCurrentState(state, routeName) {
    if (state && state.routeName === routeName) {
        return true
    } 
    if (state && state.routes) {
        return routeIsInCurrentState(state.routes[state.index], routeName)
    }
    return false
}

export default (state, action) => {
    if (action.type === NavigationActions.NAVIGATE && routeIsInCurrentState(state, action.routeName)) {//防止連點，多次navigate，增加此判斷
        return state;
    }
    if (state && action.type === NavigationActions.BACK && action.key) { //goBack返回指定页面
        const backRoute = state.routes.find((route) => route.routeName === action.key);
        if (backRoute) {
            const backRouteIndex = state.routes.indexOf(backRoute);
            return {
                ...state,
                routes: state.routes.slice(0, backRouteIndex + 1),
                index: backRouteIndex,
            };
        }
    }
    return Nav.router.getStateForAction(action, state) || state;
};