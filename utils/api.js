import { AsyncStorage } from "react-native";
import { generateUID } from "./helper";
import {  Alert } from 'react-native';

const QUIZ_STORAGE_DATA = "storage_data";

function data() {
  return {
    "reactlang321": {
      title: "React",
      id: "reactlang321",
      questions: [
        {
            question: 'What is React?',
            answer: 'A library for managing user interfaces',
            rightAnswer: "Yes",
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidUpdate lifecycle event',
            rightAnswer: "No",
          }
      ]
    },
    "jslang321": {
      title: "JavaScript",
      id: "jslang321",
      questions: [
        {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.',
            rightAnswer: "Yes",
        }
      ]
    },
    "CSS": {
      id: "CSS",
      title: "CSS",
      questions: [
        {
          question: "What is CSS?",
          answer: "It describes how the JS content will be shown on screen.",
          rightAnswer: "No",
        },
        {
          question: "What is CSS opacity?",
          answer:
            "It is the property that elaborates on the transparency of an element.",
            rightAnswer: "Yes",
        }
      ]
    },
    "geography321": {
      title: "Geography",
      id: "geography321",
      questions: [
        {
          question: "Where is Japan?",
          answer: "Europe",
          rightAnswer: "No",
        },
        {
          question: "What is the capital city of France?",
          answer: "Barbosa",
          rightAnswer: "No",
        },
        {
          question: "Where is Sweden?",
          answer: "Europe",
          rightAnswer: "Yes",
        },
        {
          question: "Where is Nigeria?",
          answer: "Asia",
          rightAnswer: "No",
        }
      ]
    }
  };
}


export async function getDecks() {
    try {

        const results = await AsyncStorage.getItem(QUIZ_STORAGE_DATA);
      if (results && results !== '{}'){
         const data = JSON.parse(results);
       return data;
       } 
        if (results === null || results === undefined){

            const getDummyData = data();
            
            await AsyncStorage.mergeItem(QUIZ_STORAGE_DATA, (JSON.stringify(getDummyData)));
            return getDummyData;
        }
       else {
        Alert.alert(
            "No Decks Found",
            "Press the BLUE  button to ADD more decks.",
            [
              { text: "OK", onPress: () => console.log("OK") }
            ],
            { cancelable: false }
          );
      }
    } catch (error) {
        Alert.alert(
            "ERROR LOADING DECKS",
            "PLEASE REALOAD THE APP",
            [
            { text: "OK", onPress: () => console.log("OK") }
            ],
            { cancelable: false }
        );
    }
  }

  export async function removeAllDecksFromStorage() {
    await AsyncStorage.clear();
  }
  
  export async function getDeckTitle(title) {
    const id = generateUID();
    const deck = {
      id: id,
      title: title,
      questions: []
    };
  
    await AsyncStorage.mergeItem(
      QUIZ_STORAGE_DATA,
      JSON.stringify({
        [id]: deck
      })
    );
    return deck;
  }
  
  export async function saveCardToDeck(deckId, card) {
    const results = await AsyncStorage.getItem(QUIZ_STORAGE_DATA);
    if (results) {
      const data = JSON.parse(results);
      const deck = data[deckId];
      deck.questions = deck.questions.concat([card]);
      await AsyncStorage.mergeItem(
        QUIZ_STORAGE_DATA,
        JSON.stringify({
          [deckId]: deck
        })
      );
      return card;
    }
  }
  

  export async function removeDeck(deckId) {
    const decksData = await AsyncStorage.getItem(QUIZ_STORAGE_DATA);
    const decks = JSON.parse(decksData);
    const deck = {
        id: deckId,
    };

    if(decks.length == 0){
        AsyncStorage.clear();
    }

    {Object.keys(decks).map((keyName, i) => {
        if(keyName === deck.id){
             delete decks[keyName]
            AsyncStorage.setItem(QUIZ_STORAGE_DATA, JSON.stringify(decks));
        } 
    })}

    return getDecks();
  }
