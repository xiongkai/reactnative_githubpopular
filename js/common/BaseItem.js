import React from "react";
import Actions from "../action";

export default class BaseItem extends React.PureComponent{

    constructor(props){
        super(props);
        const {item} = this.props;
        this.state = {isFavorite: item&&item["isFavorite"]};
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const {item} = nextProps;
        const isFavorite = item&&item["isFavorite"];
        if (prevState.isFavorite !== isFavorite) {
            return {isFavorite: isFavorite};
        }
        return null;
    }

    setFavorite = (favoriteDao, keyName)=>{
        const {isFavorite} = this.state;
        const {item} = this.props;
        item.isFavorite = !isFavorite;
        if (isFavorite){
            favoriteDao.removeFavoriteItem(item[keyName]+"");
        }else{
            favoriteDao.saveFavoriteItem(item[keyName]+"", item);
        }
        this.setState({isFavorite: !isFavorite});
    };
}