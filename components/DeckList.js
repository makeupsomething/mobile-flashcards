import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { receiveDecks, addDeck } from '../actions'
import { createDeck, getDecks } from '../utils/api'

class DeckList extends React.Component {
  constructor(props) {
    super(props);
    this.addDeck = this.addDeck.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props
    getDecks().then((decks) => dispatch(receiveDecks(decks)))
  }

  addDeck() {
    const { dispatch, decks } = this.props
    console.log("adding deck")
    let tempDeck = {id: "12234", name: "test", cards: []}
    createDeck(decks.decks, tempDeck).then((decks) => dispatch(receiveDecks(decks)))
    //dispatch(addDeck(tempDeck))
  }

  render() {
    const { decks } = this.props
    let allDecks = decks.decks
    console.log(allDecks)

    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button
          onPress={this.addDeck}
          title="Add deck"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
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
