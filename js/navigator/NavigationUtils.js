export default class NavigationUtils {
    static Navigation = null;
    /**
     * 返回主页面
     * @param navigation
     */
    static resetToHomePage(navigation){
        navigation.navigate("Main");
    }

    /**
     * 返回到上一页
     * @param navigation
     */
    static goBack(navigation){
        if (navigation){
            navigation.goBack(null);
            return;
        }
        NavigationUtils.Navigation
        &&NavigationUtils.Navigation.goBack(null);
    }

    /**
     * 跳转到指定名称的路由
     * @param routeName
     * @param params
     */
    static goToPage(routeName, params){
        NavigationUtils.Navigation
        &&NavigationUtils.Navigation.navigate(routeName, params);
    }
}