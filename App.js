import React from 'react';
import styled from 'styled-components';
import { StyleSheet, Text, View } from 'react-native';
import firebase from './components/firebaseConfig';
const db = firebase.firestore();
import LoginScreen from './screens/loginScreen';
import HomeScreen from './screens/homeScreen';
import LearnScreen from './screens/learnScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// End of firebase
// Start Imports
import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
// End of Imports
import colours from './components/colours';

const MainNav = createStackNavigator ({
  Login: LoginScreen,
  Home: HomeScreen,
  Learn: LearnScreen,
},{
  headerMode: 'none',
});

const App = createStackNavigator (
  {
    MainNav: MainNav,
  },
  {
    defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colours.ColourTwo,
      height: 70,
    },
    headerTitleStyle: {
      fontSize: 30,
      marginBottom: 10,
    },
    headerTintColor: colours.ColourSix,
    title: "Abacus",
    headerLeft: () => null,

  }
  }
)

export default createAppContainer (App);
