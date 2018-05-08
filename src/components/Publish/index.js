import React, { Component } from 'react';
import { 
	View,
	SafeAreaView, 
	Text, 
	TouchableOpacity,
	StyleSheet, 
	Dimensions, 
	Platform,
	FlatList,
	Image,
} from 'react-native';
import { width, statusBarHeight, ios, isIPhoneX } from '../../configs/Device';

export default class Publish extends Component {
	data = [
		{key: 'publish_video', title: '发视频'},
		{key: 'publish_picture', title: '发图片'},
		{key: 'publish_text', title: '发段子'},
		{key: 'publish_audio', title: '发声音'},
		{key: 'publish_link', title: '发链接'},
		{key: 'publish_review', title: '音乐相册'},
	]

	render() {
		return (
			<SafeAreaView style= {styles.container}>
					<View style={styles.flat}>
						<FlatList
							data={this.data}
							renderItem={(item) => this._renderItem(item)}
							numColumns={3}
							scrollEnabled={false}
							/>
					</View>
					<TouchableOpacity 
						activeOpacity={0.7}
						style={styles.button}
						onPress={() => this.props.navigation.goBack()}
						>
						<Text>取消</Text>
					</TouchableOpacity>
			</SafeAreaView>
		);
	}

	_renderItem(data) {
		return (
			<TouchableOpacity 
				activeOpacity={0.7}
				style={styles.item} 
				onPress={() => this._goDetail(data.item)}
				>
				<Image 
					source={{uri: data.item.key}}
					style={{width: 57, height: 57}}
					/>
				<Text>{data.item.title}</Text>
			</TouchableOpacity>
		)
	}

	_goDetail(item) {
		const {navigation} = this.props;
		navigation.goBack();
		navigation.navigate('Detail', {title: item.title});
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: ios ? 0 : statusBarHeight,
		alignItems: 'center',
		justifyContent: 'center',
	},
	flat: {
		width,
	},
	item: {
		flex: 1,
		height: 100,  
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	button: {
		width,
		height: 50,
		position: 'absolute',
		bottom: 0,
		marginBottom: isIPhoneX ? 34 : 0,
		backgroundColor:'#fff',
		justifyContent: 'center', 
		alignItems: 'center', 
	},
})