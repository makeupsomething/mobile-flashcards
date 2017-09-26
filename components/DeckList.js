import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { createDeck, getDecks } from '../utils/api'

class DeckList extends React.Component {

  componentWillMount() {
    const { dispatch } = this.props
    console.log("mount");
    getDecks().then((decks) => dispatch(receiveDecks(decks)))
  }

  render() {
    const { decks } = this.props
    let allDecks = decks.decks
    console.log(allDecks)
    if(allDecks != null) {
      const deckObj = { id: '1234', name: 'testDeck', cards: [] }
      allDecks.push(deckObj)
      console.log(allDecks)
    }

    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(DeckList)
