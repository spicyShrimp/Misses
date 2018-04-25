import React, { Component } from 'react';
import { Platform, BackHandler, ToastAndroid, StatusBar, View } from 'react-native';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import Nav from './Nav';

const addListener = createReduxBoundAddListener("root");

let lastBackPressed = null;

class App extends Component {

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
            lastBackPressed = null;
        }
    }

    onBackAndroid = () => {
        const { dispatch, nav } = this.props;
        if (nav.routes.length > 1) {
            dispatch( NavigationActions.back() );
            return true;
        }
        if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
            return false;
        }
        lastBackPressed = Date.now();
        ToastAndroid.show('再点击一次退出应用', ToastAndroid.SHORT); 
        return true;
    };

    render() {
        const { dispatch, nav } = this.props;
        return (
            <View style={{flex: 1}}>
                <StatusBar 
                    translucent = {true}
                    backgroundColor = 'transparent'
                    barStyle = 'light-content'
                    />
                <Nav navigation = {addNavigationHelpers({
                    state: nav,
                    dispatch,
                    addListener,
                })}/>
            </View>
            
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(App);