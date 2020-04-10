import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {createAppContainer} from "react-navigation";
import {createMaterialTopTabNavigator} from "react-navigation-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import NavigationUtils from "../navigator/NavigationUtils";
import {
    SafeAreaView, StyleSheet, View, Text, Button, FlatList,
    ActivityIndicator, RefreshControl, TouchableOpacity
} from 'react-native';
import Actions from "../action";
import Types from "../action/types";
import TrendingItem from "../common/TrendingItem";
import NavigationBar from "../common/NavigationBar";
import TrendingDialog from "../common/TrendingDialog";

function _genTrendingURL(storeName, dateRange){
    let trendingURL = "https://github.com/trending";
    if (storeName){
        trendingURL = `${trendingURL}/${storeName}`;
    }
    if (dateRange){
        trendingURL = `${trendingURL}?since=${dateRange}`;
    }
    return trendingURL;
}

class TrendingTab extends React.PureComponent{

    constructor(props){
        super(props);
        const {tabLabel, dateRangeType} = this.props;
        this.storeName = tabLabel;
        this.dateRange = dateRangeType;
    }

    componentDidMount(){
        const {trending} = this.props;
        const storeData = trending[this.storeName];
        const data = storeData&&storeData.data;
        if (data && data.length > 0){
            return;
        }
        this._loadTrendingData();
    }

    _loadTrendingData(){
        const {onTrendingRefresh} = this.props;
        onTrendingRefresh(this.storeName, _genTrendingURL(this.storeName, this.dateRange));
    }

    render(){
        const {trending} = this.props;
        const storeData = trending[this.storeName];
        const data = storeData&&storeData.data;
        const actionType = storeData&&storeData.actionType;
        const requestError = storeData&&storeData.error;
        const isRefreshing = Types.TrendingRefresh===actionType;
        const {theme} = this.props;
        return (
            <Fragment>
                <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
                    <View style={styles.container}>
                        <FlatList style={{flex: 1}} data={data||[]}
                                  renderItem={this._renderItem} keyExtractor={this._keyExtractor}
                                  refreshControl={
                                      <RefreshControl colors={[theme]} refreshing={isRefreshing}
                                                      onRefresh={()=>this._loadTrendingData()}/>
                                  }/>
                    </View>
                </SafeAreaView>
            </Fragment>
        );
    }

    _keyExtractor = (item)=>("" + item["url"]);

    _renderItem = (data)=>{
        const {theme} = this.props;
        return <TrendingItem item={data.item} theme={theme}
                             onFavoriteRefresh={this.props.onFavoriteRefresh}/>;
    };
}

const mapStateToProps_TrendingTab = (state)=>({
    trending: state.trending, theme: state.theme.theme
});
const mapDispatchToProps_TrendingTab = dispatch=>({
    onTrendingRefresh: (storeName, url)=>dispatch(Actions.onTrendingRefresh(storeName, url)),
    onFavoriteRefresh: (storeName)=>dispatch(Actions.onFavoriteRefresh(storeName)),
});

const TrendingTabHOC = connect(mapStateToProps_TrendingTab, mapDispatchToProps_TrendingTab)(TrendingTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: 'stretch',
        backgroundColor: 'transparent'
    },
    content: {
        color: '#000000',
        fontSize: 20,
    },
    loadingContainer: {
        height: 55,
        justifyContent: "center"
    },
    loadingText: {
        alignSelf: "center",
        marginTop: 5,
        fontSize: 13,
        color: "gray"
    },
    listSeparator: {
        height: 5,
        backgroundColor: "#CED0CE"
    }
});

const TabConfig = {
    //initialRouteName: "TAB0",
    tabBarOptions: {
        upperCaseLabel: false,
        scrollEnabled: true,
        style: {
            height: 35
        },
        labelStyle: {
            height: "100%",
            marginBottom: 2,
            fontSize: 14,
        },
        indicatorStyle: {
            height: 2,
            backgroundColor: '#FFF',
        }
    },
    backBehavior: "none",
    lazy: true,
};

class TrendingPage extends React.PureComponent{

    constructor(props){
        super(props);
        this.tabNames = this.props.language;
        this.state = {dateRangeType: "daily"};
        this.props.onLoadLanguage();
    }

    _tabNavigator = ()=>{
        const tabs = {};
        const {dateRangeType} = this.state;
        this.tabNames.forEach((item, index) => {
            if (item.checked) {
                let {path, name} = item;
                tabs[`TAB${index}`] = {
                    screen: (props) => (
                        <TrendingTabHOC {...props} tabLabel={path} dateRangeType={dateRangeType}/>
                    ),
                    navigationOptions: {
                        tabBarLabel: name,
                    }
                };
            }
        });
        TabConfig.tabBarOptions.style = {
            ...TabConfig.tabBarOptions.style,
            backgroundColor: this.props.theme,
        };
        return createAppContainer(createMaterialTopTabNavigator(tabs, TabConfig));
    };

    render(){
        const statusBar = {
            backgroundColor: this.props.theme,
            barStyle: "light-content",
        };
        const titleView = this._renderTitleView();
        const navigationBar = (
            <NavigationBar titleView={titleView} statusBar={statusBar}
                           style={{backgroundColor: this.props.theme}}/>
        );
        const TopTabNavigator = this._tabNavigator();
        return (
            <View style={{flex: 1}}>
                {navigationBar}
                <TopTabNavigator/>
                {this._renderTrendingDialog()}
            </View>
        );
    }

    _renderTitleView = ()=>{
        let dateRangeText = "今天";
        const {dateRangeType} = this.state;
        if (dateRangeType === "daily"){
            dateRangeText = "今天";
        }else if (dateRangeType === "week"){
            dateRangeText = "本周";
        }else if (dateRangeType === "month"){
            dateRangeText = "本月";
        }
        return (
            <View style={{flex: 1, justifyContent: "center"}}>
                <TouchableOpacity underlayColor={"transparent"} onPress={this._showDialog}>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontSize: 20, color: "#FFF"}}>趋势 {dateRangeText}</Text>
                        <MaterialIcons size={40} color={"#FFF"} name={"arrow-drop-down"}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    _renderTrendingDialog = ()=>{
      return (
          <TrendingDialog ref={dialog=>this.dialog=dialog}
                          onDateRangeChanged={this.onDateRangeChanged}/>
      );
    };

    _showDialog = ()=>{
        this.dialog&&this.dialog.show();
    };

    onDateRangeChanged = (dateRangeType="daily")=>{
        this.dialog&&this.dialog.dismiss();
        if (dateRangeType === this.state.dateRangeType){
            return;
        }
        this.setState({
            dateRangeType: dateRangeType,
        });
    };
}

const mapStateToProps = (state)=>({
    theme: state.theme.theme, language: state.language.key
});

const mapDispatchToProps = dispatch=>({
    onLoadLanguage: ()=>dispatch(Actions.onLoadKey()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingPage);