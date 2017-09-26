import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { receiveDecks, addDeck } from '../actions'
import { createDeck, createCard, getDecks } from '../utils/api'

class DeckList extends React.Component {
  constructor(props) {
    super(props);
    this.addDeck = this.addDeck.bind(this);
    this.addCard = this.addCard.bind(this);
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
  }

  addCard() {
    const { dispatch, decks } = this.props
    console.log("adding card")
    let tempCard = {id: "abcde", front: "front part", back: "back part"}
    createCard(decks.decks, "12234", tempCard).then((decks) => dispatch(receiveDecks(decks)))
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
        <Button
          onPress={this.addCard}
          title="Add card"
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
