import React, { Component } from 'react';
import {  
    SafeAreaView,
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    TextInput,
    FlatList,
} from 'react-native';
import PlacehoderImage from '../Base/PlacehoderImage';
import { width, height } from '../../configs/Device';

class PlayImage extends Component {
    constructor() {
        super();
        this.state = {
            didload: false,
        }
    }

    render () {
        const { 
            source, 
            resizeMode,
            style,
            placeholder,
            playSource,
            playStyle,
            hidePlay,
        } = this.props;

        return (
            <View>
                <PlacehoderImage
                    source={source}
                    placeholder={placeholder}
                    resizeMode={resizeMode}
                    style={style}
                    onLoad={this._onLoad}
                    />
                {(this.state.didload && !hidePlay) ? this._renderPlay() : null}
            </View>
        )
    }

    _renderPlay = () => {
        const { playSource, playStyle } = this.props;
        return (
            <PlacehoderImage 
                source={playSource}
                style={playStyle}
                />
        )
    }

    _onLoad = () => {
        this.setState({
            didload: true,
        })
    }
}


export default class ListPage extends Component {
    constructor() {
        super();
        this.state = {
            refreshing: false,
            data: [],
            np: 0,
        }
    }
    componentWillMount = () => {
        this.onRefreshing();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefreshing}
                    onEndReachedThreshold={0.5}
                    onEndReached={this._onEndReached}
                    keyExtractor={this._keyExtractor}
                    />
            </SafeAreaView>
        );
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

    _ItemSeparatorComponent = () => {
        return (
            <View style={{height: 0.5, backgroundColor: 'rgba(100,100, 100, 0.2)'}} />
        )
    }

    _keyExtractor = (item, index) => {
        return item.text + index;
    }

    _renderItemContent = (item) => {
        let image, imageWidth, imageHeight, refWidth, refHeight;
        if (item.type === 'image') {
            imageWidth = width - 20;
            image = item.image.height > imageWidth ? item.image.thumbnail_small[0] : item.image.big[0];
            imageHeight =  Math.min(imageWidth , imageWidth / item.image.width * item.image.height);
            return (
                <View>
                    <Text style={styles.itemText}>{item.text}</Text>
                    <PlacehoderImage
                        source={{uri: image}}
                        placeholder={{uri: 'placeholder'}}
                        style={{width: imageWidth, height: imageHeight}}
                        />
                </View>
            )
        } else if (item.type === 'gif') {
            image = item.gif.images[0];
            imageWidth = width - 20;
            imageHeight = imageWidth / item.gif.width * item.gif.height;
            return (
                <View>
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
                </View>
            )
        } else if (item.type === 'video') {
            image = item.video.thumbnail[0];
            imageWidth = width - 20;
            imageHeight =  Math.min(imageWidth, imageWidth / item.video.width * item.video.height);
            return (
                <View>
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
                </View>
            )
        } else {
            return (
                <View>
                    <Text style={{fontSize: 12, maxHeight: 100}}>{item.text}</Text>
                </View>
            )
        }
    }


    _renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => this._goToUser(item.u)}
                    >
                    <View style={{height: 50, marginBottom: 10, flexDirection: 'row', alignItems: 'center'}}>
                        <PlacehoderImage 
                            source={{uri:item.u.header[0]}}
                            style={{width: 30, height: 30, borderRadius: 15}}
                            />
                        <View style={{marginLeft: 10, justifyContent: 'space-evenly', height: 50}}>
                            <Text style={{fontSize: 12, color: '#000'}}>{item.u.name}</Text>
                            <Text style={{fontSize: 10, color: '#333'}}>{item.passtime}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => this._goToDetail(item)}
                    >
                    {this._renderItemContent(item)}
                </TouchableOpacity>
            </View>
            
        )
    }

    _goToUser = (user) => {
        this.props.navigation.navigate('Detail', {title: user.name});
    }

    _goToDetail = (item) => {
        this.props.navigation.navigate('Detail', {title: item.text});
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    item: {
        padding: 10,
        backgroundColor: '#fff',
    },
    itemText: {
        marginBottom: 10,
        fontSize: 12,
    },
    itemPlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -35,
        marginTop: -35,
        width: 70, 
        height: 70,
    }
})


