import React, { Component } from 'react';
import {  SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAction, minAction } from '../../actions/countAction';
const { width } = Dimensions.get('window');

class Essence extends Component {
  static navigationOptions = {
      headerTitle: '百思不得姐',
      // headerRight: <View/>,
  };
  render() {
    const { counter, addAction, minAction } = this.props;
    return (
      <SafeAreaView 
        style = { styles.container }>
          <Text>{ counter }</Text>
          <View 
            style = { styles.buttons }>
              <TouchableOpacity 
                style={ styles.button } 
                onPress={ ()=>addAction() }>
                  <Text>Add</Text>
              </TouchableOpacity> 
              <TouchableOpacity 
                style={ styles.button } 
                onPress={ ()=>minAction() }>
                  <Text>Min</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={ styles.button } 
                onPress={ ()=>this.props.navigation.navigate('Detail') }>
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
  
