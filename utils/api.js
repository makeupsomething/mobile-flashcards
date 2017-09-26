import { AsyncStorage } from 'react-native'
import { formatDeckResults, DECKS_STORAGE_KEY } from './_decks'

export function createDeck(deck) {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decksStr)=>{
    const decks = JSON.parse(decksStr)
    console.log(decks)
  })
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDeckResults)
}

export function addCard(front, back, deckId) {
  return null
}
