import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

export default class NavItem extends Component {
    render() {
        const { style, source, onPress } = this.props;
        return (
            <TouchableOpacity 
                style={style ? style : styles.item}
                onPress={onPress ? () => onPress() : null}
                >
                <Image 
                    resizeMode='contain'
                    source={source ? source : {uri: 'nav_back'}} 
                    style={styles.image} 
                    />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        width: 44, 
        height:44, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    image: {
        width: 20,
        height:20,
    }
})

