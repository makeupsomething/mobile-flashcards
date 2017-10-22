import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { StackNavigator } from 'react-navigation';
import { setLocalNotification } from './utils/helpers';

const ModalStack = StackNavigator({
  DeckList: {
    screen: DeckList,
  },
  DeckDetails: {
    screen: Deck,
  },
  QuizView: {
    screen: Quiz,
  },
  ResultsView: {
    screen: Results,
  },
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={
        createStore(
          rootReducer
        )}
      >
        <View style={{ flex: 1 }}>
          <ModalStack />
        </View>
      </Provider>
    );
  }
}
