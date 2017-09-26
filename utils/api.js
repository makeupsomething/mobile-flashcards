import { AsyncStorage } from 'react-native'
import { formatDeckResults, DECKS_STORAGE_KEY } from './_decks'

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDeckResults)
}

export function createDeck(decks, newDeck) {
  decks.push(newDeck)
  console.log(decks)
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDeckResults)
}
