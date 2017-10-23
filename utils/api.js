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

export function createCard(decks, deck, deckID, newCard) {
  const d = decks.find(deck => deck.id === deckID);
  console.log(deckID)
  console.log(d)
  if(typeof(d.cards) !== 'undefined'){
    console.log("push card")
    d.cards.push(newCard)
  } else {
    console.log("create array")
    d.cards = [newCard]
  }
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then(formatDeckResults)
}
