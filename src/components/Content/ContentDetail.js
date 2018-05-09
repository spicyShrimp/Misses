
import React, { Component } from 'react';
import { 
    Text, 
    SafeAreaView, 
    View, 
    TouchableOpacity, 
    StatusBar,
    StyleSheet,
    FlatList,
    Image, 
    WebView,
} from 'react-native';
import Orientation from 'react-native-orientation';
import { width, height, statusBarHeight } from '../../configs/Device';
import API from '../../configs/API';
import NavItem from '../Navigator/NavItem';
import PlacehoderImage from '../Base/PlaceholderImage';
import VideoPlayer from '../Base/VideoPlayer';
import PlayImage from './Component/PlayImage';
import CommentItem from './Component/CommentItem';

export default class ContentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portrait: Orientation.getInitialOrientation == 'PORTRAIT',
            navOpciaty:0,

            refreshing: false,
            data: [],
            np: 0,
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerStyle: { display: 'none'},
        }
    }

    componentWillMount = () => {
        StatusBar.setHidden(true, false);
        Orientation.lockToPortrait();
        this.setState({portrait: true})
        this._onRefrsh(false);
    }

    componentWillUnmount() {
        StatusBar.setHidden(false, false);
        Orientation.lockToPortrait();
    }
    

    render() {
        const { navOpciaty, portrait, refreshing, data } = this.state;
        return (
            <View style={styles.container}>
                <FlatList 
                    ref={ref => this.flatList = ref}
                    data={data}
                    scrollEnabled={portrait}
                    ListHeaderComponent={this._ListHeaderComponent}
                    renderItem={this._renderItem}
                    refreshing={refreshing}
                    onRefresh={() => this._onRefrsh(true)}
                    onEndReachedThreshold={0.5}
                    onEndReached={this._onEndReached}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    keyExtractor={this._keyExtractor}
                    stickySectionHeadersEnabled={false}
                    onScroll={this._onScroll}
                    />
                <View style={portrait ? [styles.navBar, {backgroundColor: 'rgba(255,255,255,' + navOpciaty + ')'}] : {display: 'none'}}>
                    <NavItem 
                        source={{uri: 'detail_back'}} 
                        onPress={this._onPressBack}
                        />
                    <NavItem 
                        source={{uri: 'detail_ding'}}
                        />
                    <NavItem 
                        source={{uri: 'detail_cai'}}
                        />
                    <NavItem 
                        source={{uri: 'detail_share'}}
                        />
                </View>
                
            </View>
        )
    }

    _onPressBack = () => {
        if (this.state.portrait) {
            this.props.navigation.goBack();
        } else {
            this._onToggleFullScreen();
        }
    }

    _ListHeaderComponent = () => {
        const { item } = this.props.navigation.state.params;
        const { portrait } = this.state;
        console.log(item);
        if (item.type === 'video') {
            return (
                <View style={{marginBottom: 20, backgroundColor: '#fff'}}>
                    <VideoPlayer
                        endWithThumbnail={true}
                        thumbnail={{uri: item.video.thumbnail[0]}}
                        portrait={portrait}
                        ref={ref => this.video = ref}
                        video={{uri: item.video.video[0]}}
                        videoWidth={portrait ? width : height}
                        videoHeight={portrait ? (width / item.video.width * item.video.height): width}
                        onToggleFullScreen={this._onToggleFullScreen}
                        autoplay={true}
                        loop={true}
                        />
                </View>
                
            )
        } else if (item.type === 'image') {
            if (item.image.height > 10000) {
                return (
                    <View style={{paddingTop: 44, marginBottom: 20, backgroundColor: '#fff'}}>
                        <WebView 
                        source={{uri: item.image.big[0]}}
                        resizeMode={'contain'}
                        style={{width, height: width / item.image.width * item.image.height}}
                        />
                    </View>
                )
            } else {
                return (
                    <View style={{paddingTop: 44, marginBottom: 20, backgroundColor: '#fff'}}>
                        <PlacehoderImage 
                            source={{uri: item.image.big[0]}}
                            resizeMode={'contain'}
                            style={{width, height: width / item.image.width * item.image.height}}
                            placeholder={{uri: 'placeholder'}}
                            />
                    </View>
                )
            }
        } else if (item.type === 'gif') {
            return (
                <View style={{marginBottom: 20, backgroundColor: '#fff'}}>
                    <PlayImage 
                        source={{uri: item.gif.images[0]}}
                        resizeMode={'contain'}
                        style={{width, height: width / item.gif.width * item.gif.height}}
                        placeholder={{uri: 'placeholder'}}
                        playSource={{uri: 'gif_play'}}
                        playStyle={styles.itemPlay}
                        hidePlay={true}
                        />
                </View>
            )
        } else {
            return (
                <View style={{padding: 20, paddingTop: 44, marginBottom: 20, backgroundColor: '#fff'}}>
                    <Text style={{fontSize: 22}}>{item.text}</Text>
                </View>
            )
        }
    }

    _onToggleFullScreen =() => {
        const { portrait } = this.state;
        if (portrait) {
            Orientation.lockToLandscapeLeft();
        } else {
            Orientation.lockToPortrait();
        }
        this.setState({portrait: !portrait});
        setTimeout(() => {
            this.flatList.scrollToOffset(0, true);
        }, 0);
    }

    _renderItem = ({item}) => {
        return (
            <CommentItem 
                item={item} 
                onPressUser={this._onPressUser}
                onPressContent={this._onPressContent}
                />
        )
    }

    _onPressUser = (user) => {
        this.props.navigation.navigate('Detail', {user});
    }

    _onPressContent = (item) => {
        if (item.type === 'video') {
            this.props.navigation.navigate('ContentDetail', {item});
        }
    }

    _ItemSeparatorComponent = () => {
        return (
            <View style={styles.itemSep} />
        )
    }

    _keyExtractor = (item, index) => {
        return index + '';
    }

    _onRefrsh = (refreshing) => {
        const { item } = this.props.navigation.state.params;
        this.setState({refreshing});
        fetch(API.comment(item.id, this.state.np))
        .then((response) => response.json())
        .then((jsonData) => {
            this.setState({
                refreshing: false,
                data: jsonData.normal.list,
                np: jsonData.normal.info.np || 0,
    
            })
        });
    }

    _onEndReached = () => {
        if (this.state.np == 0) {
            return;
        }
        const { item } = this.props.navigation.state.params;
        fetch(API.comment(item.id, this.state.np))
        .then((response) => response.json())
        .then((jsonData) => {
            this.setState({
                data: [...this.state.data, ...jsonData.normal.list],
                np: jsonData.normal.info.np || 0,
            })
        });
    }

    _onScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const navOpciaty = Math.min(1, offsetY / (statusBarHeight + 44));
        this.setState({
            navOpciaty,
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    navBar: {
        position: 'absolute', 
        flexDirection: 'row', 
        width, 
        height: 44,
        alignItems: 'center',
    },
    itemSep: {
        height: 0.5, 
        backgroundColor: 'rgba(100,100, 100, 0.2)'
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