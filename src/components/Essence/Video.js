import React, { Component } from 'react';
import { Image, Text, View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import MasonryList from '@appandflow/masonry-list';
import PlacehoderImage from '../Base/PlacehoderImage';
import { connect } from 'react-redux';
import { loadVideoList } from '../../actions/Essence/Video';
import { width, height } from '../../configs/Device';

const itemWidth = (width - 16) / 2;

class Video extends React.Component {

    componentDidMount() {
        const {data, loadVideoList } = this.props;
        loadVideoList(data, false, 0);
    }

    render() {
        const { refreshing, np, data, loadVideoList } = this.props;
        return (
            <MasonryList
                data={data}
                numColumns={2}
                renderItem={(item) => this._renderItem(item)}
                getHeightForItem={(item) => this._getHeightForItem(item)}
                refreshing = {refreshing}
                onRefresh = {() => loadVideoList(data, false, 0)}
                onEndReachedThreshold={0.5}
                onEndReached={() => loadVideoList(data, true, np)}
            />
        )
    }

    _getHeightForItem({item}) {
        return Math.max(itemWidth, itemWidth / item.video.width * item.video.height);
    }

    _renderItem({item}) {
        const itemHeight = this._getHeightForItem({item});
        return (
            <TouchableOpacity style={styles.item}>
                <PlacehoderImage 
                    source={{uri: item.video.thumbnail[0]}}
                    placeholder={{uri: 'placeholder'}}
                    style={{width: itemWidth, height: itemHeight, borderRadius: 4,}}
                    />
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    item: {
        margin: 4,
    },
})

const mapStateToProps = state => ({
    refreshing: state.Video.refreshing,
    np: state.Video.np,
    data: state.Video.data,
});

const mapDispatchToProps = {
    loadVideoList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);