import React, { Component } from 'react';
import {  
  SafeAreaView,
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput
} from 'react-native';

class SearchHeader extends Component {
  render () {
    return (
      <TextInput
        placeholder = '搜索' 
        clearButtonMode = 'while-editing'
        underlineColorAndroid = 'transparent'
        style = { styles.input }
      />
    )
  }
}

export default class Friend extends Component {
  static navigationOptions = {
    headerTitle: <SearchHeader/>,
  }
  render() {
    return (
      <SafeAreaView 
        style = { styles.container }>
          <Text>Friend</Text>
          <TouchableOpacity 
            style = { styles.button } 
            onPress = { ()=>this.props.navigation.navigate('Detail') }>
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
  input: {
    flex: 1, 
    height: 30,
    padding: 0,
    paddingLeft: 10,
    marginHorizontal: 10, 
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    width: 100, 
    height: 50,
    backgroundColor:'#ff2d55', 
    justifyContent: 'center', 
    alignItems: 'center', 
  }
})
  
