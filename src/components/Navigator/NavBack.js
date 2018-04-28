import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class NavBack extends Component {
    onBack() {
        const { dispatch } = this.props;
        dispatch( NavigationActions.back() );
    };

    render() {
        const { backStyle } = this.props;
        return (
            <TouchableOpacity 
                style={backStyle ? backStyle : styles.back}
                onPress={() => this.onBack()}
            >
                <Image 
                    source={{uri: 'nav_back'}} 
                    style={{width: 12, height:20}} 
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    back: {
        width: 40, 
        height:40, 
        justifyContent: 'center', 
        alignItems: 'center',
    }
})

export default connect()(NavBack);
