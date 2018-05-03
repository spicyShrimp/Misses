import React, { Component } from 'react';
import {  View, Text, WebView, SafeAreaView } from 'react-native';

export default class Web extends Component {
    render() {
        return (
        <SafeAreaView style={{flex: 1}}>
            <WebView></WebView>
        </SafeAreaView>
        );
    }
}
