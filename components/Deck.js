import React, { Component } from 'react'
import { Provider, connect } from 'react-redux';
import { View, Text, Button } from 'react-native'
import CreateCardModal from './CreateCardModal';
import { createDeck, createCard, getDecks } from '../utils/api';
import { receiveDecks, addDeck } from '../actions';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.addCardTest = this.addCardTest.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
  }

  addCardTest(question, answer) {
    const { dispatch, decks, deck } = this.props
    console.log("Adding Card")
    let id = Math.floor(Math.random() * 90000) + 10000;
    const tempCard = { id: id, front: question, back: answer };
    createCard(decks.decks, deck.id, tempCard).then(decks => dispatch(receiveDecks(decks)))
  }

  render() {
    const { deck } = this.props
    const { navigate } = this.props.navigation;

    console.log("looking at deck")
    console.log(deck)
    return (
      <View>
        <Text>Deck Details</Text>
        <Text>{deck.name}</Text>
        <Text>{deck.cards.length}</Text>
        <CreateCardModal
          addCardTest={(question, answer) => {
            this.addCardTest(question, answer);
          }}
        />
        <Button
          onPress={() => navigate(
            'QuizView',
            {deck: deck}
          )}
          title="Start Quiz"
        />
      </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const { deck } = navigation.state.params
  const { decks } = state;

  return {
    decks,
    deck,
  }
}

export default connect(mapStateToProps)(Deck);
