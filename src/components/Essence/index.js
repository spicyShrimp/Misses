import React, { Component } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { connect } from 'react-redux';
import { width } from '../../configs/Device';

class Essence extends Component {
	static navigationOptions = {
		tabBarVisible: true,
		headerTitle: '百思不得姐',
	};
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Text>Essence</Text>
				<TouchableOpacity 
					style={styles.button} 
					onPress={() => this.props.navigation.navigate('Detail')}
				>
					<Text>Go Detail</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'space-evenly', 
		alignItems: 'center', 
	},
	button: {
		backgroundColor:'#ff2d55', 
		justifyContent: 'center', 
		alignItems: 'center', 
		width: 100, 
		height: 50,
	}
})

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Essence);
  
