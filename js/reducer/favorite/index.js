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
        case Types.FavoriteRefresh:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    parentType: Types.FavoriteRefresh,
                    actionType: Types.FavoriteRefresh,
                    error: null,
                }
            };
        case Types.FavoriteRefreshSuccess:
            let storeNameState = state[action.storeName];
            let parentType = storeNameState&&storeNameState.parentType;
            if (parentType !== Types.FavoriteRefresh){
                return state;
            }
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    parentType: Types.FavoriteRefresh,
                    actionType: Types.FavoriteRefreshSuccess,
                    data: action.data,
                    error: null,
                }
            };
        case Types.FavoriteRefreshFailed:
            storeNameState = state[action.storeName];
            parentType = storeNameState&&storeNameState.parentType;
            if (parentType !== Types.FavoriteRefresh){
                return state;
            }
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    parentType: Types.FavoriteRefresh,
                    actionType: Types.FavoriteRefreshFailed,
                    error: action.error,
                }
            };
        default:
            return state;
    }
}