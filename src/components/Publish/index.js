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
import { width, statusBarHeight, isIPhoneX } from '../../configs/Device';

export default class Publish extends Component {
	static navigationOptions = {
		headerTitle: 'Detail',
		headerRight:<View/>,
	}
	data = [
		{key: 'video', title: '发视频', image: 'publish_video'},
		{key: 'picture', title: '发图片', image: 'publish_picture'},
		{key: 'text', title: '发段子', image: 'publish_text'},
		{key: 'audio', title: '发声音', image: 'publish_audio'},
		{key: 'link', title: '发链接', image: 'publish_link'},
		{key: 'review', title: '音乐相册', image: 'publish_review'},
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
						style={styles.button}
						activeOpacity={0.6}
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
				style={styles.item} 
				onPress={() => this._goDetail(data.item)}
			>
				<Image 
					source={{uri: data.item.image}}
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
		paddingTop: statusBarHeight,
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