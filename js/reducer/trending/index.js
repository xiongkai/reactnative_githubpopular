import Types from "../../action/types";

/**
 {
    JAVA: {
        data: data,
    },
    JS: {
        data: data,
    }
 }
 * @type {{}}
 */
const defaultState = {};
export default function onAction(state = defaultState, action) {
    switch (action.type){
        case Types.TrendingFavoriteUpdate:
            const storeData = state[action.storeName];
            const items = storeData&&storeData.data;
            const index = items&&items.findIndex(item=>{
                return item["url"] === action.keyValue;
            });
            if (index >= 0){
                items[index] = {...items[index], isFavorite: action.isFavorite};
                return {
                    ...state,
                    [action.storeName]: {
                        ...state[action.storeName],
                    }
                };
            }
            return state;
        case Types.TrendingRefresh:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    parentType: Types.TrendingRefresh,
                    actionType: Types.TrendingRefresh,
                    error: null,
                }
            };
        case Types.TrendingRefreshSuccess:
            let storeNameState = state[action.storeName];
            let parentType = storeNameState&&storeNameState.parentType;
            if (parentType !== Types.TrendingRefresh){
                return state;
            } 
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    parentType: Types.TrendingRefresh,
                    actionType: Types.TrendingRefreshSuccess,
                    data: action.data,
                    error: null,
                }
            };
        case Types.TrendingRefreshFailed:
            storeNameState = state[action.storeName];
            parentType = storeNameState&&storeNameState.parentType;
            if (parentType !== Types.TrendingRefresh){
                return state;
            }
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    parentType: Types.TrendingRefresh,
                    actionType: Types.TrendingRefreshFailed,
                    error: action.error,
                }
            };
        default:
            return state;
    }
}
