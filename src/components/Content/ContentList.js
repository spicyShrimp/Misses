import React, { Component } from 'react';
import {  
    SafeAreaView,
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    TextInput,
    FlatList,
} from 'react-native';
import ListItem from './Component/ListItem';
import PlacehoderImage from '../Base/PlaceholderImage';
import PlayImage from './Component/PlayImage';
import { width, height } from '../../configs/Device';

export default class ContentList extends Component {
    constructor() {
        super();
        this.state = {
            refreshing: false,
            data: [],
            np: 0,
        }
    }
    componentWillMount = () => {
        this.onRefreshing();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefreshing}
                    onEndReachedThreshold={0.5}
                    onEndReached={this._onEndReached}
                    keyExtractor={this._keyExtractor}
                    />
            </SafeAreaView>
        );
    }

    onRefreshing = () => {
        this.setState({
            refreshing: true,
        })
        const { api } = this.props;
        fetch(api(this.state.np))
        .then((response) => response.json())
        .then((jsonData) => {
            this.setState({
                refreshing: false,
                data: jsonData.list,
                np: jsonData.info.np || 0,
    
            })
        });
    }

    _onEndReached = () => {
        const { api } = this.props;
        fetch(api(this.state.np))
        .then((response) => response.json())
        .then((jsonData) => {
            this.setState({
                data: [...this.state.data, ...jsonData.list],
                np: jsonData.info.np,
            })
        });
    }

    _ItemSeparatorComponent = () => {
        return (
            <View style={{height: 0.5, backgroundColor: 'rgba(100,100, 100, 0.2)'}} />
        )
    }

    _keyExtractor = (item, index) => {
        return item.text + index;
    }

    _renderItem = ({item}) => {
        return (
            <ListItem 
                item={item}
                onPressHeader={this._onPressHeader}
                onPressContent={this._onPressContent}
                />
        )
    }

    _onPressHeader = (user) => {
        this.props.navigation.navigate('Detail', {user});
    }

    _onPressContent = (item) => {
        if (item.type === 'video') {
            this.props.navigation.navigate('ContentDetail', {item});
        }
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
    itemPlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -35,
        marginTop: -35,
        width: 70, 
        height: 70,
    }
})


