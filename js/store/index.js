import {createStore, applyMiddleware} from "redux";
import {createReactNavigationReduxMiddleware} from "react-navigation-redux-helpers";
import Thunk from "redux-thunk";
import AppReducer from "../reducer";

const appNavMiddleware = createReactNavigationReduxMiddleware(state=>state.nav, "root");

export default createStore(AppReducer, applyMiddleware(appNavMiddleware, Thunk));