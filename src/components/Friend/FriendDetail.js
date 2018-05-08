import React, { Component } from 'react'
import { Text, View } from 'react-native'
import NavItem from '../Navigator/NavItem';
import { ios, statusBarHeight } from '../../configs/Device';

export default class FriendDetail extends Component {
    static navigationOptions = ({navigation}) => {
		const { params } = navigation.state;
		return {
            headerTitle: params.title,
            headerStyle:{ 
                borderBottomWidth: 0,
                elevation: 0,
                paddingTop: ios ? 0 : statusBarHeight,
                height: 44 + (ios ? 0 : statusBarHeight),
                backgroundColor: 'transparent'
            }
		}
	};

    render() {
        return (
        <View>
            <Text> textInComponent </Text>
        </View>
        )
    }
}