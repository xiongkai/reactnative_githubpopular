import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const pageSize = 10;

export const MyPageMenu = {
    About: {name: 'Github_Popular', Icons: Ionicons, icon: 'logo-github'},
    Tutorial: {name: '教程', Icons: Ionicons, icon: 'ios-bookmarks'},
    Custom_Language: {name: '自定义语言', Icons: Ionicons, icon: 'md-checkbox-outline'},
    Sort_Language: {name: '语言排序', Icons: MaterialCommunityIcons, icon: 'sort'},
    Custom_Theme: {name: '自定义主题', Icons: Ionicons, icon: 'ios-color-palette'},
    Custom_Key: {name: '自定义标签', Icons: Ionicons, icon: 'md-checkbox-outline'},
    Sort_Key: {name: '标签排序', Icons: MaterialCommunityIcons, icon: 'sort'},
    Remove_Key: {name: '标签移除', Icons: Ionicons, icon: 'md-remove'},
    About_Author: {name: '关于作者', Icons: Octicons, icon: 'smiley'},
    Feedback: {name: '反馈', Icons: MaterialIcons, icon: 'feedback'},
    Share: {name: '分享', Icons: Ionicons, icon: 'md-share'},
    CodePush: {name: 'CodePush', Icons: Ionicons, icon: 'ios-planet'},
};

export const TutorialMenu = {
    ReactJS: {name: "React.js中文网", url: "https://react.docschina.org/"},
    ReactNative: {name: "React Native中文网", url: "https://reactnative.cn/"}
};

export const ThemeFlags = {
    Default: '#2196F3',
    Red: '#F44336',
    Pink: '#E91E63',
    Purple: '#9C27B0',
    DeepPurple: '#673AB7',
    Indigo: '#3F51B5',
    Blue: '#2192FF',
    LightBlue: '#03A9F4',
    Cyan: '#00BCD4',
    Teal: '#009688',
    Green: '#4CAF50',
    LightGreen: '#8BC34A',
    Orange: '#FF9800',
    DeepOrange: '#FF5722',
    Brown: '#795548',
    Grey: '#9E9E9E',
    BlueGrey: '#607D8B',
    Black: '#000000'
};