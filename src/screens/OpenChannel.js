import React, { Component } from 'react';
import { View, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { getOpenChannelList } from '../redux/modules/openChannel'
import { Button, ListItem, Avatar } from 'react-native-elements';
import { sbCreateOpenChannelListQuery } from '../sendbirdActions';

class OpenChannel extends Component {
  static navigationOptions = {
    title: 'OPEN CHANNEL'
  }
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      openChannelListQuery: null,
      list: []
    }
  }

  componentDidMount() {
    this._initOpenChannelList();
  }
  componentWillReceiveProps(props) {
    const { list } = props;
    if (list !== this.props.list) {
      if (list.length === 0) {
        this.setState({ list: [] });
      } else {
        const newList = [...this.state.list, ...list];
        this.setState({ list: newList });
      }
    }
  }

  _initOpenChannelList = () => {
    this._getOpenChannelList(true);
  }
  _getOpenChannelList = (init) => {
    if (init) {
      const openChannelListQuery = sbCreateOpenChannelListQuery();
      this.setState({ openChannelListQuery }, () => {
        this.props.getOpenChannelList(this.state.openChannelListQuery);
      });
    } else {
      this.props.getOpenChannelList(this.state.openChannelListQuery);
    }
  }
  _onListItemPress = (channelUrl) => {
    this.props.navigation.navigate(
      'Chat',
      { channelUrl: channelUrl }
    );
  }
  _handleScroll = (e) => {
    if (e.nativeEvent.contentOffset.y < -100 && !this.state.refresh) {
      this.setState({ list: [], refresh: true }, () => {
        this._initOpenChannelList();
      });
    }
  }
  _renderItem = (rowData) => {
    const channel = rowData.item;
    return (
      <ListItem
        component={TouchableHighlight}
        containerStyle={{ backgroundColor: '#fff' }}
        key={channel.url}
        avatar={(
          <Avatar
            source={channel.coverUrl}
          />
        )}
        title={channel.name.length > 30 ? channel.name.substring(0, 26) + '...' : channel.name}
        titleStyle={{ fontWeight: '500', fontSize: 16 }}
        subtitle={channel.participantCount + ' Participant'}
        subtitleStyle={{ fontWeight: '300', fontSize: 11 }}
        onPress={() => this._onListItemPress(channel.url)}
      />
    )
  }

  render() {
    return (
      <View>
        <FlatList
          enableEmptySections={true}
          renderItem={this._renderItem}
          data={this.state.list}
          keyExtractor={(item, index) => item.url}
          onEndReached={() => this._getOpenChannelList(false)}
          onEndReachedThreshold={-50}
          onScroll={this._handleScroll}
        />
      </View>
    )
  }
}

const styles = {
};

function mapStateToProps({ openChannel }) {
  const { list } = openChannel;
  return { list };
}
export default connect(mapStateToProps, { getOpenChannelList })(OpenChannel);