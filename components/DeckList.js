import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Platform } from 'react-native';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { receiveDecks, addDeck } from '../actions';
import { createDeck, createCard, getDecks } from '../utils/api';
import CreateDeckModal from './CreateDeckModal';
import Deck from './Deck';
import { white, purple } from '../utils/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 100,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    height: 20,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.7,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
})


class DeckList extends Component {
  constructor(props) {
    super(props);
    this.addDeck = this.addDeck.bind(this);
    this.routeToNewDeck = this.routeToNewDeck.bind(this);
  }

  static navigationOptions = {
    title: 'Deck List',
  };

  componentWillMount() {
    const { dispatch } = this.props;
    getDecks().then(decks => dispatch(receiveDecks(decks)));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    getDecks().then(decks => dispatch(receiveDecks(decks)));
  }

  addDeck(deckName) {
    const { dispatch, decks } = this.props
    let id = Math.floor(Math.random() * 90000) + 10000;
    let tempDeck = {id: id, name: deckName, cards: new Array()}
    createDeck(decks.decks, tempDeck).then((decks) => dispatch(receiveDecks(decks))).then(this.routeToNewDeck(id))
  }

  routeToNewDeck(newID) {
    const { decks } = this.props
    const { navigate } = this.props.navigation;
    newDeck = decks.decks.find(deck => (deck.id === newID))
    navigate(
      'DeckDetails',
      {deck: newDeck}
    )
  }

  render() {
    const { decks, score } = this.props
    const { navigate } = this.props.navigation;
    let allDecks = [];
    if(decks.decks){
      allDecks = decks.decks;
    }

    return (
      <View style={styles.container}>
        <CreateDeckModal
          addDeck={(deckName) => {
            this.addDeck(deckName);
          }}
        />
        <ScrollView>
          {allDecks.map(deck => (
            <View key={deck.id} style={styles.item}>
              <Text>{deck.name}</Text>
              <Text>Cards: {deck.cards.length}</Text>
              <Button
                onPress={() => navigate(
                  'DeckDetails',
                  {deck: deck}
                )}
                title="More Details"
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { decks, score } = state;
  return {
    decks,
    score,
  };
}

export default connect(mapStateToProps)(DeckList);
