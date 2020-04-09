import React, {Fragment} from 'react';
import NavigationUtils from "../navigator/NavigationUtils";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {
    StyleSheet, View, Text, Image, TouchableOpacity ,
} from 'react-native';
import {favoriteDao} from "../action/popular";
import BaseItem from "./BaseItem";
import Actions from "../action";

export default class PopularItem extends BaseItem{

    render(){
        const {item, theme} = this.props;
        const {isFavorite} = this.state;
        return (
            <TouchableOpacity style={{margin: 3, borderRadius: 2}} onPress={this._onItemClick}>
                <View style={styles.container}>
                    <Text style={styles.fullNameText}>{item["full_name"]}</Text>
                    <Text style={styles.descriptionText} numberOfLines={2} ellipsizeMode={"tail"}>{item["description"]}</Text>
                    <View style={styles.labelsContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelText}>Author:</Text>
                            <Image style={styles.labelIcon}
                                   source={{uri: item["owner"]["avatar_url"]}}
                                   resizeMode={"cover"} borderRadius={5}/>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelText}>Stars:</Text>
                            <Text style={styles.labelText}>{item["stargazers_count"]}</Text>
                        </View>
                        <View style={{...styles.labelContainer, justifyContent: "flex-end", paddingRight: 5}}>
                            <TouchableOpacity style={{padding: 6}} underlayColor={"transparent"} onPress={this._onStarClick}>
                                <MaterialIcon size={25} name={isFavorite?"star":"star-border"} style={{color: theme}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _onItemClick = ()=>{
        const {item} = this.props;
        const fullName = item&&item["full_name"];
        const {isFavorite} = this.state;
        NavigationUtils.goToPage("DetailPage", {
            fullName, isFavorite, callback: ()=>{
                this._onStarClick();
            }
        });
    };

    _onStarClick = ()=>{
        this.setFavorite(favoriteDao, "id");
        const {item} = this.props;
        const {storeName, id, isFavorite} = item;
        setTimeout(()=>{
            if (this.props.onFavoriteRefresh){
                this.props.onFavoriteRefresh("popular");
            }else if (this.props.onPopularFavoriteUpdate){
                this.props.onPopularFavoriteUpdate(storeName, id, isFavorite);
            }
        }, 500);
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: 5,
        backgroundColor: "#FFF",
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    fullNameText: {
        fontSize: 15,
        paddingVertical: 5
    },
    descriptionText: {
        flex: 1,
        fontSize: 15,
        color: "gray",
        paddingVertical: 5
    },
    labelsContainer: {
        flexDirection: "row",
        paddingTop: 5
    },
    labelContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    labelIcon: {
        width: 22,
        height: 22
    },
    labelText: {
        fontSize: 14
    }
});