export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export function receiveDecks (decks) {
  console.log("actions")
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}
