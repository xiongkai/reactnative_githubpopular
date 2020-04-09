import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {NavigationActions} from "react-navigation";
import NavigationUtils from "../navigator/NavigationUtils";
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";
import {BackHandler, StatusBar} from "react-native";
import BackPressHelper from "../common/BackPressHelper";

class HomePage extends React.PureComponent{

    constructor(props){
        super(props);
        this.backPressHelper = new BackPressHelper(this.props);
    }

    componentDidMount() {
        this.backPressHelper.componentDidMount();
    }

    componentWillUnmount() {
        this.backPressHelper.componentWillUnmount();
    }

    render(){
        NavigationUtils.Navigation = this.props.navigation;
        return (
            <Fragment>
                <StatusBar barStyle="light-content"
                           backgroundColor={this.props.theme}/>
                <DynamicTabNavigator/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state)=>({
    nav: state.nav, theme: state.theme.theme
});

export default connect(mapStateToProps)(HomePage);