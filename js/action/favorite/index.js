import Types from "../types";
import {favoriteDao as popularDao} from "../popular";
import {favoriteDao as trendingDao} from "../trending";

export function onFavoriteRefresh(storeName) {
    return dispatch=>{
        dispatch({
            type: Types.FavoriteRefresh,
            storeName: storeName,
        });
        let favoriteDao = popularDao;
        if (storeName === "trending"){
            favoriteDao = trendingDao;
        }
        favoriteDao.getAllItems()
            .then(items=>{
                dispatch({
                    type: Types.FavoriteRefreshSuccess,
                    storeName: storeName,
                    data: items,
                });
            })
            .catch(error=>{
                dispatch({
                    type: Types.FavoriteRefreshFailed,
                    storeName: storeName,
                    error: error,
                });
            })
    };
}