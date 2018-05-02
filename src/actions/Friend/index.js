/**
 * wangrui
 */

import { FetchType } from '../../configs/actionTypes';

fetchSubScribe = (refreshing, data) => ({
    type: FetchType.FETCH_SUBSCRIBE,
    refreshing,
    data,
})

export function fetchSubScribeData(data) {
    return dispatch => {
        dispatch(fetchSubScribe(true, data));
        return fetch('http://d.api.budejie.com/forum/subscribe/bs0315-iphone-4.5.9.json')
            .then((response) => response.json())
            .then((jsonData) => {
                dispatch(fetchSubScribe(false, jsonData.list));  
            });
    }
    
}