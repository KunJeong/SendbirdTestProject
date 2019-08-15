import React from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { Button, Input } from 'react-native-elements';

const { width } = Dimensions.get('window');

const MessageInput = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Input
        containerStyle={{ marginLeft: 20, marginRight: 8, width: width - 100, }}
        inputStyle={{
          color: '#212529',
          minHeight: 36,
          
        }}
        placeholder={'Your message'}
        autoCapitalize='none'
        autoCorrect={false}
        selectionColor={'#212529'}
        value={props.textMessage}
        onChangeText={props.onChangeText}
        onFocus={props.onFocus}
      />
      <Button
        containerStyle={{ marginLeft: 0 }}
        buttonStyle={{width: 10, height: 10, backgroundColor: '#00ccff'}}
        // iconStyle={{ margin: 0, padding: 0 }}
        // name='envelope'
        // // type='font-awesome'
        // color={props.textMessage.length > 0 ? '#7d62d9' : '#494e57'}
        // size={15}
        onPress={props.onRightPress}
      />
    </View>
  )
}

export { MessageInput }