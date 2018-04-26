import React, { Component } from 'react';
import {  View, Image, Text, Platform, StatusBar } from 'react-native';
import Tab from './Tab';
import Detail from '../Detail';
import Publish from '../Publish';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

const navigationOptions = {
    headerStyle: { 
        borderBottomWidth: 0,
        elevation: 0,
        backgroundColor: '#ff2d55',
        height: Platform.OS == 'ios' ? 44 : (44 + StatusBar.currentHeight),
        paddingTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
    },
    headerTitleStyle: { textAlign: 'center', flex: 1, },
    headerTintColor: '#fff',
    headerBackTitle: null,
    gesturesEnabled: false,
    // headerTitleStyle: { flex: 1, textAlign: 'center' },
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
