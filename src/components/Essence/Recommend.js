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
import { connect } from 'react-redux';
import { width } from '../../configs/Device';
import { loadRecommendList } from '../../actions/Essence/Recommend'


class Recommend extends Component {
    componentDidMount() {
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
                    onEndReachedThreshold={0}
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

    _renderItem({item}) {
        if (item.type === 'text') {
            return (
                <TouchableOpacity 
                    activeOpacity={0.7}
                    style={styles.item}
                    onPress={() => this.goToDetail(item)}
                >
                    <View style={styles.itemText}>
                        <Text>{item.text}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else if (item.type === 'gif') {
            return (
                <TouchableOpacity 
                    activeOpacity={0.7}
                    style={styles.item}
                    onPress={() => this.goToDetail(item)}
                >
                    <View style={styles.itemImage}>
                        <Image 
                            source={{uri: item.gif.images[0]}}
                            style={{width: width-20, height: width / item.gif.width * item.gif.height}} 
                        />
                    </View>
                </TouchableOpacity>
            )
        } else if (item.type === 'video') {
            return (
                <TouchableOpacity 
                    activeOpacity={0.7}
                    style={styles.item}
                    onPress={() => this.goToDetail(item)}
                >
                    <View style={styles.itemVideo}>
                        <Text style={{marginBottom: 10}}>{item.text}</Text>
                        <Image 
                            source={{uri: item.video.thumbnail[0]}}
                            style={{width: width-20, height: width / item.video.width * item.video.height}} 
                        />
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity 
                    activeOpacity={0.7}
                    style={styles.item}
                    onPress={() => this.goToDetail(item)}
                >
                    <View style={styles.itemText}>
                        <Text>{item.text}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
		
    }

    goToDetail(item) {
        this.props.navigation.navigate('Detail', {title: item.theme_name});
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    item: {
        // alignItems: 'center',
        // backgroundColor: '#fff',
        padding: 10,
    },
    itemText: {

    },
    itemImage: {

    },
    itemVideo: {

    },
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
  
