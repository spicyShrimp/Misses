import React, { Component } from 'react';
import {
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { width } from '../../configs/Device';
import NavItem from '../Navigator/NavItem';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import ContentList from '../Content/ContentList';
import ContentWaterfall from '../Content/ContentWaterfall';
import API from '../../configs/API';


export default class Essence extends Component {
	static navigationOptions = ({navigation}) => ({
		headerLeft: <NavItem 
						source={{uri: 'nav_review'}} 
						onPress={() => navigation.navigate('Detail')} 
						/>,
		headerRight: <NavItem 
						source={{uri: 'nav_search'}} 
						onPress={() => navigation.navigate('Detail')} 
						/>,
		headerTitle: '百思不得姐',
	})
	render() {
		const {navigation} = this.props;
		return (
			<ScrollableTabView renderTabBar={this._renderTabBar}>
				<ContentList 
					tabLabel="全部" 
					navigation={navigation} 
					api={API.new.all} 
					/>
				<ContentWaterfall 
					tabLabel="视频" 
					navigation={navigation} 
					api={API.new.video} 
					/>
				<ContentList 
					tabLabel="图片" 
					navigation={navigation} 
					api={API.new.picture} 
					/>
				<ContentList 
					tabLabel="笑话" 
					navigation={navigation} 
					api={API.new.joke} 
					/>
				<ContentList 
					tabLabel="影视分享" 
					navigation={navigation} 
					api={API.new.movie} 
					/>
			</ScrollableTabView>	
		)
	}

	_renderTabBar = () => {
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
		fontSize: 13, 
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
