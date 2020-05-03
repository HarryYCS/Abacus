import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from '../components/firebaseConfig';
// End of firebase
// Start Imports
import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
// End of Imports

import { styles } from '../components/styles';

export default class HomeScreen extends React.Component {
  render () {
    const { navigate } = this.props.navigation;
    return (
    <Container style={styles.mainContainer}>
      <Button style={{ marginTop: 10}}
        full
        rounded
        success
        onPress = {()=> { navigate('Learn') }}
      >
        <Text style={{ color: 'white' }}>Learn</Text>
      </Button>
      <Button style={{ marginTop: 10}}
        full
        rounded
        success
        onPress = {()=> { navigate('Profile') }}
      >
        <Text style={{ color: 'white' }}>Profile</Text>
      </Button>
      <Button style={{ marginTop: 10}}
        full
        rounded
        success
        onPress = {()=> { navigate('Achievments') }}
      >
        <Text style={{ color: 'white' }}>Achievments</Text>
      </Button>
      <Button style={{ marginTop: 10}}
        full
        rounded
        success
        onPress = {()=> { navigate('Class') }}
      >
        <Text style={{ color: 'white' }}>Class</Text>
      </Button>
    </Container>
  );
  }
}
