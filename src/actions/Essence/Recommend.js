import { EssenceType } from '../../configs/actionTypes';

/**
 * 
 * 
 * @export
 * @param {any} data 当前的列表数据
 * @param {boolean} loadmore 是否是上拉加载
 * @param {number} [np=0] 下一页数据开始id
 * @returns 
 */
export function loadRecommendList(data, loadmore, np = 0) {
    return dispatch => {
        console.log(data, loadmore, np);
        dispatch({
            type: EssenceType.LOAD_RECOMMEND_LIST,
            refreshing: !loadmore,
            data,
            np,
        });
        return fetch('http://s.budejie.com/topic/list/jingxuan/1/bs0315-iphone-4.5.9/'+np+'-20.json')
            .then((response) => response.json())
            .then((jsonData) => {
                dispatch({
                    type: EssenceType.LOAD_RECOMMEND_LIST,
                    refreshing: false,
                    data: (loadmore ? [...data, ...jsonData.list] : jsonData.list),
                    np: jsonData.info.np,
                });  
            });
    }
}
