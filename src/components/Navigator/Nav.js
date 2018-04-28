import React, { Component } from 'react';
import { 
    View, 
    Image, 
    Text, 
    Platform, 
    StatusBar, 
    Easing, 
    Animated
} from 'react-native';
import Tab from './Tab';
import Detail from '../Detail';
import Publish from '../Publish';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import { ios, statusBarHeight } from '../../configs/Device';

//适配android导航栏样式和iOS一致
const navigationOptions = {
    headerStyle: { 
        borderBottomWidth: 0,
        elevation: 0,
        backgroundColor: '#ff2d55',
        paddingTop: ios ? 0 : statusBarHeight,
        height: 44 + (ios ? 0 : statusBarHeight),
    },
    headerTitleStyle: { textAlign: 'center', flex: 1, },
    headerTintColor: '#fff',
    headerBackTitle: null,
    gesturesEnabled: false,
};

const Main = StackNavigator(
    {
        Tab: { 
            screen: Tab,
         },
        Detail: { 
            screen: Detail,
        },
    },
    {
        mode: 'card',
        headerMode: 'screen',
        navigationOptions,
        transitionConfig: () => ({ 
            transitionSpec: {
                duration: 250,
                easing: Easing.linear,
                timing: Animated.timing,
            },
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        })
    }
)

export default StackNavigator(
    {
        Main: { 
            screen: Main, 
        },
        Publish: { 
            screen: Publish, 
        },
    },
    {
        // mode: 'modal',
        headerMode: 'none',
        transitionConfig: () => ({ screenInterpolator: CardStackStyleInterpolator.forFade })
    }
)
