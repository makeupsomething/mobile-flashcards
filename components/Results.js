import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import {
  clearLocalNotification,
  setLocalNotification,
} from '../utils/helpers';

class Results extends Component {

  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;
  }

  render() {
    const { deck, score } = this.props;
    console.log("results view innit");
    console.log(deck);
    console.log("******score******");
    console.log(score.score)
    const { navigate } = this.props.navigation;

    clearLocalNotification()
      .then(setLocalNotification());

    return (
      <View>
        <Text>Quiz over</Text>
        <Text>Your score was {score.score} / {deck.cards.length}</Text>
        <Button
          onPress={() => navigate(
            'QuizView',
            { deck: deck },
          )}
          title="Try Again"
          color="#839484"
          accessibilityLabel="Try Again"
        />
        <Button
          onPress={() => navigate(
            'DeckList',
            { deck: deck },
          )}
          title="Deck List"
          color="#839484"
          accessibilityLabel="Deck List"
        />
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { deck } = navigation.state.params
  const { decks, score } = state;
  return {
    deck,
    decks,
    score,
  };
}

export default connect(mapStateToProps)(Results);
