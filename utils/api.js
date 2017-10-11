import { AsyncStorage } from 'react-native'
import { formatDeckResults, DECKS_STORAGE_KEY } from './_decks'
import {getUUID } from './helpers'

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDeckResults)
}

export function createDeck(decks, newDeck) {
  decks.push(newDeck)
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDeckResults)
}

export function createCard(decks, deckID, newCard) {
  var deck = decks.find(deck => deck.id === deckID);
  console.log(deck);
  deck.cards.push(newCard)
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDeckResults)
}
