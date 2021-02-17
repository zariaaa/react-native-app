import {
    getDecks,
    getDeckTitle,
    saveCardToDeck,
    removeDeck
} from "../utils/api";

export const GET_ALL_DECKS = "GET_ALL_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";
export const DELETE_DECK = "DELETE_DECK";
export const RESET_NEW_DECK_ID = "RESET_NEW_DECK_ID";
export const SELECT_DECK = "SELECT_DECK";
export const SELECT_QUESTION = "SELECT_QUESTION";

export function selectQuestion(id) {
    return {
      type: SELECT_QUESTION,
      id,
    };
  }
  
  export function getAllDecks() {
    return dispatch => {
      return getDecks().then(decks => {
        dispatch(getTheDecks(decks));
      });
    };
  }
  
  export function addDecks(deckTitle) {
    return dispatch => {
      return getDeckTitle(deckTitle).then(deck => {
        dispatch(addDeck(deck));
      });
    };
  }
  
  export function handleAddCard(deckId, card) {
    return dispatch => {
      return saveCardToDeck(deckId, card).then(() => {
        dispatch(addCard(deckId, card));
      });
    };
  }
  
  export function handleDeleteDeck(deckId) {
    return dispatch => {
      return removeDeck(deckId).then(deck => {
        dispatch(deleteDeck(deck));
      });
    };
  }
  
  export function getTheDecks(decks) {
    return {
      type: GET_ALL_DECKS,
      decks
    };
  }
  
  export function addDeck(deck) {
    return {
      type: ADD_DECK,
      deck
    };
  }
  
  export function addCard(deckId, card) {
    return {
      type: ADD_CARD_TO_DECK,
      deckId,
      card
    };
  }
  
  export function deleteDeck(deckId) {
    return {
      type: DELETE_DECK,
      deckId
    };
  }
  
  export function resetNewDeckId() {
    return {
      type: RESET_NEW_DECK_ID
    };
  }
  
  export function selectDeck(id) {
    return {
      type: SELECT_DECK,
      id,
    };
  }
  