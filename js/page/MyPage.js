import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {
    SafeAreaView, StyleSheet, View, Text, Button,
    TouchableOpacity, ScrollView, ToastAndroid
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import NavigationBar from "../common/NavigationBar";
import {MyPageMenu} from "../utils/Constants";
import Actions from "../action";
import NavigationUtils from "../navigator/NavigationUtils";

class MyPage extends React.PureComponent{

    render(){
        return (
            <Fragment>
                <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
                    <NavigationBar title={"我的"} style={{backgroundColor: this.props.theme}}/>
                    <ScrollView>
                        {this._renderAboutItem(MyPageMenu.About)}
                        {this._renderItem(MyPageMenu.Tutorial, this._navigateToTutorial)}
                        {this._renderGroup("趋势管理")}
                        {this._renderItem(MyPageMenu.Custom_Language)}
                        {this._renderItem(MyPageMenu.Sort_Language)}
                        {this._renderGroup("最热管理")}
                        {this._renderItem(MyPageMenu.Custom_Key)}
                        {this._renderItem(MyPageMenu.Sort_Key)}
                        {this._renderItem(MyPageMenu.Remove_Key)}
                        {this._renderGroup("设置")}
                        {this._renderItem(MyPageMenu.Custom_Theme)}
                        {this._renderItem(MyPageMenu.About_Author)}
                        {this._renderItem(MyPageMenu.Feedback)}
                        {this._renderItem(MyPageMenu.Share)}
                        {this._renderItem(MyPageMenu.CodePush)}
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    }

    _renderAboutItem = (item)=>{
        return this._renderItem(item, this._navigateToAbout, 90, 50);
    };

    _renderItem = (items, callback=this._noAction, menuMinHeight=50, iconSize=20)=>{
        const {name, Icons, icon} = items;
        return (
            <TouchableOpacity style={{...styles.menuContainer, minHeight: menuMinHeight}} onPress={callback}>
                <Icons style={styles.menuIcon} size={iconSize} name={icon} color={this.props.theme}/>
                <Text style={styles.menuText}>{name}</Text>
                <Ionicons style={styles.menuIcon}  size={20} name={"ios-arrow-forward"} color={this.props.theme}/>
            </TouchableOpacity>
        );
    };

    _renderGroup = (name)=>{
        return (
            <Text style={styles.groupText}>{name}</Text>
        );
    };

    _navigateToAbout = ()=>{
        NavigationUtils.goToPage("AboutPage", {title: "教程", url: "https://reactnative.cn/"});
    };

    _navigateToTutorial = ()=>{
        NavigationUtils.goToPage("WebViewPage", {title: "教程", url: "https://reactnative.cn/"});
    };

    _noAction = ()=>{
        ToastAndroid.show("功能还在路上！", ToastAndroid.SHORT);
    };
}

const mapStateToProps = (state)=>({
    theme: state.theme.theme,
});

const mapDispatchToProps = (dispatch)=>({
    onThemeChanged: (themeColor)=>dispatch(Actions.onThemeChanged(themeColor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);

const styles = StyleSheet.create({
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
    },
    groupText: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        fontSize: 15,
        color: "gray"
    }
});