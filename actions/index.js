import { getDecks } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const ADD_SCORE = 'ADD_SCORE'

export function receiveDecks (decks) {
  console.log("actions")
  console.log(decks)
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck (newDeck) {
  return {
    type: ADD_DECK,
    deck: newDeck,
  }
}

export function addCardToDeck (front, back, deckID) {
  return {
    type: ADD_CARD,
    decks,
  }
}

export function setScore (score) {
  return {
    type: ADD_SCORE,
    score,
  }
}
