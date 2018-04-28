import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    TouchableOpacity, 
} from 'react-native';
import { width, height, isIPhoneX } from '../../configs/Device';

export default class TabBar extends Component {
    renderItem(route, index) {
        const { navigation, jumpToIndex, activeTintColor, inactiveTintColor } = this.props;
        const focused = (index === navigation.state.index);
        const color = focused ? activeTintColor : inactiveTintColor;
        const TabScene = {
            focused,
            route,
            color,
        };
        if (index === 2) {
            return (
                <TouchableOpacity
    				activeOpacity={0.7}
                    style={styles.tabItem} 
                    onPress={() => navigation.navigate('Publish')}
                >
                    <View  style={styles.tabItem}>
                        {this.props.renderIcon(TabScene)}
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={styles.tabItem} 
                    onPress={() => jumpToIndex(index)}
                    >
                    <View style={styles.tabItem}>
                        {this.props.renderIcon(TabScene)}
                        <Text style={{color, fontSize: 10}}>
                            {this.props.getLabel(TabScene)}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
    };
    render(){
        const { navigation } = this.props;
        const { routes } = navigation.state;
        return (
            <View style={styles.tab}>
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
        paddingBottom: isIPhoneX ? 34 : 0,
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
