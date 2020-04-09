import Types from "../types";
import DataSore from "../../dao/DataStore";
import FavoriteDao from "../../dao/FavotiteDao";
import {processFavorite, processStoreName} from "../../utils/ActionUtil";

export const favoriteDao = new FavoriteDao("popular");

export function onPopularRefresh(storeName, url) {
    return dispatch=>{
        dispatch({
            type: Types.PopularRefresh,
            storeName: storeName,
        });
        DataSore.fetchData(url)
            .then(data=>{
                processStoreName(data, storeName);
                processFavorite(favoriteDao, "id", data, ()=>{
                    dispatch({
                        type: Types.PopularRefreshSuccess,
                        storeName: storeName,
                        data: data,
                    });
                });
            })
            .catch(error=>{
                dispatch({
                    type: Types.PopularRefreshFailed,
                    storeName: storeName,
                    error: error,
                });
            });
    };
}

export function onPopularLoadMore(storeName, url) {
    return dispatch=>{
        dispatch({
            type: Types.PopularLoadMore,
            storeName: storeName,
        });
        DataSore.fetchData(url)
            .then(data=>{
                processStoreName(data, storeName);
                processFavorite(favoriteDao, "id", data, ()=>{
                    dispatch({
                        type: Types.PopularLoadMoreSuccess,
                        storeName: storeName,
                        data: data,
                    });
                });
            })
            .catch(error=>{
                dispatch({
                    type: Types.PopularLoadMoreFailed,
                    storeName: storeName,
                    error: error,
                });
            });
    };
}

export function onPopularFavoriteUpdate(storeName, keyValue, isFavorite) {
    return dispatch=>{
        dispatch({
            type: Types.PopularFavoriteUpdate,
            storeName: storeName,
            keyValue: keyValue,
            isFavorite: isFavorite,
        });
    };
}