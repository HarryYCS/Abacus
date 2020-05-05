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
      <Container style={styles.secondContainer}>
        <Button
          style={styles.genericButton}
          onPress = {()=> { navigate('Learn') }}
        >
          <Text style={styles.genericButtonText}>Learn</Text>
        </Button>
        <Button
          style={styles.genericButton}
          onPress = {()=> { navigate('Profile') }}
        >
          <Text style={styles.genericButtonText}>Profile</Text>
        </Button>
        <Button
          style={styles.genericButton}
          onPress = {()=> { navigate('Achievments') }}
        >
          <Text style={styles.genericButtonText}>Achievments</Text>
        </Button>
        <Button
          style={styles.genericButton}
          onPress = {()=> { navigate('Class') }}
        >
          <Text style={styles.genericButtonText}>Class</Text>
        </Button>
      </Container>
    </Container>
  );
  }
}
