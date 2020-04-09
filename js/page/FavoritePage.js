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
import PopularItem from "../common/PopularItem";
import NavigationBar from "../common/NavigationBar";
import TrendingItem from "../common/TrendingItem";

class FavoriteTab extends React.PureComponent{

    constructor(props){
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount(){
        const {favorite} = this.props;
        const storeData = favorite[this.storeName];
        const data = storeData&&storeData.data;
        if (data && data.length > 0){
            return;
        }
        this._loadFavoriteData();
    }

    _loadFavoriteData(){
        this.props.onFavoriteRefresh(this.storeName);
    }

    render(){
        const {favorite} = this.props;
        const storeData = favorite[this.storeName];
        const data = storeData&&storeData.data;
        const actionType = storeData&&storeData.actionType;
        const requestError = storeData&&storeData.error;
        const isRefreshing = Types.FavoriteRefresh===actionType;
        const {theme} = this.props;
        return (
            <Fragment>
                <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
                    <View style={styles.container}>
                        <FlatList style={{flex: 1}} data={data||[]}
                                  renderItem={this._renderItem} keyExtractor={this._keyExtractor}
                                  refreshControl={
                                      <RefreshControl colors={[theme]} refreshing={isRefreshing}
                                                      onRefresh={()=>this._loadFavoriteData()}/>
                                  }/>
                        {/*onMomentumScrollBegin={this._onMomentumScrollBegin}
                            onEndReached={this._onEndReached}
                            onEndReachedThreshold={0.5}*/}
                    </View>
                </SafeAreaView>
            </Fragment>
        );
    }

    _keyExtractor = (item)=>{
        if (this.storeName === "popular"){
            return item["id"] + "";
        }else {
            return item["url"];
        }
    };

    _renderItem = (data)=>{
        const {theme} = this.props;
        if (this.storeName === "popular"){
            return <PopularItem item={data.item} theme={theme}
                                onPopularFavoriteUpdate={this.props.onPopularFavoriteUpdate}/>;
        }else {
            return <TrendingItem item={data.item} theme={theme}
                                 onTrendingFavoriteUpdate={this.props.onTrendingFavoriteUpdate}/>;
        }
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

const mapStateToProps_FavoriteTab = (state)=>({
    favorite: state.favorite, theme: state.theme.theme
});
const mapDispatchToProps_FavoriteTab = dispatch=>({
    onFavoriteRefresh: (storeName)=>dispatch(Actions.onFavoriteRefresh(storeName)),
    onPopularFavoriteUpdate: (storeName, keyValue, isFavorite)=>dispatch(Actions.onPopularFavoriteUpdate(storeName, keyValue, isFavorite)),
    onTrendingFavoriteUpdate: (storeName, keyValue, isFavorite)=>dispatch(Actions.onTrendingFavoriteUpdate(storeName, keyValue, isFavorite))
});

const FavoriteTabHOC = connect(mapStateToProps_FavoriteTab, mapDispatchToProps_FavoriteTab)(FavoriteTab);

const styles = StyleSheet.create({
    container: {
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
        scrollEnabled: false,
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

class FavoritePage extends React.PureComponent{

    constructor(props){
        super(props);
        this.tabNames = [{tabName: "最热", storeName: "popular"}, {tabName: "趋势", storeName: "trending"}];
    }

    _tabNavigator = ()=>{
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`TAB${index}`] = {
                screen: (props)=><FavoriteTabHOC {...props} tabLabel={item.storeName}/>,
                navigationOptions: {
                    tabBarLabel: item.tabName,
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
            <NavigationBar title={"收藏"} statusBar={statusBar}
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

export default connect(mapStateToProps)(FavoritePage);