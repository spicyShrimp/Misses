import React, { Component } from 'react'
import { Text, View } from 'react-native'
import NavItem from '../Navigator/NavItem';

export default class FriendDetail extends Component {
    static navigationOptions = ({navigation}) => {
		const { params } = navigation.state;
		return {
            headerTitle: params.title,
            headerRight: <NavItem />,
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