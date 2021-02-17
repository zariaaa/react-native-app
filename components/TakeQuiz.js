
import React, {useState} from 'react';
import { StyleSheet, View , Text} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import * as actions from '../actions/allDecks';
import { Button , Card, CardItem } from 'native-base';
import {  MaterialCommunityIcons } from "@expo/vector-icons";

function TakeQuiz(props) {

  const { navigation, selectedDeck, allDecks } = props
    const deck = allDecks.filter(deck => deck.id === selectedDeck)[0]
    const questions = deck.questions

    const [isQuestion, showAnswer] = useState(true)
    const [correctAnswers, updateCorrectAnswers] = useState(0)
    const [incorrectAnswers, updateIncorrectAnswers] = useState(0)
    const [selectedQuestion, updateSelectedQuestion] = useState(0)

    const displayAnswer = () => showAnswer(!isQuestion);

    const rightAnswers = () => {
        if( questions[selectedQuestion].rightAnswer === "Yes" || questions[selectedQuestion].rightAnswer === "YES" || questions[selectedQuestion].rightAnswer === "yes"){
            updateSelectedQuestion(selectedQuestion + 1)
            updateCorrectAnswers(correctAnswers + 1)
            showAnswer(true)
        }
        else {
            updateSelectedQuestion(selectedQuestion + 1)
            updateIncorrectAnswers(incorrectAnswers + 1) 
            showAnswer(true)
        }
    }

     const wrongAnswers = () => {
        if( questions[selectedQuestion].rightAnswer === "No" || questions[selectedQuestion].rightAnswer === "no" || questions[selectedQuestion].rightAnswer === "NO"){
            updateSelectedQuestion(selectedQuestion + 1)
            updateCorrectAnswers(correctAnswers + 1)
            showAnswer(true)
        }
        else {
            updateSelectedQuestion(selectedQuestion + 1)
            updateIncorrectAnswers(incorrectAnswers + 1) 
            showAnswer(true)
        }
     }

    const restartQuiz = () => {
        updateSelectedQuestion(0)
        updateIncorrectAnswers(0)
        updateCorrectAnswers(0)
    }
    
    if (selectedQuestion === questions.length )
    {
        return (
            <View style={styles.quizComplete}>
                    <Text style={styles.quizCompleteText}> Quiz Completed</Text>
                    <Text style={styles.quizCompleteResults}> You have answered {Math.round((correctAnswers/questions.length) * 100 )}%</Text>
                    <Button block onPress={restartQuiz} style={styles.buttons}>
                        <Text style={styles.buttonsWhite} >RESTART QUIZ</Text>
                    </Button>
                    <Button block onPress={() => { navigation.navigate('Deck') }} style={styles.buttons}>
                        <Text style={styles.buttonsWhite}>BACK TO DECK</Text>
                    </Button>
            </View>
        )
    }
    
  return (
      <View style={styles.container}>
          <Card containerStyle={styles.container} style={styles.card} style={{ height: '50%' , backgroundColor: '#333' , border: 'none' , padding: 20}} >
              <CardItem button  containerStyle={styles.container} style={{ height: '100%', backgroundColor: '#333' , border: 'none'}}  onPress={displayAnswer}>
                  {isQuestion
                      ? <Text style={styles.text}>{questions[selectedQuestion].question}</Text>
                      : <Text style={styles.text}>{questions[selectedQuestion].answer}</Text>}
              </CardItem>
          
          </Card>
          {questions.length === selectedQuestion + 1
              ? <Text style={styles.questionsLeft}> Last question! </Text> 
              : 
              <Text style={styles.questionsLeft}>{questions.length - selectedQuestion - 1} questions remaining</Text> 
            }
          
          <View style={styles.actionButtons}>
              <View style={styles.buttonSection}>
                  <Button  
                    large 
                    onPress={rightAnswers } 
                    style={{ padding: '5%' , marginTop: '10%' , borderRadius: 100 , alignItems: 'center' , backgroundColor: '#087829'}}>
                        <MaterialCommunityIcons style={{ marginRight: 30 }} name="cards-heart" size={40} color="white" />
                        <Text style={styles.btnText}>Correct</Text>
                  </Button>
              </View>

              <View style={styles.buttonSection}>
                  <Button 
                    large  
                    style={{ padding: '5%' , marginTop: '10%', borderRadius: 100 , alignItems: 'center' , backgroundColor: '#990F02'}}
                    onPress={wrongAnswers}>
                        <Text style={styles.btnText}>Incorrect</Text>
                        <MaterialCommunityIcons style={{ marginLeft: 20 }} name="heart-broken" size={40} color="white" />
                  </Button>
             </View>
          </View>
</View>
  );
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(TakeQuiz);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#333',
        elevation: 0,
    },
    cardStyles:{
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        elevation: 0,
        shadowOpacity: 0, //default is 1
        shadowRadius: 0//default is 1
    },
    buttonsWhite:{
        color: '#fff',
    },
    card: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    btnText:{
        color: '#fff',
        textTransform: 'uppercase',
    },
    text: {
        fontSize: 26,
        fontWeight: '400',
        textAlign: 'center',
        color: 'rgb(255,255,255)',
    },
    actionButtons: {
        flexDirection: 'column',
         display: 'flex',
        justifyContent: 'center',
        alignItems:  'center',
    },
    questionsLeft: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        marginTop: 10,
    },
    quizComplete: {
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#333',
    },
    quizCompleteText: {
        fontSize: 30,
        fontWeight: '400',
        textAlign: 'center',
        color: 'rgb(255,255,255)',
        backgroundColor: '#333',
    },
    quizCompleteResults: {
        fontSize: 28,
        fontWeight: '400',
        textAlign: 'center',
        color: '#087829',
        backgroundColor: '#333',
        marginBottom: 20,
    }, 
    buttons: {
        margin: 15,
        fontSize: 92,
        height: 100,
        fontWeight: '600',
        textAlign: 'center',
    }
}
);

