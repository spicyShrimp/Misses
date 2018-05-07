import React, { Component } from 'react';
import { 
    Text, 
    SafeAreaView, 
    View, 
    TouchableOpacity, 
    StatusBar,
    StyleSheet
} from 'react-native';
import MSVideo from '../Base/MSVideo';
import { width, height, statusBarHeight } from '../../configs/Device';
import Orientation from 'react-native-orientation';

export default class VideoDetial extends Component {
    
    static navigationOptions = {
        headerStyle: {display: 'none'},
    }

    componentWillMount = () => {
        StatusBar.setHidden(false, false);
        Orientation.lockToPortrait();
    }

    componentWillUnmount() {
        StatusBar.setHidden(false, false);
        Orientation.lockToPortrait();
    }
    

    render() {
        const { item } = this.props.navigation.state.params;
        console.log(item);
        return (
            <View style={{flex: 1}} onLayout={this._onLayout}>
                <MSVideo 
                    source={{uri: item.video.video[0]}}
                    style={{
                        width: width, 
                        height: (width / item.video.width * item.video.height)
                    }}
                    />
                <TouchableOpacity 
                    activeOpacity={0.7}
                    style={{
                        backgroundColor: '#f00', 
                        width: 44, 
                        height: 44, 
                        position: 'absolute', 
                        left: statusBarHeight, 
                        top: statusBarHeight, 
                        justifyContent: 'center', 
                        alignItems: 'center'
                    }}
                    onPress={()=>{
                        Orientation.lockToPortrait();
                        this.props.navigation.goBack();
                    }}
                    >
                    <Text>返回</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
})