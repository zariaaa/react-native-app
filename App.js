
import React, { useEffect } from 'react';
import { StyleSheet} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { setLocalNotification } from './utils/helper';

import { store } from './middleware/index';
import { Provider } from 'react-redux';

import Deck from './components/Deck';
import Home from './components/Home';
import AddCard from './components/AddCard';
import AddDeck from './components/AddDeck';
import TakeQuiz from './components/TakeQuiz';

const Stack = createStackNavigator()

export default function App(){

    useEffect(() => {
       let tomorrow = new Date();
                tomorrow.setSeconds(10)
       setLocalNotification()
     }, [])

  return (
    
    <Provider store={store}>
            <NavigationContainer style={{ backgroundColor: '#333'}}>
                <Stack.Navigator 
                    style={styles.container}  >
                    <Stack.Screen 
                        name="Home" 
                        component={Home} 
                        options={{ 
                            title: 'Home', 
                            headerStyle: {
                                backgroundColor: '#333',
                            },
                            headerTitleStyle: {
                                color: 'white',
                            },
                            headerTintColor: '#fff',
                        }}
                    />
                    <Stack.Screen 
                        name="Deck" 
                        component={Deck} 
                        options={{ 
                            title: 'Current Deck', 
                            headerStyle: {
                                backgroundColor: '#333',
                            },
                            headerTitleStyle: {
                                color: 'white',
                            },
                            headerTintColor: '#fff',
                        }}
                    />
                    <Stack.Screen 
                        name="AddCard" 
                        component={AddCard} 
                        options={{ 
                            title: 'Add New Card', 
                            headerStyle: {
                                backgroundColor: '#333',
                            },
                            headerTitleStyle: {
                                color: 'white',
                            },
                            headerTintColor: '#fff',
                        }}
                    />
                    <Stack.Screen 
                        name="AddDeck" 
                        component={AddDeck} 
                        options={{ 
                            title: 'Add New Deck', 
                            headerStyle: {
                                backgroundColor: '#333',
                            },
                            headerTitleStyle: {
                                color: 'white',
                            },
                            headerTintColor: '#fff',
                        }}
                    />
                    <Stack.Screen name="TakeQuiz" component={TakeQuiz} 
                        options={{ 
                            title: 'Take Quiz', 
                            headerStyle: {
                                backgroundColor: '#333',
                            },
                            headerTitleStyle: {
                                color: 'white',
                            },
                            headerTintColor: '#fff',
                        }}
                    />
                </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'red',
  },
});
