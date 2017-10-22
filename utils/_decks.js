import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'Decks:mmm'

function setInitialDeck () {
  var deck = [];
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(deck));
  return deck
}

export function formatDeckResults (results) {
  return results === null
    ? setInitialDeck()
    : JSON.parse(results)
}
