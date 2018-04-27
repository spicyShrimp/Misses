import React, { Component } from 'react';
import { 
	SafeAreaView,
	SectionList, 
	FlatList,
    View, 
    Text, 
    TouchableOpacity, 
	StyleSheet,
	Image 
} from 'react-native';
import { width } from '../../configs/Device';

const numColumns = 5;

export default class Me extends Component {
	static navigationOptions = {
		headerTitle: '我的',
	}

	_renderHeader() {
		return (
			<View style = { styles.header }>
			</View>	
		)
	}

	_renderItem(data) {
		return (
		<TouchableOpacity 
			style={ styles.item }>
			<Image 
				source = { {uri: data.item.key} }  
				style = { styles.itemImage }/>
				<Text 
					style = { styles.itemText }>
					{ data.item.title }
				</Text>
		</TouchableOpacity>
		)
	}

	_renderSectionItem(data) {
		console.log(data.section);
		return (
			<FlatList
				data = { data.section.data[0].content }
				numColumns = { numColumns }
				renderItem = { (data)=>this._renderItem(data) }
				style={ {backgroundColor: '#fff'} }
				scrollEnabled = {false}
			/>
		)
	}
	
	_renderFooter() {
		return (
			<TouchableOpacity 
				activeOpacity={0.7}
				style={ styles.footer }>
				<Text>好友动态</Text>
				<Image 
					source={ {uri:'arrow_right'} }
					style={ {width: 7, height: 12} }/>
			</TouchableOpacity>
		)
	}

	render() {
		return (
		<SafeAreaView 
			style = { styles.container }>
			<SectionList
					sections = {[{
						data: [{
							content: [
								{key: 'mine_icon_hot', title: '排行榜'},
								{key: 'mine_icon_preview', title: '审帖'},
								{key: 'mine_icon_manhua', title: '漫画'},
								{key: 'mine_icon_activity', title: '我的收藏'},
								{key: 'mine_icon_nearby', title: '附近'},
								{key: 'mine_icon_random', title: '随机穿越'},
								{key: 'mine_icon_feedback', title: '意见反馈'},
								{key: 'mine_icon_more', title: '更多'},
							]
						}],
					}]}
					renderItem = {(data)=>this._renderSectionItem(data)}
					numColumns = {numColumns}
					ListHeaderComponent = { ()=>this._renderHeader() }
					ListFooterComponent = { ()=>this._renderFooter() }
					scrollEnabled = {true}
				/>
		</SafeAreaView>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		height: 100,
		backgroundColor: '#fff',
		marginBottom: 10,

	},
	footer: {
		height: 50,
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		marginTop: 10,
	},
	item: {
		backgroundColor: '#fff',
		width: width/numColumns,
		height: 80,  
		alignItems: 'center',
		justifyContent: 'center',
	},
	itemImage: {
		width: 40,
		height: 40,
		marginBottom: 5,
	},
	itemText: {
		fontSize: 12,
	}

})

  
