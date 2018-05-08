import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Slider,
    StatusBar, 
} from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import {width, height} from '../../configs/Device';

export default class MSVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portrait: Orientation.getInitialOrientation() == 'PORTRAIT',
            paused: false,
            currentTime: 0,
            duration: 0,
            onValueChange: 0,
        }
    }

    render() {
        const { source, style, onPress } = this.props;
        return (
            <TouchableOpacity 
                activeOpacity={1.0}
                onPress={this._onPress}
                >
                <Video 
                    source={source}
                    ref={ref => this.player = ref}
                    rate={1.0}
                    volume={1.0}
                    ignoreSilentSwitch={'ignore'}
                    muted={false}            
                    paused={this.state.paused}
                    resizeMode={'contain'}
                    repeat={true}
                    playInBackground={false}
                    playWhenInactive={false}
                    onLoadStart={this._onLoadStart}
                    onLoad={this._onLoad}
                    onProgress={this._onProgress}
                    onSeek={this._onSeek}
                    onEnd={this._onEnd}
                    onError={this._onError}
                    style={this.state.portrait ? style : {width: height, height: width}} 
                    />
                <View style={styles.toolBar}>
                    <TouchableOpacity 
                        onPress={this._tooglePlay}
                        style={styles.toolBarButton}
                        >
                        <Text style={{color: '#fff'}}>{this.state.paused ? '播放' : '暂停'}</Text>
                    </TouchableOpacity>
                    <Slider 
                        ref={ref => this.slider = ref}
                        style={styles.toolBarSlider}
                        onValueChange={this._onValueChange}
                        onSlidingComplete={this._onSlidingComplete}
                        value={this.state.onValueChange || this.state.currentTime}
                        maximumValue={this.state.duration}
                        />
                    <TouchableOpacity 
                        onPress={this._toogleFullScreen}
                        style={styles.toolBarButton}
                        >
                        <Text style={{color: '#fff'}}>{this.state.portrait ? '全屏' : '标准'}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    _onPress = () => {
        const { onPress } = this.props;
        onPress && onPress();
    }

    _tooglePlay = () => {
        const { paused } = this.state;
        const { tooglePlay } = this.props;
        this.setState({
            paused: !paused,
        })
        tooglePlay && tooglePlay(!paused)
        
    }

    _toogleFullScreen = () => {
        let { portrait } = this.state;
        const { toogleFullScreen } = this.props;

        if (portrait) {
            Orientation.lockToLandscape();
        } else {
            Orientation.lockToPortrait();
        }
        this.setState({portrait: !portrait});
        toogleFullScreen && toogleFullScreen(!portrait);
    }

    _onValueChange = (value) => {
        this.setState({
            onValueChange: value,
        })
    }
    
    _onSlidingComplete = (value) => {
        this.player.seek(value);
    }

    _onSeek = () => {
        this.setState({
            onValueChange: 0,
        })
    }

    _onLoadStart = () => {

    }

    _onLoad = ({duration}) => {
        this.setState({
            duration,
        })
    }

    _onProgress = ({currentTime ,playableDuration}) => {
        this.setState({
            currentTime,
        })
    }

    _onEnd = () => {
        this.setState({
            currentTime: 0,
            paused: true,
        }) 
    }

    _onError = () => {
        this.setState({
            currentTime: 0,
            paused: true,
        })
    }
}

MSVideo.propTypes = {
    source: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
    toogleFullScreen: PropTypes.func,
    tooglePlay: PropTypes.func,
    onPress: PropTypes.func,
};


const styles = StyleSheet.create({
    toolBar: {
        position: 'absolute',
        flexDirection: 'row',
        height: 50,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 10,
        alignItems: 'center',
    },
    toolBarSlider: {
        flex: 1,
        height: '100%',
        marginHorizontal: 10,
    },
    toolBarButton: {
        height: '100%', 
        width: 40, 
        justifyContent: 'center', 
        alignItems: 'center',
    }
})