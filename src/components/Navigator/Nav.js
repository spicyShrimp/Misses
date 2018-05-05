import React, { Component } from 'react';
import { 
    View, 
    Image, 
    Text,
    TouchableOpacity, 
    Easing, 
    Animated
} from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import { ios, statusBarHeight } from '../../configs/Device';
import NavItem from './NavItem';
import Tab from './Tab';
import Through from '../Essence/Through';
import Detail from '../Detail';
import Publish from '../Publish';
import Web from '../Base/Web';

const navigationOptions = ({navigation}) => {
    const options = {
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
        headerTitle: '百思不得姐',
    };

    if (navigation.state.routeName === 'Tab') {
        return options;
    } else {
        return {
            ...options, 
            headerLeft: <NavItem 
                            source={{uri: 'nav_back'}} 
                            onPress={() => navigation.goBack()}
                            />, 
            headerRight: <View />
        };
    }
};

const Main = StackNavigator(
    {
        Tab,
        Through,
        Detail,
        Web,
    },
    {
        initialRouteName: 'Tab',
        mode: 'card',
        headerMode: 'screen',
        navigationOptions,
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
        mode: 'modal',
        headerMode: 'none',
        // transitionConfig: () => ({ screenInterpolator: CardStackStyleInterpolator.forFade })
    }
)
