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
} from 'react-native';
import MSVideo from '../Base/MSVideo';
import { width, height, statusBarHeight } from '../../configs/Device';
import Orientation from 'react-native-orientation';
import API from '../../configs/API';
import PlayImage from '../Base/PlayImage';
import PlacehoderImage from '../Base/PlacehoderImage';
import CommentItem from './CommentItem';
import NavItem from '../Navigator/NavItem';

export default class VideoDetial extends Component {
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
    }

    componentDidMount = () => {
        this._onRefrsh();
    };
    

    componentWillUnmount() {
        StatusBar.setHidden(false, false);
        Orientation.lockToPortrait();
    }
    

    render() {
        const { navOpciaty, portrait, refreshing, data } = this.state;
        return (
            <View style={{flex: 1}}>
                <FlatList 
                    ref={ref => this.flatList = ref}
                    data={data}
                    scrollEnabled={portrait}
                    ListHeaderComponent={this._ListHeaderComponent}
                    renderItem={this._renderItem}
                    refreshing={refreshing}
                    onRefresh={this._onRefrsh}
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
        return (
            <View>
                <MSVideo
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
            <CommentItem item={item} />
        )
    }

    _ItemSeparatorComponent = () => {
        return (
            <View style={{height: 0.5, backgroundColor: 'rgba(100,100, 100, 0.2)'}} />
        )
    }

    _keyExtractor = (item, index) => {
        return index + '';
    }

    _onRefrsh = () => {
        const { item } = this.props.navigation.state.params;
        // this.setState({refreshing: true});
        fetch(API.comment(item.id, this.state.np))
        .then((response) => response.json())
        .then((jsonData) => {
            console.log(jsonData);
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
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    navBar: {
        position: 'absolute', 
        flexDirection: 'row', 
        width, 
        height: 44,
        alignItems: 'center',
    }

})