import React, { Component } from 'react';
import { 
    View, 
    Image, 
    Text,
    TouchableOpacity, 
    Easing, 
    Animated
} from 'react-native';
import Tab from './Tab';
import Detail from '../Detail';
import Publish from '../Publish';
import { connect } from 'react-redux';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import { ios, statusBarHeight } from '../../configs/Device';
import NavBack from './NavBack';

const StackOptions = ({navigation}) => {
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
    }

    if (navigation.state.routeName === 'Tab') {
        return navigationOptions;
    } else {
        return {
            ...navigationOptions, 
            headerLeft: <NavBack />, 
            headerRight: <View />
        };
    }
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
        initialRouteName: 'Tab',
        mode: 'card',
        headerMode: 'screen',
        navigationOptions: (props) => StackOptions(props),
        transitionConfig: () => ({ 
            // transitionSpec: {
            //     duration: 250,
            //     easing: Easing.linear,
            //     timing: Animated.timing,
            // },
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
