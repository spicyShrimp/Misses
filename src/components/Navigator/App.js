import React, { Component } from 'react';
import { 
    Platform, 
    BackHandler, 
    ToastAndroid, 
    StatusBar, 
    View 
} from 'react-native';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import Nav from './Nav';
import { android } from '../../configs/Device';

const addListener = createReduxBoundAddListener("root");

let lastBackPressed = null;

class App extends Component {

    componentDidMount() {
        if (android) {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    componentWillUnmount() {
        if (android) {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
            lastBackPressed = null;
        }
    }

    onBackAndroid = () => {
        const { dispatch, Navigator } = this.props;
        if (Navigator.routes[0] &&
            Navigator.routes[0].routes &&
            Navigator.routes[0].routes.length > 1) {
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
        const { dispatch, Navigator } = this.props;
        return (
            <View style={{flex: 1}}>
                <StatusBar 
                    translucent
                    backgroundColor='transparent'
                    barStyle='light-content'
                    />
                <Nav navigation={addNavigationHelpers({
                    state: Navigator,
                    dispatch,
                    addListener,
                    })}
                    />
            </View>
            
        );
    }
}

const mapStateToProps = state => ({
    Navigator: state.Navigator,
});

export default connect(mapStateToProps)(App);