
import React, { useState} from 'react';
import { StyleSheet,  View, TextInput , Text } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import * as actions from '../actions/allDecks';
import {  Button } from 'native-base';


const AddCard = ({ handleAddCard, selectedDeck, navigation })=> {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [rightAnswer, setRightAnswer] = useState('')

    const handleAddCardToDeck = () => {
        handleAddCard(selectedDeck, {question, answer , rightAnswer})
        navigation.navigate('Deck')
    }
  
  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input} 
                placeholder='Add Question' 
                placeholderTextColor="#ccc"  
                onChangeText={text => setQuestion(text)} 
                value={question} />
            <TextInput 
                style={styles.input} 
                placeholder='Add Answer' 
                placeholderTextColor="#ccc" 
                onChangeText={text => setAnswer(text)} 
                value={answer}/>
            <TextInput 
                style={styles.input} 
                placeholder='Add YES / NO' 
                placeholderTextColor="#ccc" 
                onChangeText={text => setRightAnswer(text)}  
                value={rightAnswer}/>
        </View>
          

        <Button block style={styles.buttons} onPress={handleAddCardToDeck} >
            <Text style={styles.titles} >Add New Card</Text>
        </Button>
    </View>
  );
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(AddCard);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        height: '100%',
    },
    buttons: {
        margin: 15,
        fontSize: 40,
        height: 60,
        marginTop: 60,
        marginBottom: 60,
        fontWeight: '400',
        textAlign: 'center',
        borderRadius: 100,
        backgroundColor: '#003366',
    },
    titles: {
        fontWeight: '400',
        fontSize: 18,
        margin: 10,
        color: 'rgb(255,255,255)'
    },
    inputContainer:{
        marginTop: 60,
    },
    input: {
        alignContent: 'center',
        fontSize: 14,
        textAlign: 'center',
        backgroundColor: '#333',
        borderBottomColor: '#F7AE00',
        borderBottomWidth: 1,
        margin: 10,
        padding: '5%',
        color: '#fff',
    }
});

