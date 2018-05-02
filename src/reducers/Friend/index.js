import { FetchType } from '../../configs/actionTypes';

const initState = {
    data: [],
    refreshing: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case FetchType.FETCH_SUBSCRIBE:
            return {
                ...state,
                data: action.data,
                refreshing: action.refreshing,
            }
        default:
            return state;
    }
}
