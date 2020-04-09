import React, {Fragment} from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
    Modal, View, Text, StyleSheet, TouchableOpacity,
} from "react-native";

export default class TrendingDialog extends React.PureComponent{

    state = {visible: false};

    render(){
        return (
            <Modal transparent={true} visible={this.state.visible}
                   onRequestClose={()=>this.dismiss()}>
                <TouchableOpacity style={styles.container} activeOpacity={1}
                                  onPress={()=>this.dismiss()}>
                    <MaterialIcons name={"arrow-drop-up"} size={30} color={"#FFF"}
                                   style={styles.topArrow}/>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btnTouchable}
                                          onPress={()=>this.props.onDateRangeChanged("daily")}>
                            <Text style={styles.btnText}>今天</Text>
                        </TouchableOpacity>
                        <View style={styles.divider}/>
                        <TouchableOpacity style={styles.btnTouchable}
                                          onPress={()=>this.props.onDateRangeChanged("week")}>
                            <Text style={styles.btnText}>本周</Text>
                        </TouchableOpacity>
                        <View style={styles.divider}/>
                        <TouchableOpacity style={styles.btnTouchable}
                                          onPress={()=>this.props.onDateRangeChanged("month")}>
                            <Text style={styles.btnText}>本月</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }

    show(){
        this.setState({
            visible: true,
        });
    }

    dismiss(){
        this.setState({
            visible: false,
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    topArrow: {
        marginTop: 30,
        padding: 0,
        margin: -13
    },
    btnContainer: {
        width: 120,
        alignItems: "stretch",
        backgroundColor: "#FFF",
        borderRadius: 3,
    },
    btnTouchable: {
        alignItems: "center",
        paddingVertical: 8,
    },
    btnText: {
        fontSize: 18,
        color: "#000",
    },
    divider: {
        height: 1,
        marginHorizontal: 10,
        backgroundColor: "#E0E0E0",
    }
});