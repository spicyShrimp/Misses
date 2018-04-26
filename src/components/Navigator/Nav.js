import React, { Component } from 'react';
import {  View, Image, Text, Platform } from 'react-native';
import Tab from './Tab';
import Publish from '../Publish';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

const navigationOptions = {
    headerStyle: { 
        borderBottomWidth: 0,
        elevation: 0,
        backgroundColor: '#ff2d55',
        height: Platform.OS == 'ios' ? 44 : 64,
        paddingTop: Platform.OS == 'ios' ? 0 : 20,
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
            screen: Publish,
        },
    },
    {
        mode: 'card',
        headerMode: 'float',
        navigationOptions,
        transitionConfig: () => ({ 
            screenInterpolator: CardStackStyleInterpolator.forHorizontal
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
