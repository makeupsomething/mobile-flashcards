import React, { Component } from 'react'
import { Provider, connect } from 'react-redux';
import { View, Text, Button, StyleSheet, Platform } from 'react-native'
import CreateCardModal from './CreateCardModal';
import { createDeck, createCard, getDecks } from '../utils/api';
import { receiveDecks, addDeck } from '../actions';
import { white, purple } from '../utils/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 100,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    height: 30,
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
})

class Deck extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    console.log("mount")
    //getDecks().then(decks => dispatch(receiveDecks(decks)));
  }

  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
  }

  render() {
    const { deck, decks } = this.props
    const { navigate } = this.props.navigation;
    const currentDeck = decks.decks.find(d => d.id === deck.id);
    console.log(currentDeck)
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text>Deck Details</Text>
          <Text>Title: {currentDeck.name}</Text>
          {typeof currentDeck.cards !== 'undefined' ? (
            <Text>Cards: {currentDeck.cards.length}</Text>
          ) : (
            <Text>No cards</Text>
          )}
          <Button
            onPress={() => navigate(
              'QuizView',
              {deck: currentDeck}
            )}
            title="Start Quiz"
          />
        </View>
        <CreateCardModal
          deck={currentDeck}
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
