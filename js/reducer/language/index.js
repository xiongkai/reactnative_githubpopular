import Types from "../../action/types";
import {LANGUAGES} from "../../dao/LanguageDao";

/**
 {
    language: data,
    key: data
 }
 * @type {{}}
 */
const defaultState = {language: LANGUAGES, key: LANGUAGES};
export default function onAction(state = defaultState, action) {
    switch (action.type){
        case Types.LanguageRefresh:
            return {
                ...state,
                ["language"]: action.data
            };
        case Types.KeyRefresh:
            return {
                ...state,
                ["key"]: action.data
            };
        default:
            return state;
    }
}