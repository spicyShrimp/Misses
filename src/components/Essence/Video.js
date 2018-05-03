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
import { fetchSubScribeData } from '../../actions/Friend'


class Video extends Component {
    componentDidMount() {
        const {data, fetchSubScribeData} = this.props;
        fetchSubScribeData(data);
    }

    render() {
        const {data, refreshing, fetchSubScribeData} = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={(props) => this._renderItem(props)}
                    ItemSeparatorComponent={() => this._ItemSeparatorComponent()}
                    refreshing={refreshing}
                    onRefresh={()=>fetchSubScribeData(data)}
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
        return item.theme_name + index;
    }

    _renderItem({item}) {
		return (
			<TouchableOpacity 
				activeOpacity={0.7}
                style={styles.item}
                onPress={() => this.goToDetail(item)}
			>
				<Image 
					source={{uri: item.image_list}}  
					style={{width: 60, height: 60}}
				/>
                
                <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{item.theme_name}</Text>
                    <Text style={styles.itemSubTitle}>今日更新 {item.today_topic_num} | 当前在线 {item.visit}</Text>
                    <Text 
                        style={item.info ? styles.itemDesc: {height: 0}}
                        numberOfLines={1}
                    >
                        {item.info.replace('\u3000', '').split('\r\n')[0]}
                    </Text>
                </View>

				<Image 
					source={{uri: 'arrow_right'}}
					style={{width: 7, height: 12}}
				/>
			</TouchableOpacity>
		)
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
    refreshing: state.Friend.refreshing,
    data: state.Friend.data,
});

const mapDispatchToProps = {
    fetchSubScribeData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
  
