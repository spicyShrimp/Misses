import React, { Component } from 'react';
import {  View, Text, WebView, SafeAreaView } from 'react-native';

export default class WebPage extends Component {
    render() {
        const { source } = this.props.navigation.state.params;
        return (
        <SafeAreaView style={{flex: 1}}>
            <WebView 
                source={source}
                style={{flex: 1}}
                scalesPageToFit={true}
                mediaPlaybackRequiresUserAction={true}
                />
        </SafeAreaView>
        );
    }
}