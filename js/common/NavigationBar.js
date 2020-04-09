import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {
    StatusBar, View, Text, StyleSheet, Platform, ViewPropTypes
} from "react-native";

export default class NavigationBar extends React.PureComponent{

    render(){
        let statusBar = this.props.statusBar.hidden?null:(
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar}/>
            </View>
        );
        let titleView = this.props.titleView?this.props.titleView:(
            <Text ellipsizeMode={"tail"} numberOfLines={1} style={styles.title}>{this.props.title}</Text>
        );
        let content = this.props.hide?null:(
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>
        );
        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}{content?content:null}
            </View>
        );
    }

    getButtonElement(button){
        return (
            <View style={styles.navBarButton}>
                {button}
            </View>
        );
    }
}

const StatusBarShape = {
    barStyle: PropTypes.oneOf(["light-content", "dark-content"]),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
};

NavigationBar.propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string,
    titleView: PropTypes.element,
    titleLayoutStyle: ViewPropTypes.style,
    hide: PropTypes.bool,
    statusBar: PropTypes.shape(StatusBarShape),
    rightButton: PropTypes.element,
    leftButton: PropTypes.element,
};

NavigationBar.defaultProps = {
    statusBar: {
        barStyle: "light-content",
        hidden: false,
    }
};

const navBarHeight = Platform.OS==="ios"?44:50;
const statusBarHeight = Platform.OS==="ios"?20:0;

const styles = StyleSheet.create({
    statusBar: {
        height: statusBarHeight,
    },
    navBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: navBarHeight,
    },
    navBarTitleContainer: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    navBarButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        color: "#FFF"
    }
});
