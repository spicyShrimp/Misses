import React, { Component } from 'react';
import { 
    Text, 
    SafeAreaView, 
    View, 
    TouchableOpacity, 
    StatusBar,
    StyleSheet
} from 'react-native';
import Video from 'react-native-video';
// import { width, height } from '../../configs/Device';
import Orientation from 'react-native-orientation';

export default class VideoDetial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orientation: 'PORTRAIT',
            // width,
            paused: false,
        }
    }

    static navigationOptions = {
        headerStyle: {display: 'none'},
    }

    componentWillMount = () => {
        StatusBar.setHidden(true, true);
        Orientation.lockToPortrait();
    }

    componentWillUnmount() {
        StatusBar.setHidden(false, true);
        Orientation.lockToPortrait();
    }
    

    render() {
        const { item } = this.props.navigation.state.params;
        console.log(item);
        return (
            <SafeAreaView style={{flex: 1}} onLayout={this._onLayout}>
                <TouchableOpacity 
                    activeOpacity={1.0}
                    onPress={this._videoOnPress}>
                    <Video 
                        source={{uri: item.video.video[0]}}
                        ref={(ref) => { this.player = ref }}
                        rate={1.0}
                        volume={1.0}
                        ignoreSilentSwitch={'ignore'}
                        muted={false}            
                        paused={this.state.paused}
                        resizeMode={'contain'}
                        repeat={true}
                        playInBackground={false}
                        playWhenInactive={false}
                        // onLoadStart={this.loadStart}
                        // onLoad={this.setDuration}
                        // onProgress={this.setTime}
                        // onEnd={this.onEnd}
                        onError={this.videoError}
                        style={{width: this.state.width, height: this.state.orientation === 'PORTRAIT' ? (this.state.width / item.video.width * item.video.height) : this.state.height}} 
                        />
                </TouchableOpacity>
                <TouchableOpacity 
                    activeOpacity={0.7}
                    style={{backgroundColor: '#f00', width: 50, height: 50, position: 'absolute', left: 20, top: 50, justifyContent: 'center', alignItems: 'center'}}
                    onPress={()=>{
                        Orientation.lockToPortrait();
                        this.props.navigation.goBack();
                    }}
                    >
                    <Text>返回</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    _onLayout = (event) => {
        const {width, height} = event.nativeEvent.layout;
        this.setState({
            width,
            height,
        })
    }
    
    _videoOnPress = () => {
        Orientation.getOrientation((err, orientation) => {
            if (orientation === 'PORTRAIT') {
                Orientation.lockToLandscape();
                this.setState({
                    orientation: 'LANDSCAPE',
                })
            } else {
                const { item } = this.props.navigation.state.params;
                Orientation.lockToPortrait();
                this.setState({
                    orientation: 'PORTRAIT',
                })
            }
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
})