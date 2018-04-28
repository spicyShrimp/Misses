import React, { Component } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { connect } from 'react-redux';
import { addAction, minAction } from '../../actions/countAction';
import { width } from '../../configs/Device';

class Essence extends Component {
	static navigationOptions = {
		tabBarVisible: true,
		headerTitle: '百思不得姐',
	};
	render() {
		const { counter, addAction, minAction } = this.props;
		return (
			<SafeAreaView style={styles.container}>
				<Text>{counter}</Text>
				<View style={styles.buttons}>
					<TouchableOpacity 
						style={styles.button} 
						onPress={() => addAction()}
					>
						<Text>Add</Text>
					</TouchableOpacity> 
					<TouchableOpacity 
						style={styles.button} 
						onPress={() => minAction()}
					>
						<Text>Min</Text>
					</TouchableOpacity>
					<TouchableOpacity 
						style={styles.button} 
						onPress={() => this.props.navigation.navigate('Detail')}
					>
						<Text>Go Detail</Text>
					</TouchableOpacity>
				</View>
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
	buttons: {
		width,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
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
  	counter: state.count.counter
});

const mapDispatchToProps = {
  	addAction,
  	minAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Essence);
  
