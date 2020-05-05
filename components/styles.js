import React from 'react';
import { StyleSheet } from 'react-native';
import colours from '../components/colours';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colours.ColourSix,
    justifyContent: 'center',
    padding: 20,
  },
  secondContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  form:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  genericButton: {
    marginTop: 16,
    backgroundColor: colours.ColourThree,
    justifyContent: 'center',
    height: 50,
    width: '80%',
  },
  inputTextLabel: {
    color: colours.ColourTwo,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputText: {
    color: colours.Black,
    fontSize: 16,
    marginTop: 16,
    padding: 5,
    width: '100%',
  },
  genericButtonText:{
    color: colours.ColourSix,
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export { styles }
