import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {createAppContainer} from "react-navigation";
import {createMaterialTopTabNavigator} from "react-navigation-tabs";
import NavigationUtils from "../navigator/NavigationUtils";
import {
    SafeAreaView, StyleSheet, View, Text, Button, FlatList,
    ActivityIndicator, RefreshControl, TouchableOpacity
} from 'react-native';
import Actions from "../action";
import Types from "../action/types";
import {pageSize} from "../utils/Constants";
import PopularItem from "../common/PopularItem";
import NavigationBar from "../common/NavigationBar";

function _genPopularURL(storeName, pageIndex){
    return `https://api.github.com/search/repositories?q=${storeName}&page=${pageIndex}&per_page=${pageSize}`;
}

class PopularTab extends React.PureComponent{

    constructor(props){
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount(){
        const {popular} = this.props;
        const storeData = popular[this.storeName];
        const data = storeData&&storeData.data;
        if (data && data.length > 0){
            return;
        }
        this._loadPopularData();
    }

    _loadPopularData(loadMore){
        const {onPopularRefresh, onPopularLoadMore, popular} = this.props;
        if (loadMore){
            const storeData = popular[this.storeName];
            const pageIndex = (storeData&&storeData.pageIndex)||1;
            onPopularLoadMore(this.storeName, _genPopularURL(this.storeName, pageIndex+1));
        }else{
            onPopularRefresh(this.storeName, _genPopularURL(this.storeName, 1));
        }
    }

    render(){
        const {popular} = this.props;
        const storeData = popular[this.storeName];
        const data = storeData&&storeData.data;
        const actionType = storeData&&storeData.actionType;
        const hasNoMoreData = storeData&&storeData.hasNoMoreData;
        const requestError = storeData&&storeData.error;
        const isRefreshing = Types.PopularRefresh===actionType;
        const isLoadingMore = Types.PopularLoadMore===actionType;
        const {theme} = this.props;
        return (
            <Fragment>
                <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
                    <View style={styles.container}>
                        <FlatList style={{flex: 1}} data={data||[]}
                                  renderItem={this._renderItem} keyExtractor={this._keyExtractor}
                                  refreshControl={
                                      <RefreshControl colors={[theme]} refreshing={isRefreshing}
                                                      onRefresh={()=>this._loadPopularData(false)}/>
                                  }
                                  ListFooterComponent={
                                      this._renderLoading(isRefreshing, isLoadingMore, hasNoMoreData, requestError)
                                  }/>
                        {/*onMomentumScrollBegin={this._onMomentumScrollBegin}
                            onEndReached={this._onEndReached}
                            onEndReachedThreshold={0.5}*/}
                    </View>
                </SafeAreaView>
            </Fragment>
        );
    }

    _renderLoading(isRefreshing, isLoadingMore, hasNoMoreData, requestError){
        if (hasNoMoreData){
            return (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>没有更多数据啦！</Text>
                </View>
            );
        }
        if (isLoadingMore){
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={25} animating={true} color={"gray"}/>
                    <Text style={styles.loadingText}>正在加载…</Text>
                </View>
            );
        }
        if (!isRefreshing){
            return (
                <TouchableOpacity onPress={()=>this._loadPopularData(true)}>
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>
                            {requestError?"加载出错啦，点我重试！" : "点我加载更多！"}
                        </Text>
                        {requestError?<Text style={styles.loadingText}>{requestError.message}</Text>:null}
                    </View>
                </TouchableOpacity>
            );
        }
        return null;
    }

    _keyExtractor = (item)=>("" + item["id"]);

    _renderItem = (data)=>{
        const {theme} = this.props;
        return <PopularItem item={data.item} theme={theme}
                            onFavoriteRefresh={this.props.onFavoriteRefresh}/>;
    };

  /*_onMomentumScrollBegin = ()=>{
        this.canLoadMore = true;
    };

    _onEndReached = ()=>{
        if (this.canLoadMore){
            this.canLoadMore = false;
            this._loadPopularData(true);
        }
    };*/
}

const mapStateToProps_PopularTab = (state)=>({
    popular: state.popular, theme: state.theme.theme
});
const mapDispatchToProps_PopularTab = dispatch=>({
    onPopularRefresh: (storeName, url)=>dispatch(Actions.onPopularRefresh(storeName, url)),
    onPopularLoadMore: (storeName, url)=>dispatch(Actions.onPopularLoadMore(storeName, url)),
    onFavoriteRefresh: (storeName)=>dispatch(Actions.onFavoriteRefresh(storeName)),
});

const PopularTabHOC = connect(mapStateToProps_PopularTab, mapDispatchToProps_PopularTab)(PopularTab);

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
    initialRouteName: "TAB0",
    tabBarOptions: {
        upperCaseLabel: false,
        scrollEnabled: true,
        style: {
            height: 35,
        },
        labelStyle: {
            height: "100%",
            marginBottom: 2,
            fontSize: 14,
        },
        indicatorStyle: {
            height: 2,
            backgroundColor: '#FFF',
        },

    },
    backBehavior: "none",
    lazy: true,
};

class PopularPage extends React.PureComponent{

    constructor(props){
        super(props);
        this.tabNames = ["Android", "IOS", "ReactNative", "Java", "Python", "PHP", "C#", "C/C++"];
    }

    _tabNavigator = ()=>{
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`TAB${index}`] = {
                screen: (props)=><PopularTabHOC {...props} tabLabel={item}/>,
                navigationOptions: {
                    tabBarLabel: item,
                }
            };
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
        const navigationBar = (
            <NavigationBar title={"最热"} statusBar={statusBar}
                           style={{backgroundColor: this.props.theme}}/>
        );
        const TopTabNavigator = this._tabNavigator();
        return (
            <View style={{flex: 1}}>
                {navigationBar}
                <TopTabNavigator/>
            </View>
        );
    }
}

const mapStateToProps = (state)=>({theme: state.theme.theme});

export default connect(mapStateToProps)(PopularPage);