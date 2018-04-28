import React, { Component } from 'react';
import NavItem from './NavItem';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class NavBack extends Component {
    onBack() {
        const { dispatch } = this.props;
        dispatch( NavigationActions.back() );
    };

    render() {
        const { backStyle } = this.props;
        return (
            <NavItem onPress={() => this.onBack()}/>
        )
    }
}
export default connect()(NavBack);
