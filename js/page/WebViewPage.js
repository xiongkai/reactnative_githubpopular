import React, {Fragment} from 'react';
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavigationUtils from "../navigator/NavigationUtils";
import {
    SafeAreaView, StyleSheet, View, Text, Button, TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import {WebView} from "react-native-webview";
import NavigationBar from "../common/NavigationBar";
import BackPressHelper from "../common/BackPressHelper";

class WebViewPage extends React.PureComponent{

    constructor(props){
        super(props);
        this.canGoBack = false;
        this.backPressHelper = new BackPressHelper({...this.props, onBackPressed: this._onBackPressed});
        this.webView = React.createRef();
        const {navigation} = this.props;
        this.title = navigation&&navigation.getParam("name", null);
        this.url = navigation&&navigation.getParam("url", "https://reactnative.cn/");
        this.state={webViewVisible: false};
    }

    componentDidMount() {
        this.backPressHelper.componentDidMount();
    }

    componentWillUnmount() {
        this.backPressHelper.componentWillUnmount();
    }

    _onBackPressed = ()=>{
        if (this.canGoBack){
            this.webView.current.goBack();
            return true;
        }
        return false;
    };

    render(){
        return (
            <Fragment>
                <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
                    <NavigationBar title={this.title}
                                   leftButton={this._getLeftButton()}
                                   titleLayoutStyle={{marginRight: 50}}
                                   style={{backgroundColor: this.props.theme}}/>
                    <View style={styles.container}>
                        <WebView style={{alignItems: "stretch", flex:this.state.webViewVisible?1:0}}
                                 source={{uri: this.url}} ref={this.webView}
                                 onNavigationStateChange={this._onNavigationStateChange}
                                 renderLoading={this._renderLoading}
                                 onLoadEnd={this._onLoadEnd}
                                 startInLoadingState={true}
                                 javaScriptEnabled={true}
                                 domStorageEnabled={true}
                                 scalesPageToFit={true}/>
                    </View>
                </SafeAreaView>
            </Fragment>
        );
    }

    _onLeftButtonClick = ()=>{
        this.canGoBack = false;
        NavigationUtils.goBack();
    };

    _getLeftButton = ()=>{
        return (
            <TouchableOpacity onPress={this._onLeftButtonClick}
                              style={styles.actionButton}>
                <Ionicons size={28} name={"ios-arrow-back"} color={"#FFF"}/>
            </TouchableOpacity>
        );
    };

    _onNavigationStateChange = (navState)=>{
        this.canGoBack = navState.canGoBack;
    };

    _renderLoading = ()=>{
        return (
            <View style={{flex:this.state.webViewVisible?0:1, justifyContent: "center",
                alignItems: "center", backgroundColor: "transparent"}}>
                <ActivityIndicator size={40} color={this.props.theme}/>
            </View>
        );
    };

    _onLoadEnd = ()=>{
        if (this.state.webViewVisible){
            return;
        }
        this.setState({
            webViewVisible: true,
        });
    };
}

const mapStateToProps = (state)=>({
    nav: state.nav, theme: state.theme.theme,
});

export default connect(mapStateToProps, null)(WebViewPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    content: {
        color: '#000000',
        fontSize: 20,
    },
    actionButton: {
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
    }
});