import React, { Component } from 'react';
import {  View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PlacehoderImage from '../../Base/PlaceholderImage';
import PlayImage from './PlayImage';

export default class CommentItem extends Component {
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
            <View style={styles.itemHeader}>
                    <TouchableOpacity style={styles.itemUser}>
                            <PlacehoderImage 
                                source={{uri: item.user.profile_image}}
                                style={{width: 40, height: 40, borderRadius: 20, marginHorizontal: 10,}}
                                />
                            <Text>{item.user.username}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemSupport}>
                            <Text>好评</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemSupport}>
                            <Text>差评</Text>
                    </TouchableOpacity>
                </View>
        )
    }

    _renderContent = () => {
        const { item } = this.props;
        let image;
        if (item.type === 'gif') {
            image = item.gif.thumbnail[0];
            return (
                <TouchableOpacity style={styles.itemContent}>
                    <PlayImage 
                        source={{uri: image}}
                        resizeMode='contain'
                        placeholder={{uri: 'placeholder'}}
                        style={{width: item.gif.width, height: item.gif.height}}
                        playSource={{uri: 'gif_play'}}
                        playStyle={styles.itemPlay}
                        hidePlay={true}
                        />
                </TouchableOpacity>
            )
        } else if (item.type === 'image') {
            image = item.image.thumbnail[0];
            return (
                <TouchableOpacity style={styles.itemContent}>
                    <PlacehoderImage 
                        source={{uri: image}}
                        resizeMode='contain'
                        placeholder={{uri: 'placeholder'}}
                        style={{width: item.image.width, height: item.image.height}}
                        />
                </TouchableOpacity>
            )
        } else if (item.type === 'video') {
            image = item.video.thumbnail[0];
            return (
                <TouchableOpacity style={styles.itemContent}>
                    <PlayImage 
                        source={{uri: image}}
                        resizeMode='contain'
                        placeholder={{uri: 'placeholder'}}
                        style={{width: 150, height: 150}}
                        playSource={{uri: 'video_play'}}
                        playStyle={styles.itemPlay}
                        hidePlay={false}
                        />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.itemContent}>
                    <Text>{item.content}</Text>
                </TouchableOpacity>
            )
        }        
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
    },
    itemHeader: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemUser: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    itemSupport: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
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
})
