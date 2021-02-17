
import React from 'react';
import { StyleSheet,  View , Text  } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import { removeDeck } from '../utils/api';
import * as actions from '../actions/allDecks'
import { Button, Card } from 'native-base';

const Deck = props => {
  const { allDecks, selectedDeck, deleteDeck, navigation, selectDeck } = props;
  const deck = allDecks.filter(deck => deck.id === selectedDeck)[0];

  const handleDeleteDeck = () => {
    deleteDeck(selectedDeck);
    removeDeck(selectedDeck);
    selectDeck('');
    navigation.navigate('Home');
  } 
  if (deck === undefined) return null;
  
  return (
    <View style={styles.container}>
      <Card style={{ elevation: 0, height: '100%' , backgroundColor: '#333' , border: 'none'}}>
            <Text style={styles.header}>1 {deck.title}</Text>
            <Text style={styles.subtitle}>{deck.questions.length} cards</Text>
            <Button 
                style={styles.buttons} 
                block title='Start Quiz' 
                onPress={() => navigation.navigate('TakeQuiz')}>
                <Text style={styles.buttonText}>Start Quiz</Text>
            </Button>
            <Button 
                style={styles.buttons} 
                block 
                title='Add new Card' 
                onPress={() => navigation.navigate('AddCard')}>
                <Text style={styles.buttonText}>Add Card</Text>
            </Button>
            <Button 
                style={styles.buttons} 
                block 
                title='Delete Deck' onPress={handleDeleteDeck}>
                <Text style={styles.buttonText} >Delete Deck</Text>
            </Button>
        </Card>
    </View>
  );
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch)

export default compose(connect(mapStateToProps, mapDispatchToProps))(Deck)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
  },
  header: {
    fontSize: 36,
    fontWeight: '400',
    textAlign: 'center',
    margin: 30,
    marginTop: 60,
    color: 'rgb(255,255,255)',
  },
  buttons: {
    margin: 15,
    height: "10%",
    fontSize: 62,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: '#003366',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 23,
    fontWeight: '600',
    color: '#fff',
  },
  subtitle: {
    fontSize: 32,
    textAlign: 'center',
    margin: 20,
    color: '#F7AE00'
  }
});
