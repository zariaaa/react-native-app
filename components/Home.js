
import React, { useEffect }  from 'react';
import { StyleSheet, View , ScrollView, SafeAreaView , Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as actions from '../actions/allDecks';
import {  Button } from 'native-base';



function Home(props){
  const { navigation, getAllDecks, selectDeck, allDecks } = props;
  useEffect(() => { getAllDecks() }, [])

  const openDeck = (id) => {
    selectDeck(id)
    navigation.navigate('Deck')
  }


  return (
    <SafeAreaView style={styles.container}>
        <Button block rounded style={ styles.newDeckButton} onPress={() => navigation.navigate('AddDeck')} ><Text style={ styles.newDeckButtonText}>+</Text></Button>
        <ScrollView >
            <View style={{height: '100%' ,  elevation: 0,}}>
                {allDecks.map(deck => {
                    return (
                    <Button block style={styles.buttons} key={deck.id} onPress={() => openDeck(deck.id)} >
                        <Text style={styles.titles}>{deck.title}</Text>
                        <Text style={styles.deckQuestions}>{deck.questions.length}</Text>
                    </Button>
                    )
                })}
            </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch)

export default compose(connect(mapStateToProps, mapDispatchToProps))(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    elevation: 0,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  deckQuestions:{
    color: '#F7AE00',
    alignItems: 'center',
    fontSize: 18,
  },
  buttons: {
    margin: 15,
    fontSize: 92,
    height: 100,
    fontWeight: '400',
    textAlign: 'center',
    backgroundColor: '#003366',
    borderRadius: 500,
  },
  titles: {
    fontWeight: '400',
    fontSize: 24,
    margin: 10,
    color: 'rgb(255,255,255)'
  },
  newDeckButtonText: {
    alignItems: 'center',
    color: '#fff',
    fontSize: 24,
    },
  newDeckButton: {
    bottom:60,
    right: 30,
    position: 'absolute',
    zIndex:1,
    backgroundColor: 'blue',
    width: 50,
    },
});

