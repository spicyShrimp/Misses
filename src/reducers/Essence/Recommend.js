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
                ...action,
            }
        default:
            return state;
    }
}
