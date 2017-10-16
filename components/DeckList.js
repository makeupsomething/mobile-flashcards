import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { receiveDecks, addDeck } from '../actions';
import { createDeck, createCard, getDecks } from '../utils/api';
import CreateDeckModal from './CreateDeckModal';
import Deck from './Deck';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class DeckList extends Component {
  constructor(props) {
    super(props);
    this.addDeckTest = this.addDeckTest.bind(this);
    this.addCard = this.addCard.bind(this);
    this.routeToNewDeck = this.routeToNewDeck.bind(this);
  }

  static navigationOptions = {
    title: 'Hello',
  };

  componentWillMount() {
    const { dispatch } = this.props;
    getDecks().then(decks => dispatch(receiveDecks(decks)));
  }

  addCard() {
    const { dispatch, decks } = this.props;
    console.log("adding card");
    const tempCard = { id: "abcde", front: "front part", back: "back part" };
    createCard(decks.decks, "12234", tempCard).then(decks => dispatch(receiveDecks(decks)))
  }

  addDeckTest(deckName) {
    const { dispatch, decks } = this.props
    console.log("Adding Deck")
    let id = Math.floor(Math.random() * 90000) + 10000;
    let tempDeck = {id: id, name: deckName, cards: []}
    createDeck(decks.decks, tempDeck).then((decks) => dispatch(receiveDecks(decks))).then(this.routeToNewDeck(id))
  }

  routeToNewDeck(newID) {
    const { decks } = this.props
    const { navigate } = this.props.navigation;
    console.log("route to the new deck with id")
    console.log(newID)
    newDeck = decks.decks.filter(deck => (deck.id === newID))
    navigate(
      'DeckDetails',
      {deck: newDeck}
    )
  }

  render() {
    const { decks } = this.props
    const { navigate } = this.props.navigation;

    let allDecks = [];
    if(decks.decks){
      allDecks = decks.decks;
    }

    return (
      <View style={styles.container}>
        {allDecks.map(deck => (
          <View key={deck.id}>
            <Button
              onPress={() => navigate(
                'DeckDetails',
                {deck: deck}
              )}
              title={deck.name+deck.cards.length}
            />
          </View>
        ))}
        <CreateDeckModal
          addDeckTest={(deckName) => {
            this.addDeckTest(deckName);
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckList);
