import Types from "../../action/types";
import {pageSize} from "../../utils/Constants";

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
        case Types.PopularFavoriteUpdate:
            const storeData = state[action.storeName];
            const items = storeData&&storeData.data;
            const index = items&&items.findIndex(item=>{
                return item["id"] === action.keyValue;
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
        case Types.PopularRefresh:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    parentType: Types.PopularRefresh,
                    actionType: Types.PopularRefresh,
                    pageIndex: 0,
                    error: null,
                }
            };
        case Types.PopularRefreshSuccess:
            let storeNameState = state[action.storeName];
            let parentType = storeNameState&&storeNameState.parentType;
            if (parentType !== Types.PopularRefresh){
                return state;
            } 
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    parentType: Types.PopularRefresh,
                    actionType: Types.PopularRefreshSuccess,
                    hasNoMoreData: action.data<pageSize,
                    data: action.data,
                    pageIndex: 1,
                    error: null,
                }
            };
        case Types.PopularRefreshFailed:
            storeNameState = state[action.storeName];
            parentType = storeNameState&&storeNameState.parentType;
            if (parentType !== Types.PopularRefresh){
                return state;
            }
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    parentType: Types.PopularRefresh,
                    actionType: Types.PopularRefreshFailed,
                    hasNoMoreData: false,
                    error: action.error,
                }
            };
        case Types.PopularLoadMore:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    parentType: Types.PopularLoadMore,
                    actionType: Types.PopularLoadMore,
                    error: null,
                }
            };
        case Types.PopularLoadMoreSuccess:
            storeNameState = state[action.storeName];
            parentType = storeNameState&&storeNameState.parentType;
            if (parentType !== Types.PopularLoadMore){
                return state;
            }
            const newData = [...state[action.storeName].data];
            const oldPageIndex = state[action.storeName].pageIndex;
            let newRepoCount = 0, newPageIndex = 0;
            action.data.forEach(item => {
                const index = newData.findIndex(oldItem => {
                    return oldItem["id"] === item["id"];
                });
                if (index < 0) {
                    newData.push(item);
                    newRepoCount += 1;
                }
            });
            if (newRepoCount > 0 || action.data.length > 0){
                newPageIndex = oldPageIndex + 1;
            }else {
                newPageIndex = oldPageIndex;
            }
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    parentType: Types.PopularLoadMore,
                    actionType: Types.PopularLoadMoreSuccess,
                    data: newData,
                    pageIndex: newPageIndex,
                    hasNoMoreData: action.data<pageSize,
                    error: null,
                }
            };
        case Types.PopularLoadMoreFailed:
            storeNameState = state[action.storeName];
            parentType = storeNameState&&storeNameState.parentType;
            if (parentType !== Types.PopularLoadMore){
                return state;
            }
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    parentType: Types.PopularLoadMore,
                    actionType: Types.PopularLoadMoreFailed,
                    hasNoMoreData: false,
                    error: action.error,
                }
            };
        default:
            return state;
    }
}
