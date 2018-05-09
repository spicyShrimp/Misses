import React, { Component } from 'react';
import {  View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PlacehoderImage from '../../Base/PlaceholderImage';
import PlayImage from './PlayImage';
import { width, height } from '../../../configs/Device';
import PropTypes from 'prop-types';

export default class ListItem extends Component {
    render() {
        return (
            <View style={styles.item}>
                {this._renderHeader()}
                {this._renderContent()}
            </View>
        )
    }

    _renderHeader = () => {
        const { item } = this.props;
        return (
            <TouchableOpacity 
                onPress={() => this._onPressHeader(item.u)}
                style={styles.itemHeader}>
                <PlacehoderImage 
                    source={{uri: item.u.header[0]}}
                    style={styles.headerUser}
                    />
                <View style={styles.headerName}>
                    <Text style={{fontSize: 12, color: '#0073c1'}}>{item.u.name}</Text>
                    <Text style={{fontSize: 10, color: '#333'}}>{item.passtime}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _onPressHeader = (user) => {
        const { onPressHeader } = this.props;
        onPressHeader && onPressHeader(user);
    }

    _renderContent = () => {
        const { item } = this.props;
        let image, imageWidth, imageHeight, refWidth, refHeight;
        if (item.type === 'image') {
            imageWidth = width - 20;
            image = item.image.height > imageWidth ? item.image.thumbnail_small[0] : item.image.big[0];
            imageHeight =  Math.min(imageWidth , imageWidth / item.image.width * item.image.height);
            return (
                <TouchableOpacity onPress={() => this._onPressContent(item)}>
                    <Text style={styles.itemText}>{item.text}</Text>
                    <PlacehoderImage
                        source={{uri: image}}
                        placeholder={{uri: 'placeholder'}}
                        style={{width: imageWidth, height: imageHeight}}
                        />
                </TouchableOpacity>
            )
        } else if (item.type === 'gif') {
            image = item.gif.images[0];
            imageWidth = width - 20;
            imageHeight = imageWidth / item.gif.width * item.gif.height;
            return (
                <TouchableOpacity onPress={() => this._onPressContent(item)}>
                    <Text style={styles.itemText}>{item.text}</Text>
                    <PlayImage 
                        source={{uri: image}}
                        resizeMode='contain'
                        placeholder={{uri: 'placeholder'}}
                        style={{width: imageWidth, height: imageHeight}}
                        playSource={{uri: 'gif_play'}}
                        playStyle={styles.itemPlay}
                        hidePlay
                        />
                </TouchableOpacity>
            )
        } else if (item.type === 'video') {
            image = item.video.thumbnail[0];
            imageWidth = width - 20;
            imageHeight =  Math.min(imageWidth, imageWidth / item.video.width * item.video.height);
            return (
                <TouchableOpacity onPress={() => this._onPressContent(item)}>
                    <Text style={styles.itemText}>{item.text}</Text>
                    <PlayImage 
                        source={{uri: image}}
                        resizeMode='contain'
                        placeholder={{uri: 'placeholder'}}
                        style={{width: imageWidth, height: imageHeight}}
                        playSource={{uri: 'video_play'}}
                        playStyle={styles.itemPlay}
                        hidePlay={false}
                        />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this._onPressContent(item)}>
                    <Text style={{fontSize: 12, maxHeight: 100}}>{item.text}</Text>
                </TouchableOpacity>
            )
        }       
    }

    _onPressContent = (item) => {
        const { onPressContent } = this.props;
        onPressContent && onPressContent(item);
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
    },
    itemHeader: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerUser: {
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        marginHorizontal: 10
    },
    headerName: {
        marginLeft: 10, 
        justifyContent: 'space-evenly', 
        height: 50
    },
    itemContent: {
        margin: 10, 
        marginLeft: 60,
    },
    itemPlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -35,
        marginTop: -35,
        width: 70, 
        height: 70,
    },
    itemText: {
        marginBottom: 10,
        fontSize: 12,
    },
})

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
    onPressHeader: PropTypes.func,
    onPressContent: PropTypes.func,
}
