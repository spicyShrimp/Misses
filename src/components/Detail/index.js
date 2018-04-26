import React, { Component } from 'react';
import { 
  View,
  SafeAreaView, 
  Text, 
  TouchableOpacity,
  StyleSheet, 
  Dimensions, 
  Platform,
  StatusBar,
} from 'react-native';
const { width } = Dimensions.get('window');

export default class Detail extends Component {
  static navigationOptions = {
    headerTitle: 'Detail',
    headerRight:<View/>,
  }

  render() {
    return (
      <SafeAreaView 
        style = { styles.container }>
        <Text>111</Text>
          <TouchableOpacity 
            style = { styles.button }
            activeOpacity = { 0.6 }
            onPress = { ()=>this.props.navigation.goBack() }>
              <Text>取消</Text>
          </TouchableOpacity>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width,
    height: 50,
    position: 'absolute',
    bottom: 0,
    backgroundColor:'#ff2d55', 
    borderTopColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 0.5,
    justifyContent: 'center', 
    alignItems: 'center', 
  }
})