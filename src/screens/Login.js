import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { sendbirdLogin } from '../redux/modules/login';

class Login extends Component {
  static navigationOptions = {
    title: 'LOGIN'
  }

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      nickname: ''
    }
  }

  componentWillReceiveProps(props) {
    const { user, error } = props;
    if (user) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Menu' })
        ]
      })
      this.setState({ userId: '', nickname: '' }, () => {
        this.props.navigation.dispatch(resetAction);
      })
    }
  }

  _userIdChanged = (userId) => {
    this.setState({ userId });
  }
  _nicknameChanged = (nickname) => {
    this.setState({ nickname });
  }
  _onButtonPress = () => {
    const { userId, nickname } = this.state;
    this.props.sendbirdLogin({ userId, nickname });
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.containerStyle}>
          <Input
            label='User ID'
            value={this.state.userId}
            onChangeText={this._userIdChanged}
          />
        </View>
        <View style={styles.containerStyle}>
          <Input
            label='Nickname'
            value={this.state.nickname}
            onChangeText={this._nicknameChanged}
            errorMessage={this.state.error}
          />
        </View>
        <View style={styles.containerStyle}>
          <Button
            buttonStyle={{ backgroundColor: '#2096f3' }}
            title='Connect'
            onPress={this._onButtonPress}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    marginTop: 50
  }
}

function mapStateToProps({ login }) {
  const { error, user } = login;
  return { error, user };
};
export default connect(mapStateToProps, { sendbirdLogin })(Login);