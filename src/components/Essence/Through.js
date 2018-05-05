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
import ListPage from '../Base/ListPage';
import WaterfallPage from '../Base/WaterfallPage';
import API from '../../configs/API';


export default class Through extends Component {
	static navigationOptions = ({navigation}) => {
		return {
			headerRight: <NavItem 
						source={{uri: 'nav_random'}} 
						onPress={navigation.state.params && navigation.state.params._onPress} 
						/>,
		}
	}

	_onPress = () => {
		this.lists[this.scroll.state.currentPage].onRefreshing();
	}

	componentDidMount = () => {
		const { navigation } = this.props
		navigation.setParams({
			_onPress: this._onPress,
		})
	}

	render() {
		const {navigation} = this.props;
		this.lists = [];
		return (
			<ScrollableTabView 
				renderTabBar={this._renderTabBar}
				ref={scroll => this.scroll = scroll} 
				>
				<ListPage 
					tabLabel="全部"
					ref={all => this.lists[0] = all} 
					navigation={navigation} 
					api={API.through.all} 
					/>
				<ListPage
					tabLabel="视频" 
					ref={video => this.lists[1] = video} 
					navigation={navigation} 
					api={API.through.video} 
					/>
				<ListPage 
					tabLabel="图片" 
					ref={picture => this.lists[2] = picture} 
					navigation={navigation} 
					api={API.through.picture} 
					/>
				<ListPage 
					tabLabel="段子" 
					ref={joke => this.lists[3] = joke}
					navigation={navigation} 
					api={API.through.joke} 
					/>
				<ListPage 
					tabLabel="声音" 
					ref={audio => this.lists[4] = audio}
					navigation={navigation} 
					api={API.through.audio} 
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
