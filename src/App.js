import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import Login from './screens/Login'
import Menu from './screens/Menu'

const MainNavigator = createStackNavigator({
  Login: { screen: Login },
  Menu: { screen: Menu }
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}