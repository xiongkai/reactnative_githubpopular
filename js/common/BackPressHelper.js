import {BackHandler} from "react-native";
import {NavigationActions} from "react-navigation";

export default class BackPressHelper {

    constructor(props){
        this.props = props;
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPressed);
    }

    onBackPressed = () => {
        if (this.props.onBackPressed&&this.props.onBackPressed()){
            return true;
        }
        const {dispatch, nav} = this.props;
        if (nav.routes[1].index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };
}