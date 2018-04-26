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
  StatusBar,
} from 'react-native';
const { width } = Dimensions.get('window');

export default class Publish extends Component {
  static navigationOptions = {
    headerTitle: 'Detail',
    headerRight:<View/>,
  }

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity style={ styles.item }>
          <Image source={ {uri: item.image} }  style={{width: 57, height: 57}}/>
          <Text>{item.key}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <SafeAreaView 
        style = { styles.container }>
            <View style = { styles.flat }>
              <FlatList
                  data={[
                    {key: '发视频', image: 'publish_video'},
                    {key: '发图片', image: 'publish_picture'},
                    {key: '发段子', image: 'publish_text'},
                    {key: '发声音', image: 'publish_audio'},
                    {key: '发链接', image: 'publish_link'},
                    {key: '音乐相册', image: 'publish_review'},
                  ]}
                  renderItem = { this._renderItem }
                  numColumns= {3}
                  scrollEnabled = {false}
              />
            </View>
            
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
    paddingTop: StatusBar.currentHeight,
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
    backgroundColor:'#fff',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
})