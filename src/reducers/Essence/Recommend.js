import { EssenceType } from '../../configs/actionTypes';

const initState = {
    refreshing: false,
    data: [],
    np: 0,
}

export default (state = initState, action) => {
    switch (action.type) {
        case EssenceType.LOAD_RECOMMEND_LIST:
            return {
                ...state,
                refreshing: action.refreshing,
                data: action.data,
                np: action.np,
            }
        default:
            return state;
    }
}
