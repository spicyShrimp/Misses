import React, { Component } from 'react';
import {SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MasonryList from '@appandflow/masonry-list';
import PlacehoderImage from '../Base/PlacehoderImage';
import { width, height } from '../../configs/Device';

const itemWidth = (width - 16) / 2;

export default class WaterfallPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            data: [],
            np: 0,
        }
    }

    componentDidMount = () => {
        this.onRefreshing();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <MasonryList
                    data={this.state.data}
                    numColumns={2}
                    renderItem={this._renderItem}
                    getHeightForItem={this._getHeightForItem}
                    refreshing = {this.state.refreshing}
                    onRefresh = {this.onRefreshing}
                    onEndReachedThreshold={0.5}
                    onEndReached={this._onEndReached}
                    keyExtractor={this._keyExtractor}
                />
            </SafeAreaView>
        )
    }

    onRefreshing = () => {
        this.setState({
            refreshing: true,
        })
        const { api } = this.props;
        fetch(api + '0-20.json')
        .then((response) => response.json())
        .then((jsonData) => {
            this.setState({
                refreshing: false,
                data: jsonData.list,
                np: jsonData.info.np || 0,
    
            })
        });
    }

    _onEndReached = () => {
        const { api } = this.props;
        fetch(api + this.state.np + '-20.json')
        .then((response) => response.json())
        .then((jsonData) => {
            this.setState({
                data: [...this.state.data, ...jsonData.list],
                np: jsonData.info.np,
            })
        });
    }

    _keyExtractor = (item, index) => {
        return item.text + index;
    }

    _getHeightForItem = ({item}) => {
        return Math.max(itemWidth, itemWidth / item.video.width * item.video.height);
    }

    _renderItem = ({item}) => {
        const itemHeight = this._getHeightForItem({item});
        return (
            <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => this._onPress(item)}
                style={styles.item}>
                <PlacehoderImage 
                    source={{uri: item.video.thumbnail[0]}}
                    placeholder={{uri: 'placeholder'}}
                    style={{width: itemWidth, height: itemHeight, borderRadius: 4}}
                    />
            </TouchableOpacity>
        )
    }

    _onPress = (item) => {
        this.props.navigation.navigate('VideoDetail', {item});
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    item: {
        margin: 4,
    },
})