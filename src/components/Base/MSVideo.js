import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    StatusBar, 
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import {width, height} from '../../configs/Device';

export default class MSVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orientation: Orientation.getInitialOrientation(),
            paused: false,
        }
    }

    render() {
        const { source, style, onPress } = this.props;
        return (
            <TouchableOpacity 
                    activeOpacity={1.0}
                    // onPress={onPress}
                    >
                    <Video 
                        source={source}
                        ref={(ref) => this.player = ref}
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
                        onEnd={this._onEnd}
                        onError={this._onError}
                        style={this.state.orientation == 'PORTRAIT' ? style : {width: height, height: width}} 
                        />
                        <View style={styles.toolBar}>
                            <TouchableOpacity 
                                onPress={this._tooglePlay}
                                style={{
                                height: 30, 
                                flex: 1, 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                backgroundColor: '#f00',
                                }}>
                                <Text>{this.state.paused ? '播放' : '暂停'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={this._toogleFull}
                                style={{
                                height: 30, 
                                flex: 1, 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                backgroundColor: '#f00',
                                }}>
                                <Text>全屏</Text>
                            </TouchableOpacity>
                        </View>
                </TouchableOpacity>
        )
    }

    _tooglePlay = () => {
        this.setState({
            paused: !this.state.paused,
        })
    }

    _toogleFull = () => {
        Orientation.getOrientation((err, orientation) => {
            StatusBar.setHidden(true, false);
            if (orientation === 'PORTRAIT') {
                Orientation.lockToLandscape();
                this.setState({
                    orientation: 'LANDSCAPE',
                })
            } else {
                StatusBar.setHidden(false, false);
                Orientation.lockToPortrait();
                this.setState({
                    orientation: 'PORTRAIT',
                })
            }
        })
    }

    _onLoadStart = () => {

    }

    _onLoad = () => {

    }

    _onProgress = () => {

    }

    _onEnd = () => {

    }

    _onError = () => {

    }
}

const styles = StyleSheet.create({
    toolBar: {
        position: 'absolute',
        flexDirection: 'row',
        height: 30,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#ff0',
    }
})