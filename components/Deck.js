import React, { Component } from 'react'
import { Provider, connect } from 'react-redux';
import { View, Text } from 'react-native'

class Deck extends Component {
  render() {
    return (
      <View>
        <Text>Deck Details</Text>
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(Deck);
