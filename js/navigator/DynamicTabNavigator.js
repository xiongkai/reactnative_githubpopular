import React from "react";
import {connect} from "react-redux";
import {createAppContainer} from "react-navigation";
import {createBottomTabNavigator, BottomTabBar} from "react-navigation-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TrendingPage from "../page/TrendingPage";
import PopularPage from "../page/PopularPage";
import FavoritePage from "../page/FavoritePage";
import MyPage from "../page/MyPage";

function TabIconHoc(name){
    return ({tintColor})=>{
        return <MaterialIcons name={name} style={{color: tintColor}} size={29}/>;
    }
}

const BottomTabs = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: "最热",
            tabBarIcon: TabIconHoc('whatshot')
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: "趋势",
            tabBarIcon: TabIconHoc('trending-up')
        }
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: "收藏",
            tabBarIcon: TabIconHoc('favorite')
        }
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: TabIconHoc('person')
        }
    },
};

const TabConfig = {
    initialRouteName: "PopularPage",
    tabBarOptions: {
        labelStyle: {
            fontSize: 14,
            marginBottom: 3
        },
        style: {
            paddingTop: 3,
        },
    },
    resetOnBlur: false,
    backBehavior: "none",
    lazy: true,
};

class TabBarComponent extends React.PureComponent{

    constructor(props){
        super(props);
        this.theme = {
            tintColor: props.theme,
            updateTime: new Date().getTime()-100,
        }
    }

    render(){
        const activeTintColor = this.theme.tintColor||this.props.activeTintColor;
        return <BottomTabBar {...this.props} activeTintColor={activeTintColor}/>;
    }
}

class DynamicTabNavigator extends React.PureComponent{

    _tabNavigator = (tabs, config)=>{
        if (this.tabNavigator){
            return this.tabNavigator;
        }
        this.tabNavigator = createAppContainer(createBottomTabNavigator(tabs, config));
        return this.tabNavigator;
    };

    render(){
        const {PopularPage, TrendingPage, FavoritePage, MyPage} = BottomTabs;
        const Tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};
        const themeColor = this.props.theme;
        TabConfig.tabBarComponent = (props)=>(
            <TabBarComponent theme={themeColor} {...props}/>
        );
        const TabNavigator = this._tabNavigator(Tabs, TabConfig);
        return <TabNavigator/>;
    }
}

const mapStateToProps = (state)=>({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);