import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Menu extends Component {
    static navigationOptions = {
        title: 'MENU'
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{backgroundColor: '#fff', flex: 1}}>
                <Text>Menu</Text>
            </View>
        )
    }
}

const styles = {
};

export default Menu;