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
            portrait: true,
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
        StatusBar.setHidden(false, false);
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
        const { navOpciaty } = this.state;
        return (
            <View style={{flex: 1}}>
                <FlatList 
                    ref={ref => this.flatList = ref}
                    data={this.state.data}
                    scrollEnabled={this.state.portrait}
                    ListHeaderComponent={this._ListHeaderComponent}
                    renderItem={this._renderItem}
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefrsh}
                    onEndReachedThreshold={0.5}
                    onEndReached={this._onEndReached}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    keyExtractor={this._keyExtractor}
                    stickySectionHeadersEnabled={false}
                    onScroll={this._onScroll}
                    />
                <View style={[styles.navBar, {backgroundColor: 'rgba(255,45,85,' + navOpciaty + ')'}]}>
                    <NavItem 
                        source={{uri: 'nav_back'}} 
                        onPress={() => {
                            Orientation.lockToPortrait();
                            this.props.navigation.goBack();
                        }}
                        />,
                </View>
                
            </View>
        )
    }

    _ListHeaderComponent = () => {
        const { item } = this.props.navigation.state.params;
        return (
            <View>
                <MSVideo
                    ref={ref => this.video = ref}
                    source={{uri: item.video.video[0]}}
                    style={{
                        width: width, 
                        height: (width / item.video.width * item.video.height)
                    }}
                    onPress={this._onPress}
                    toogleFullScreen={this._toogleFullScreen}
                    tooglePlay={this._tooglePlay}
                />
            </View>
            
        )
    }

    _onPress = () => {
        this.video._tooglePlay();
    }
    _tooglePlay = (paused) => {
        console.log(paused);
    }

    _toogleFullScreen =(portrait) => {
        if (!portrait) {
            this.flatList.scrollToOffset(0, false);
        }
        this.setState({portrait});
        StatusBar.setHidden(!portrait, false);
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
        this.setState({refreshing: true});
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
        height: statusBarHeight + 44, 
        paddingTop: statusBarHeight, 
        alignItems: 'center',
    }

})