import {
  SELECT_QUESTION 
} from "../actions/allDecks";

export default function selectedQuestion(state = 0, action) {
  switch (action.type) {
      case SELECT_QUESTION : 
          return action.id
    default:
      return state;
  }
}
