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
import VideoDetail from '../Detail/VideoDetial';
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
            headerLeft: <NavItem onPress={() => navigation.goBack()} />, 
            headerRight: <View />
        };
    }
};

const transitionConfig = ({scene}) => {
    if (scene.route.routeName === 'VideoDetail') {
        return {
            screenInterpolator: CardStackStyleInterpolator.forFade,
        }
    } else {
        return {
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        }
    }
    
}

const Main = StackNavigator(
    {
        Tab,
        Through,
        Detail,
        VideoDetail,
        Web,
    },
    {
        initialRouteName: 'Tab',
        mode: 'card',
        headerMode: 'screen',
        navigationOptions,
        transitionConfig,
    }
)

export default StackNavigator(
    {
        Main,
        Publish,
    },
    {
        mode: 'modal',
        headerMode: 'none',
        // transitionConfig: () => ({ screenInterpolator: CardStackStyleInterpolator.forFade })
    }
)
