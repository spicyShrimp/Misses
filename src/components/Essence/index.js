import React, { Component } from 'react';
import {
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { width } from '../../configs/Device';
import NavItem from '../Navigator/NavItem';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import Recommend from './Recommend';
import Video from './Video';

export default class Essence extends Component {
	static navigationOptions = ({navigation}) => ({
		headerLeft: <NavItem 
					source={{uri: 'nav_game'}} 
					onPress={() => navigation.navigate('Detail')} 
				/>,
		headerRight: <NavItem 
					source={{uri: 'nav_random'}} 
					onPress={() => navigation.navigate('Detail')} 
				/>,
	})
	render() {
		const {navigation} = this.props;
		return (
			<ScrollableTabView 
					renderTabBar={() => this._renderTabBar()}>
					<Recommend tabLabel="推荐" navigation={navigation} />
					<Video tabLabel="视频" navigation={navigation} />
					<Video tabLabel="图片" navigation={navigation} />
					<Video tabLabel="笑话" navigation={navigation} />
					<Video tabLabel="排行" navigation={navigation} />
				</ScrollableTabView>	
		)
	}

	_renderTabBar() {
		return <DefaultTabBar
					backgroundColor={'#ff2e57'}
					activeTextColor={'#fff'}
					inactiveTextColor={'#fff'}
					textStyle={styles.tabBarText}
					underlineStyle={styles.tabBarUnderline}
					style={{height: 35}}
				/>
	}
}
  
const styles = StyleSheet.create({
	tabBarText: {
		fontSize: 16, 
		textAlign: 'center',
	},
	tabBarUnderline: {
		width: 24, 
		marginHorizontal: (width-24*5)/10, 
		backgroundColor: '#fff',
		borderRadius: 4,
		marginBottom: 2,
	}
})
