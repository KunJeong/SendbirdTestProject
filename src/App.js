import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import Login from './screens/Login';
import Menu from './screens/Menu';
import Profile from './screens/Profile';
import OpenChannel from './screens/OpenChannel';
import Chat from './screens/Chat';

const MainNavigator = createStackNavigator({
    Login: { screen: Login },
    Menu: { screen: Menu },
    Profile: { screen: Profile },
    OpenChannel: { screen: OpenChannel },
    Chat: {screen: Chat}
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