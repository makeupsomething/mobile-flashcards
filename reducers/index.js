import { RECEIVE_DECKS } from '../actions'

function decks (state = {}, action) {
  console.log("reducer")
  console.log(action.decks)
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        decks: action.decks,
      }
    default :
      return state
  }
}

export default decks
