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
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
})


class DeckList extends Component {
  constructor(props) {
    super(props);
    this.addDeckTest = this.addDeckTest.bind(this);
    this.addCard = this.addCard.bind(this);
    this.routeToNewDeck = this.routeToNewDeck.bind(this);
  }

  static navigationOptions = {
    title: 'Deck List',
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
    let tempDeck = {id: id, name: deckName, cards: new Array()}
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
    const { decks, score } = this.props
    const { navigate } = this.props.navigation;
    let allDecks = [];
    if(decks.decks){
      allDecks = decks.decks;
    }

    return (
      <View style={styles.container}>
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
                title="Do this quiz!"
              />
            </View>
          ))}
          <CreateDeckModal
            addDeckTest={(deckName) => {
              this.addDeckTest(deckName);
            }}
          />
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
