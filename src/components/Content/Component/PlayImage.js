import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import PlacehoderImage from '../../Base/PlaceholderImage';

export default class PlayImage extends Component {
    constructor(props) {
        super(props);
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
            <View style={[style, {overflow: 'hidden'}]}>
                <PlacehoderImage
                    source={source}
                    placeholder={placeholder}
                    resizeMode={resizeMode}
                    style={styles.content}
                    onLoad={this._onLoad}
                    />
                {(!this.state.didload || !hidePlay) ? this._renderPlay() : null}
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

const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
})
