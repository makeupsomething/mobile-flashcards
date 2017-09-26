import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
} from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        decks: action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        decks: [...state.decks, action.deck],
      }
    default :
      return state
  }
}

export default decks
