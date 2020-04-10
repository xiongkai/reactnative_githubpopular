import Types from "../types";
import {languagesDao, keysDao} from "../../dao/LanguageDao";

export function onLoadLanguage(){
    return dispatch=>{
        languagesDao.fetch()
            .then(data=>{
                dispatch({
                    type: Types.LanguageRefresh,
                    data: data
                });
            });
    };
}

export function onLoadKey(){
    return dispatch=>{
        keysDao.fetch()
            .then(data=>{
                dispatch({
                    type: Types.LanguageRefresh,
                    data: data
                });
            });
    };
}

export function onLanguageRefresh(data){
    return dispatch=>{
        languagesDao.save(data);
        dispatch({
            type: Types.LanguageRefresh,
            data: data
        });
    };
}

export function onKeyRefresh(data){
    return dispatch=>{
        keysDao.save(data);
        dispatch({
            type: Types.KeyRefresh,
            data: data
        });
    };
}

