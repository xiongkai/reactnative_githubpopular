import React, {Fragment} from "react";
import {connect} from "react-redux";
import {
    SafeAreaView, View, FlatList, TouchableOpacity, StyleSheet, Dimensions
} from "react-native";
import Actions from "../action";
import Types from "../action/types";
import NavigationBar from "../common/NavigationBar";
import NavigationUtils from "../navigator/NavigationUtils";
import Ionicons from "react-native-vector-icons/Ionicons";
import BackPressHelper from "../common/BackPressHelper";
import {ThemeFlags} from "../utils/Constants";

const WindowWidth = Dimensions.get("window").width;

const columnWidth = WindowWidth / 3;

class ThemePage extends React.PureComponent{

    constructor(props){
        super(props);
        this.backPressHelper = new BackPressHelper({...this.props, onBackPressed: this._onBackPressed});
        this.themeNames = Object.keys(ThemeFlags);
    }

    componentDidMount() {
        this.backPressHelper.componentDidMount();
    }

    componentWillUnmount() {
        this.backPressHelper.componentWillUnmount();
    }

    _onBackPressed = ()=>{
        NavigationUtils.goBack();
        return true;
    };

    render(){
        return (
            <Fragment>
                <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
                    <NavigationBar title={"自定义主题"}
                                   leftButton={this._getLeftButton()}
                                   titleLayoutStyle={{marginRight: 50}}
                                   style={{backgroundColor: this.props.theme}}/>
                    <View style={styles.container}>
                        <FlatList style={{flex: 1}}
                                  data={this.themeNames}
                                  renderItem={this._renderItem}
                                  keyExtractor={this._keyExtractor}
                                  getItemLayout={this._getItemLayout}
                                  numColumns={3}/>
                    </View>
                </SafeAreaView>
            </Fragment>
        );
    }

    _onLeftButtonClick = ()=>{
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

    _keyExtractor = (item)=>item;

    _renderItem = (data)=>{
        const {item} = data;
        const {theme} = this.props;
        const newTheme = ThemeFlags[item];
        return (
            <TouchableOpacity style={styles.themeContainer}
                              onPress={()=>this.props.onThemeChanged(newTheme)}>
                <View style={[styles.themeColorView, {backgroundColor: newTheme}]}>
                    {theme===newTheme?<Ionicons name={"ios-checkmark-circle"} size={20}  color={"#FFF"}/>:null}
                </View>
            </TouchableOpacity>
        );
    };

    _getItemLayout = (item, index)=>{
        const columnWidth = WindowWidth / 3;
        return {length: columnWidth, offset: columnWidth * index, index};
    };
}

const mapStateToProps = (state)=>({theme: state.theme.theme});

const mapDispatchToProps = dispatch=>({
    onThemeChanged: (theme)=>dispatch(Actions.onThemeChanged(theme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    actionButton: {
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    themeContainer: {
        width: columnWidth,
        height: columnWidth,
        padding: 10,
    },
    themeColorView: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-end",
        paddingTop: 10,
        paddingRight: 10,
    },
});