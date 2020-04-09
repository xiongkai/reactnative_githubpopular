import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class ExpandItem extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {isExpand: false};
    }

    render(){
        const {name, Icons, icon} = this.props.item;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.menuContainer} onPress={this._onExpandClick}>
                    <Icons style={styles.menuIcon} size={20} name={icon} color={this.props.theme}/>
                    <Text style={styles.menuText}>{name}</Text>
                    <Ionicons style={styles.menuIcon}  size={20}
                              name={this.state.isExpand?"ios-arrow-down":"ios-arrow-forward"}
                              color={this.props.theme}/>
                </TouchableOpacity>
                {this.props.childItems&&this.props.childItems.map(item=>this._renderItem(item))}
            </View>
        );
    }

    _renderItem = (item)=>{
        const {name} = item;
        const itemStyle = [styles.menuContainer, styles.menuChildPadding];
        if (!this.state.isExpand){
            itemStyle.push(styles.menuContainerHidden);
        }
        return (
            <TouchableOpacity style={itemStyle} key={name}
                              onPress={()=>this.props.callback(item)}>
                <Text style={styles.menuText}>{name}</Text>
            </TouchableOpacity>
        );
    };

    _onExpandClick = ()=>{
        if (!this.props.canExpand){
            this.props.callback(this.props.item);
            return;
        }
        const {isExpand} = this.state;
        this.setState({
            isExpand: !isExpand
        });
    };
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        flexDirection: "column",
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
    menuContainerHidden: {
        display: "none",
    },
    menuChildPadding: {
        paddingLeft: 40,
        paddingRight: 15
    },
    menuIcon: {
        paddingHorizontal: 10,
    },
    menuText: {
        fontSize: 16,
        flex: 1,
    }
});