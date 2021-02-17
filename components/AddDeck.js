
import React, { useState} from 'react';
import { StyleSheet, View, TextInput , Text } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import * as actions from '../actions/allDecks'
import { Button } from 'native-base';


const AddDeck = ({ addDecks, navigation }) => {
    const [title, setTitle] = useState('');

    const handleAddCurrentDeck = () => {
        addDecks(title);
        navigation.navigate('Home');
    }
  
  return (
      <View style={styles.container}>
            <TextInput 
                style={styles.input} 
                placeholder="Add Title of Deck" 
                placeholderTextColor="#ccc" 
                onChangeText={text => setTitle(text)}
                value={title} />

            <Button block light style={styles.buttons} title='Create New Deck' onPress={handleAddCurrentDeck} >
                <Text style={styles.titles}>Create New Deck</Text>
            </Button>
    </View>
  );
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch)

export default compose(connect(mapStateToProps, mapDispatchToProps))(AddDeck)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        height: '100%',
    },
    buttons: {
        margin: 15,
        marginTop:40,
        height: "10%",
        fontSize: 40,
        fontWeight: '600',
        textAlign: 'center',
        backgroundColor: '#003366',
        borderRadius: 100,
    },
    deckContainer:{
    },
    titles: {
        fontWeight: '400',
        fontSize: 22,
        margin: 10,
        color: 'rgb(255,255,255)'
    },
    input: {
        alignContent: 'center',
        fontSize: 14,
        textAlign: 'center',
        backgroundColor: '#333',
        borderBottomColor: '#F7AE00',
        borderBottomWidth: 1,
        margin: 10,
        marginTop: 40,
        padding: '5%',
        color: '#fff',
    }
});
