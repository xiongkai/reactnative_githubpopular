import Types from "../../action/types";
import {ThemeFlags} from "../../utils/Constants";

const defaultState = {theme: ThemeFlags.Default};

export default function onAction(state = defaultState, action) {
    switch (action.type){
        case Types.ThemeChanged:
            return {...state, theme: action.theme};
        default:
            return state;
    }
}