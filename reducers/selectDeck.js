import {
  SELECT_DECK
} from "../actions/allDecks";

export default function selectDeck(state = '', action) {
  switch (action.type) {
      case SELECT_DECK: 
          return action.id
    default:
      return state;
  }
}
