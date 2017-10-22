import { combineReducers } from 'redux';

import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  ADD_SCORE,
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

function score (state = {score: 0}, action) {
  switch (action.type) {
    case ADD_SCORE :
      return {
        ...state,
        score: action.score,
      }
    default :
      return state
  }
}

const rootReducer = combineReducers({
  decks,
  score,
});

export default rootReducer;
