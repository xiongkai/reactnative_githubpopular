import {combineReducers} from "redux";
import {createNavigationReducer} from "react-navigation-redux-helpers";
import {AppNavigator} from "../navigator/AppNavigator";
import ThemeReducer from "./theme";
import PopularReducer from "./popular";
import TrendingReducer from "./trending";
import FavoriteReducer from "./favorite";
import LanguageReducer from "./language";

const NavReducer = createNavigationReducer(AppNavigator);

export default combineReducers({
    nav: NavReducer,
    theme: ThemeReducer,
    popular: PopularReducer,
    trending: TrendingReducer,
    favorite: FavoriteReducer,
    language: LanguageReducer,
});