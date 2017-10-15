import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { View, Text, Button } from 'react-native';

class Results extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
  }

  render() {
    const { deck } = this.props
    console.log("results view innit")
    console.log(deck)
    const { navigate } = this.props.navigation

    return (
      <View>
        <Text>Quiz over</Text>
        <Button
          onPress={() => navigate(
            'QuizView',
            {deck: deck}
          )}
          title="Try Again"
          color="#839484"
          accessibilityLabel="Try Again"
        />
        <Button
          onPress={() => navigate(
            'DeckList',
            {deck: deck}
          )}
          title="Deck List"
          color="#839484"
          accessibilityLabel="Deck List"
        />
      </View>
    );
  }
}

function mapStateToProps (decks, { navigation }) {
  const { deck } = navigation.state.params

  return {
    deck,
  }
}

export default connect(mapStateToProps)(Results);
