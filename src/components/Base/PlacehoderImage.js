import React, { Component } from 'react'
import { ImageBackground, Image } from 'react-native'
import FastImage from 'react-native-fast-image'

export default class PlacehoderImage extends Component {
    constructor() {
        super();
        this.state = {
            mDidLoad: false,
        }
    }
    render() {
        const {source, style, placeholder, resizeMode } = this.props;
        if (placeholder) {
            return (
                <ImageBackground
                    source={this.state.mDidLoad ? {uri:'clear_placeholder'} : placeholder}
                    resizeMode={FastImage.resizeMode.center}
                    style={style}
                    >
                    <FastImage 
                        source={source}
                        resizeMode={resizeMode || FastImage.resizeMode.cover}
                        style={style}
                        
                        onLoadStart={this._onLoadStart}
                        onProgress={this._onProgress}
                        onLoad={this._onLoad}
                        onError={this._onError}
                        onLoadEnd={this._onLoadEnd}
                        onLayout={this._onLayout}
                        />       
                </ImageBackground>
            )
        } else {
            return (
                <FastImage 
                    source={source}
                    resizeMode={resizeMode || FastImage.resizeMode.cover}
                    style={style}

                    onLoadStart={this._onLoadStart}
                    onProgress={this._onProgress}
                    onLoad={this._onLoad}
                    onError={this._onError}
                    onLoadEnd={this._onLoadEnd}
                    onLayout={this._onLayout}
                    /> 
            )
        }
    }

    _onLoadStart = () => {
        const { onLoadStart } = this.props;
        onLoadStart && onLoadStart();
    }

    _onProgress = () => {
        const { onProgress } = this.props;
        onProgress && onProgress();   
    }

    _onLoad = () => {
        this.setState({
            mDidLoad: true,
        })
        const { onLoad } = this.props;
        onLoad && onLoad();
    }

    _onError = () => {
        const { onError } = this.props;
        onError && onError();
    }

    _onLoadEnd = () => {
        const { onLoadEnd } = this.props;
        onLoadEnd && onLoadEnd();
    }

    _onLayout = () => {
        const { onLayout } = this.props;
        onLayout && onLayout();
    }
}