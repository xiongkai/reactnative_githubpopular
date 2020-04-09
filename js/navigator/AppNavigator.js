import React from "react";
import {connect} from 'react-redux';
import {createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createReduxContainer} from "react-navigation-redux-helpers";
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import DetailPage from "../page/DetailPage";
import WebViewPage from "../page/WebViewPage";
import AboutPage from "../page/AboutPage";

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            headerShown: false,
        }
    }
},{
    initialRouteName: "WelcomePage",
});

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
    },
    DetailPage: {
        screen: DetailPage,
    },
    WebViewPage: {
        screen: WebViewPage,
    },
    AboutPage: {
        screen: AboutPage,
    },
},{
    initialRouteName: "HomePage",
    defaultNavigationOptions: {
        headerShown: false,
    }
});

export const AppNavigator = createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
},{
    initialRouteName: "Init"
});

const mapStateToProps = (state)=>({state: state.nav});

export default connect(mapStateToProps)(
    createReduxContainer(AppNavigator)
);