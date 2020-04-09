import React, {Fragment} from 'react';
import {
    SafeAreaView, StyleSheet, View, Text,
} from 'react-native';

export default class WelcomePage extends React.PureComponent{

    componentDidMount(){
        this.timer = setTimeout(()=>{
            this.props.navigation.navigate("Main");
        }, 1500);
    }

    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
    }

    render(){
        return (
            <Fragment>
                <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
                    <View style={styles.container}>
                        <Text style={styles.content}>Welcome Page!</Text>
                    </View>
                </SafeAreaView>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    content: {
        color: '#000000',
        fontSize: 20,
    }
});