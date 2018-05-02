import { FetchType } from '../../configs/actionTypes';

function fetchSubScribe(data, refreshing) {
    return {
        type: FetchType.FETCH_SUBSCRIBE,
        data,
        refreshing,
    };
}

export function fetchSubScribeData() {
    return dispatch => {
        dispatch(fetchSubScribe(null, true));
        return fetch('http://d.api.budejie.com/forum/subscribe/bs0315-iphone-4.5.9.json')
            .then((response) => response.json())
            .then((jsonData) => {
                dispatch(fetchSubScribe(jsonData.list, false));
            });
    }
    
}