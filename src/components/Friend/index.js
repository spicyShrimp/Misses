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

class SearchHeader extends Component {
    render () {
        return (
            <TextInput
                placeholder='搜索' 
                clearButtonMode='while-editing'
                underlineColorAndroid='transparent'
                style={styles.input}
            />
        )
    }
}

export default class Friend extends Component {
    static navigationOptions = {
        headerTitle: <SearchHeader />,
    }

    constructor(props){
        super(props);
        this.state = {
            refreshing: false
        }
    }

    data = [
		{key: '萌宠', image: 'publish_review', subTitle: '今日更新110 | 当前在线 343'},
		{key: '来唱歌吧', image: 'publish_review', subTitle: '今日更新110 | 当前在线 343', desc: '好声音都在这里了! 快来秀出你的歌声吧~'},
		{key: '影视分享', image: 'publish_review', subTitle: '今日更新110 | 当前在线 343', desc: '观影爱好者欢乐多!'},
		{key: '声音控', image: 'publish_review', subTitle: '今日更新110 | 当前在线 343', desc: '观影爱好者欢乐多!'},
		{key: '反馈中心', image: 'publish_review', subTitle: '今日更新110 | 当前在线 343', desc: '观影爱好者欢乐多!'},
        {key: '吃鸡', image: 'publish_review', subTitle: '今日更新110 | 当前在线 343', desc: '观影爱好者欢乐多!'},
        {key: '感情倾诉', image: 'publish_review', subTitle: '今日更新110 | 当前在线 343', desc: '观影爱好者欢乐多!'},
        {key: '爆笑Gif', image: 'publish_review', subTitle: '今日更新110 | 当前在线 343', desc: '观影爱好者欢乐多!'},
        {key: '王者荣耀', image: 'publish_review', subTitle: '今日更新110 | 当前在线 343', desc: '观影爱好者欢乐多!'},
        {key: '美食频道', image: 'publish_review', subTitle: '今日更新110 | 当前在线 343', desc: '观影爱好者欢乐多!'},
    ]
    
    componentDidMount() {
        this._refresh();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.data}
                    renderItem={(props) => this._renderItem(props)}
                    ItemSeparatorComponent={() => this._ItemSeparatorComponent()}
                    refreshing={this.state.refreshing}
                    onRefresh={()=>this._refresh()}
                />
            </SafeAreaView>
        );
    }

    _refresh() {
        this.setState({
            refreshing: true,
        })
        this.timer = setTimeout(() => {
            this.setState({
                refreshing: false,
            })
        }, 5000);
    }

    _ItemSeparatorComponent() {
        return (
            <View style={{height: 0.5, marginLeft: 15, backgroundColor: 'rgba(100,100, 100, 0.2)'}} />
        )
    }

    _renderItem({item}) {
		return (
			<TouchableOpacity 
				activeOpacity={0.7}
                style={styles.item}
                onPress={() => this.goToDetail(item)}
			>
				<Image 
					source={{uri: item.image}}  
					style={{width: 60, height: 60}}
				/>
                
                <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{item.key}</Text>
                    <Text style={styles.itemSubTitle}>{item.subTitle}</Text>
                    <Text style={item.desc ? styles.itemDesc: {height: 0}}>{item.desc}</Text>
                </View>

				<Image 
					source={{uri: 'arrow_right'}}
					style={{width: 7, height: 12}}
				/>
			</TouchableOpacity>
		)
    }

    goToDetail(item) {
        this.props.navigation.navigate('Detail', {title: item.key});
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
  
