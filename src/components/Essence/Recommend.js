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
    ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { width, height } from '../../configs/Device';
import { loadRecommendList } from '../../actions/Essence/Recommend'

class Recommend extends Component {
    componentWillMount() {
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

    _renderItemContent(item) {
        let image, imageWidth, imageHeight, refWidth, refHeight;
        if (item.type === 'gif') {
            image = item.gif.images[0];
            refWidth = item.gif.width;
            refHeight = item.gif.height;
        }
        if (item.type === 'image') {
            image = item.image.big[0];
            refWidth = item.image.width;
            refHeight = item.image.height;
        }
        if (item.type === 'video') {
            image = item.video.thumbnail[0];
            refWidth = item.video.width;
            refHeight = item.video.height;
        }

        if (image != undefined || image != null) {
            imageWidth = width - 20;
            imageHeight = imageWidth / refWidth * refHeight;
            if (imageHeight > height) {
                imageHeight = height;
                imageWidth = imageHeight / refHeight * refWidth;
            }
            return (
                <View>
                    <Text style={styles.itemText}>{item.text}</Text>
                    <Image
                        source={{uri: image}}
                        resizeMode='contain'
                        defaultSource={{uri: 'placeholder'}}
                        style={{width: imageWidth, height: imageHeight, alignSelf: 'center'}}
                        />
                </View>
            )
        } else {
            return (
                <View>
                    <Text style={{fontSize: 12}}>{item.text}</Text>
                </View>
            )
        }
    }


    _renderItem({item}) {
        return (
            <View style={styles.item}>
                <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => this._goToUser(item.u)}
                    >
                    <View style={{height: 50, marginBottom: 10, flexDirection: 'row', alignItems: 'center'}}>
                        <Image 
                            source={{uri:item.u.header[0]}}
                            style={{width: 30, height: 30, borderRadius: 15}}
                            />
                        <View style={{marginLeft: 10, justifyContent: 'space-evenly', height: 50}}>
                            <Text style={{fontSize: 12, color: '#000'}}>{item.u.name}</Text>
                            <Text style={{fontSize: 10, color: '#333'}}>{item.passtime}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => this._goToDetail(item)}
                    >
                    {this._renderItemContent(item)}
                </TouchableOpacity>
            </View>
            
        )
    }

    _goToUser(user) {
        this.props.navigation.navigate('Detail', {title: user.name});
    }

    _goToDetail(item) {
        this.props.navigation.navigate('Detail', {title: item.text});
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    item: {
        padding: 10,
        backgroundColor: '#fff',
    },
    itemText: {
        marginBottom: 10,
        fontSize: 12,
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
  
