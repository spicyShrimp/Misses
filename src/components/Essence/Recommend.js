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
            <View style={{height: 0.5, marginLeft: 15, backgroundColor: 'rgba(100,100, 100, 0.2)'}} />
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
                    <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>{item.text}</Text>
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
                    <Image 
                        source={{uri: item.gif.images[0]}}
                        style={{width: item.gif.width, height: item.gif.height}} />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity 
                    activeOpacity={0.7}
                    style={styles.item}
                    onPress={() => this.goToDetail(item)}
                >
                    <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>{item.text}</Text>
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
    input: {
        flex: 1, 
        height: 30,
        padding: 0,
        paddingLeft: 10,
        marginHorizontal: 10, 
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    item: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
    },
    itemImage: {
        width: 60,
        height: 60,
    },
    itemContent: {
        flex: 1,
        height: 80, 
        marginHorizontal: 10,
        justifyContent: 'space-evenly',
    },
    itemTitle: {
        fontSize: 16,
        color: '#000',
    },
    itemSubTitle: {
        color: '#aaa',
        fontSize: 12,
    },
    itemDesc: {
        color: '#aaa',
        fontSize: 12,
    }
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
  
