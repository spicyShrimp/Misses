import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  StyleSheet, 
  Dimensions, 
  Platform,
} from 'react-native';
const { width } = Dimensions.get('window');

export default class Publish extends Component {
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    width,
    alignSelf: 'flex-end',
    backgroundColor:'#ff2d55', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 50,
    borderTopColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 0.5,
  }
})