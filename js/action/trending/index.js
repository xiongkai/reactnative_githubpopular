import Types from "../types";
import DataSore from "../../dao/DataStore";
import FavoriteDao from "../../dao/FavotiteDao";
import {processFavorite, processStoreName} from "../../utils/ActionUtil";

export const favoriteDao = new FavoriteDao("trending");

export function onTrendingRefresh(storeName, url) {
    return dispatch=>{
        dispatch({
            type: Types.TrendingRefresh,
            storeName: storeName,
        });
        DataSore.fetchTrending(url)
            .then(data=>{
                processStoreName(data, storeName);
                processFavorite(favoriteDao, "url", data, ()=>{
                    dispatch({
                        type: Types.TrendingRefreshSuccess,
                        storeName: storeName,
                        data: data,
                    });
                })
            })
            .catch(error=>{
                dispatch({
                    type: Types.TrendingRefreshFailed,
                    storeName: storeName,
                    error: error,
                });
            });
    };
}

export function onTrendingFavoriteUpdate(storeName, keyValue, isFavorite) {
    return dispatch=>{
        dispatch({
            type: Types.TrendingFavoriteUpdate,
            storeName: storeName,
            keyValue: keyValue,
            isFavorite: isFavorite,
        });
    };
}