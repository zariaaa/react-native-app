import { combineReducers } from 'redux';
import allDecks from './allDecks';
import newDeck from './newDeck';
import selectedDeck from './selectDeck'
import selectedQuestion from './selectedQuestion';

export default combineReducers({
    selectedQuestion,
    allDecks,
    newDeck,
    selectedDeck
});