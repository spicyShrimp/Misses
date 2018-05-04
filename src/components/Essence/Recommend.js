import React, { Component } from 'react';
import {  
    SafeAreaView,
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    TextInput,
    FlatList,
    Image,
} from 'react-native';
import PlacehoderImage from '../Base/PlacehoderImage';
import { connect } from 'react-redux';
import { width, height } from '../../configs/Device';
import { loadRecommendList } from '../../actions/Essence/Recommend'

class PlayImage extends Component {
    constructor() {
        super();
        this.state = {
            didLoad: false,
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
                    onLoad={() => this._onLoad()}
                    />
                <Image 
                    source={playSource}
                    style={hidePlay ? (this.state.didLoad ? {opacity: 0} : playStyle) : playStyle}
                    />
            </View>
        )
    }

    _onLoad() {
        this.setState({
            didLoad: true,
        })
    }
}


class Recommend extends Component {
    componentWillMount() {
        const {data, loadRecommendList } = this.props;
        loadRecommendList(data, false, 0);
    }

    render() {
        const { refreshing, np, data, loadRecommendList } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={(props) => this._renderItem(props)}
                    ItemSeparatorComponent={() => this._ItemSeparatorComponent()}
                    refreshing={refreshing}
                    onRefresh={() => loadRecommendList(data, false, 0)}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => loadRecommendList(data, true, np)}
                    keyExtractor={(item, index) => this._keyExtractor(item, index)}
                    />
            </SafeAreaView>
        );
    }

    _ItemSeparatorComponent() {
        return (
            <View style={{height: 0.5, backgroundColor: 'rgba(100,100, 100, 0.2)'}} />
        )
    }

    _keyExtractor(item, index) {
        return item.text + index;
    }

    _renderItemContent(item) {
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
                    <Text style={{fontSize: 12}}>{item.text}</Text>
                </View>
            )
        }
    }


    _renderItem({item}) {
        return (
            <View style={styles.item}>
                <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => this._goToUser(item.u)}
                    >
                    <View style={{height: 50, marginBottom: 10, flexDirection: 'row', alignItems: 'center'}}>
                        <Image 
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

    _goToUser(user) {
        this.props.navigation.navigate('Detail', {title: user.name});
    }

    _goToDetail(item) {
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

const mapStateToProps = state => ({
    refreshing: state.Recommend.refreshing,
    np: state.Recommend.np,
    data: state.Recommend.data,
});

const mapDispatchToProps = {
    loadRecommendList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
  
