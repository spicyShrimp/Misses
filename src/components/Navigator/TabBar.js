import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    TouchableWithoutFeedback, 
    Platform, 
    Dimensions 
} from 'react-native';
const {width, height} = Dimensions.get('window');

export default class TabBar extends Component {
    renderItem = (route, index) => {
        const { navigation, jumpToIndex } = this.props;
        const focused = index === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        const TabScene = {
            focused,
            route,
            color,
        };
        if (index == 2) {
            return (
                <TouchableWithoutFeedback 
                    key={ route.key } 
                    style={ styles.tabItem } 
                    onPress={ ()=>navigation.navigate('Publish') }>
                        <View 
                            style={styles.tabItem}>
                                { this.props.renderIcon(TabScene) }
                        </View>
                </TouchableWithoutFeedback>
            );
        } else {
            return (
                <TouchableWithoutFeedback 
                    key={ route.key } 
                    style={ styles.tabItem } 
                    onPress={ ()=>jumpToIndex(index) }>
                        <View 
                            style={ styles.tabItem }>
                                { this.props.renderIcon(TabScene)}
                                <Text 
                                    style={ { color, fontSize: 10 } }>
                                    { this.props.getLabel(TabScene) }
                                </Text>
                        </View>
                </TouchableWithoutFeedback>
            );
        }
    };
    render(){
        const {navigation,jumpToIndex} = this.props;
        const {routes,} = navigation.state;
        const focused = 2 === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        let TabScene = {
            focused:focused,
            route:routes[2],
            tintColor:color
        };
        return (
            <View style={ styles.tab }>
                {routes && routes.map((route,index) => this.renderItem(route, index))}
            </View>
        );
    }
}
const styles = {
    tab: {
        backgroundColor: '#fff',
        flexDirection:'row',
        justifyContent:'space-around',
        borderTopColor: 'rgba(0, 0, 0, 0.3)',
        borderTopWidth: 0.5,
        paddingBottom: (Platform.OS == 'ios' && height == 812) ? 34 : 0,
    },
    tabLine: {
        height: 0.5, 
        backgroundColor: 'rgba(100, 100, 100, 0.3)', 
    },
    tabItem: {
        height:49,
        width:49,
        alignItems:'center',
        justifyContent:'center'
    },
};
