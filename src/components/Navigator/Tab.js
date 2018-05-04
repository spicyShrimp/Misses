import React, { Component } from 'react';
import { 
    Text, 
    Image, 
    View, 
    StyleSheet 
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import TabBar from './TabBar';
import Essence from '../Essence';
import New from '../New';
import Publish from '../Publish';
import Friend from '../Friend';
import Me from '../Me';

const tabBarOptions = {
    activeTintColor: '#ff2e57',
    inactiveTintColor: '#666',
}

export default TabNavigator(
    {
        Essence: { 
            screen: Essence, 
            navigationOptions: {  
                tabBarIcon: ({focused}) => (  
                    <Image 
                        source={{uri: focused ? 'tabbar_essence_click' : 'tabbar_essence'}}  
                        style={styles.item}  
                        />  
                ),
                tabBarLabel: '精华',  
            } 
        },
        New: { 
            screen: New,
            navigationOptions: {  
                tabBarIcon: ({focused}) => (  
                    <Image 
                        source={{uri: focused ? 'tabbar_new_click' : 'tabbar_new'}}  
                        style={styles.item}  
                        />  
                ),
                tabBarLabel: '最新',    
            } 
        },
        PublishPlaceHolder: { //占位用,此页面实际不会去调用
            screen: Component, 
            navigationOptions: {
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={{uri: focused ? 'tabbar_publish_click' : 'tabbar_publish'}}  
                        style={styles.centerItem}  
                        /> 
                ), 
            } 
        },
        Friend: { 
            screen: Friend, 
            navigationOptions: {  
                tabBarIcon: ({focused}) => (  
                    <Image 
                        source={{uri: focused ? 'tabbar_friend_click' : 'tabbar_friend'}}  
                        style={styles.item}  
                        />  
                ),
                tabBarLabel: '社区',  
            } 
        },
        Me: { 
            screen: Me,
            navigationOptions: {
                tabBarIcon: ({focused}) => (  
                    <Image 
                        source={{uri: focused ? 'tabbar_me_click' : 'tabbar_me'}}  
                        style={styles.item}
                        />  
                ),
                tabBarLabel: '我',   
            } 
        },
    },
    {
        tabBarComponent:(props) => <TabBar {...props} />,// 自定义tab样式
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
        tabBarOptions,
    }
)

const styles = StyleSheet.create({
    item: {
        width: 27,
        height: 27,
    },
    centerItem: {
        width: 38,
        height: 38,
    },
})