import { FetchType } from '../../configs/actionTypes';

export function fetchSubScribeList(data) {
    return dispatch => {
        dispatch({
            type: FetchType.FETCH_SUBSCRIBE_LIST,
            refreshing: true,
            data,
        });
        return fetch('http://d.api.budejie.com/forum/subscribe/bs0315-iphone-4.5.9.json')
            .then((response) => response.json())
            .then((jsonData) => {
                dispatch({
                    type: FetchType.FETCH_SUBSCRIBE_LIST,
                    refreshing: false,
                    data: jsonData.list,
                });  
            });
    }
    
}