import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import {
  clearLocalNotification,
  setLocalNotification,
} from '../utils/helpers';
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
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 50,
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

class Results extends Component {

  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;
  }

  render() {
    const { deck, score } = this.props;
    const { navigate } = this.props.navigation;

    clearLocalNotification()
      .then(setLocalNotification());

    return (
      <View style={styles.item}>
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
