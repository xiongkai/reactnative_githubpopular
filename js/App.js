import React from "react";
import {Provider} from "react-redux";
import AppNavigatorWithState from "./navigator/AppNavigator";
import Store from "./store";

export default class Root extends React.PureComponent {

    render() {
        return (
            <Provider store={Store}>
                <AppNavigatorWithState/>
            </Provider>
        );
    }
}