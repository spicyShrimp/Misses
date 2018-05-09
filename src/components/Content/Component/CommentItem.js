import React, { Component } from 'react';
import {  View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import PlacehoderImage from '../../Base/PlaceholderImage';
import PlayImage from './PlayImage';
import PropTypes from 'prop-types';

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
                    <TouchableOpacity 
                        onPress={() => this._onPressUser(item.user)}
                        style={styles.itemUser}
                        >
                        <PlacehoderImage 
                            source={{uri: item.user.profile_image}}
                            style={{width: 40, height: 40, borderRadius: 20, marginHorizontal: 10,}}
                            />
                        <Text>{item.user.username}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemSupport}>
                        <Image 
                            source={{uri: 'detail_ding'}}
                            style={{width: 20, height: 20}}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemSupport}>
                        <Image 
                            source={{uri: 'detail_cai'}}
                            style={{width: 20, height: 20}}
                            />
                    </TouchableOpacity>
                </View>
        )
    }

    _onPressUser = (user) => {
        const { onPressUser } = this.props;
        onPressUser && onPressUser(user);
    }

    _renderContent = () => {
        const { item } = this.props;
        let image ,imageWidth, imageHeigth;
        if (item.type === 'gif') {
            image = item.gif.thumbnail[0];
            imageWidth = Math.max(imageWidth, item.gif.width);
            imageHeigth = Math.max(150, imageWidth / item.gif.width * item.gif.height);
            return (
                <TouchableOpacity 
                    onPress={() => this._onPressContent(item)}
                    style={styles.itemContent}
                    >
                    <PlayImage 
                        source={{uri: image}}
                        resizeMode='contain'
                        placeholder={{uri: 'placeholder'}}
                        style={{width: imageWidth, height: imageHeigth}}
                        playSource={{uri: 'gif_play'}}
                        playStyle={styles.itemPlay}
                        hidePlay={true}
                        />
                </TouchableOpacity>
            )
        } else if (item.type === 'image') {
            image = item.image.thumbnail[0];
            imageWidth = Math.max(imageWidth, item.image.width);
            imageHeigth = Math.max(150, imageWidth / item.image.width * item.image.height);
            return (
                <TouchableOpacity 
                    onPress={() => this._onPressContent(item)}
                    style={styles.itemContent}
                    >
                    <PlacehoderImage 
                        source={{uri: image}}
                        resizeMode='contain'
                        placeholder={{uri: 'placeholder'}}
                        style={{width: imageWidth, height: imageHeigth}}
                        />
                </TouchableOpacity>
            )
        } else if (item.type === 'video') {
            image = item.video.thumbnail[0];
            return (
                <TouchableOpacity 
                    onPress={() => this._onPressContent(item)}
                    style={styles.itemContent}
                    >
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
                <TouchableOpacity 
                    onPress={() => this._onPressContent(item)}
                    style={styles.itemContent}
                    >
                    <Text>{item.content}</Text>
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
        width: 40,
        height: 40,
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

CommentItem.propTypes = {
    item: PropTypes.object.isRequired,
    onPressUser: PropTypes.func,
    onPressContent: PropTypes.func,
}
