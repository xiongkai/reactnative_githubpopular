import React from "react";
import {
    View, Text, StyleSheet, Dimensions, Platform, Image,
    TouchableOpacity, ToastAndroid, Linking,
} from "react-native";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import NavigationBar from "../common/NavigationBar";
import NavigationUtils from "../navigator/NavigationUtils";
import Ionicons from "react-native-vector-icons/Ionicons";
import BackPressHelper from "../common/BackPressHelper";
import {MyPageMenu, TutorialMenu} from "../utils/Constants";
import {connect} from "react-redux";
import ExpandItem from "../common/ExpandItem";

const WindowWidth = Dimensions.get("window").width;
const parallaxHeaderHeight = WindowWidth*0.65;
const navBarHeight = Platform.OS==="ios"?44:50;

class AboutPage extends React.PureComponent{

    constructor(props){
        super(props);
        this._backPressHandler = new BackPressHelper({onBackPressed: this._onBackPressed});
    }

    componentDidMount() {
        this._backPressHandler.componentDidMount();
    }

    componentWillUnmount() {
        this._backPressHandler.componentWillUnmount();
    }

    _onBackPressed = ()=>{
        NavigationUtils.goBack();
        return true;
    };

    render() {
        return (
            <ParallaxScrollView
                fadeOutForeground={true}
                backgroundColor={this.props.theme}
                parallaxHeaderHeight={parallaxHeaderHeight}
                renderBackground={this._renderBackground}
                renderForeground={this._renderForeground}
                renderFixedHeader={this._renderFixedHeader}
                stickyHeaderHeight={navBarHeight}
                renderStickyHeader={this._renderStickyHeader}>
                <View style={{height: 500}}>
                    {this._renderItem(MyPageMenu.Tutorial)}
                    {this._renderItem(MyPageMenu.About_Author)}
                    {this._renderItem(MyPageMenu.Feedback)}
                </View>
            </ParallaxScrollView>
        );
    }

    _renderBackground = ()=>{
        return (
            <View style={styles.backgroundSection}>
                <Image style={styles.backgroundSection}
                       source={{uri: "https://www.devio.org/io/GitHubPopular/img/for_githubpopular_about_me.jpg"}}/>
            </View>
        );
    };

    _renderForeground = ()=>{
        return (
            <View style={styles.foregroundSection}>
                <Ionicons size={70} name={"logo-github"} color={"#FFFFFF"}/>
                <Text style={styles.foregroundTitle}>Github Popular</Text>
                <Text style={styles.foregroundDesc}>
                    这是一个基于React Native开发的用来查看Github最受欢迎和最热项目的App，仅支持Android平台！
                </Text>
            </View>
        );
    };

    _renderStickyHeader = ()=>{
        return (
            <View style={styles.stickySection}>
                <Text style={styles.stickyText}>Github Popular</Text>
            </View>
        );
    };

    _renderFixedHeader = ()=>{
        return (
            <View style={styles.fixedSection}>
                <NavigationBar leftButton={this._getLeftButton()} rightButton={this._getRightButton()}/>
            </View>
        );
    };

    _onLeftButtonClick = ()=>{
        NavigationUtils.goBack();
    };

    _onRightShareButtonClick = ()=>{

    };

    _getLeftButton = ()=>{
        return (
            <TouchableOpacity onPress={this._onLeftButtonClick}
                              style={styles.actionButton}>
                <Ionicons size={28} name={"ios-arrow-back"} color={"#FFF"}/>
            </TouchableOpacity>
        );
    };

    _getRightButton = ()=>{
        return (
            <TouchableOpacity key={"detailPage_share_btn"}
                              onPress={this._onRightShareButtonClick}
                              style={styles.actionButton}>
                <Ionicons size={25} name={"md-share"} color={"#FFF"}/>
            </TouchableOpacity>
        );
    };

    _renderItem = (item)=>{
        const childItems = [];
        let canExpand = false;
        switch (item){
            case MyPageMenu.Tutorial:
                childItems.push(TutorialMenu.ReactJS);
                childItems.push(TutorialMenu.ReactNative);
                canExpand = true;
                break;
        }
        return (
            <ExpandItem item={item}
                        theme={this.props.theme}
                        childItems={childItems}
                        canExpand={canExpand}
                        callback={this._navigateTo}/>
        );
    };

    _navigateTo = (item)=>{
        switch (item){
            case TutorialMenu.ReactJS:
            case TutorialMenu.ReactNative:
                NavigationUtils.goToPage("WebViewPage", item);
                break;
            case MyPageMenu.Feedback:
                const URL = "mailto:react_native@gmail.com";
                Linking.canOpenURL(URL)
                    .then(support=>{
                        if (!support){
                            ToastAndroid.show("不支持邮件！", ToastAndroid.SHORT);
                            return;
                        }
                        Linking.openURL(URL);
                    })
                    .catch(error=>{
                        ToastAndroid.show(`打开邮件出错！(${error.message})`, ToastAndroid.SHORT);
                    });
                break;
            default:
                ToastAndroid.show("功能还在路上！", ToastAndroid.SHORT);
                break;
        }
    };
}

const mapStateToProps = (state)=>({
    theme: state.theme.theme
});

export default connect(mapStateToProps)(AboutPage);

const styles = StyleSheet.create({
    actionButton: {
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    fixedSection: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: navBarHeight,
        right: 0,
    },
    stickySection: {
        height: navBarHeight,
        alignSelf: "center",
        justifyContent: "center"
    },
    stickyText: {
        fontSize: 20,
        color: "#FFFFFF"
    },
    foregroundSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: parallaxHeaderHeight,
        paddingTop: navBarHeight,
    },
    backgroundSection: {
        height: parallaxHeaderHeight,
        width: WindowWidth
    },
    foregroundTitle: {
        fontSize: 25,
        color: "#FFFFFF"
    },
    foregroundDesc: {
        fontSize: 15,
        color: "#FFFFFF",
        paddingHorizontal: 10,
        paddingVertical: 6
    },
    menuContainer: {
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
        borderTopWidth: 0.5,
        borderTopColor: "#D3D3D3",
        minHeight: 50,
    },
    menuIcon: {
        paddingHorizontal: 10,
    },
    menuText: {
        fontSize: 16,
        flex: 1,
    }
});