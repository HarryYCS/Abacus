import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from '../components/firebaseConfig';

const db = firebase.firestore();

// End of firebase
// Start Imports
import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
// End of Imports

import { styles } from '../components/styles';

export default class LoginScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = ({
      email:'',
      password:''
    })
  }

signUpUser = (email, password)=> {
  try{
    if(this.state.password.length<6){
      alert("Please enter atleast 6 characters")
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email,password)
    var user = firebase.auth().currentUser
    console.log(user.uid)
    var uid = user.uid
    db.collection("subjects").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        db.collection("learner").doc(uid).collection("learningPercentage").doc(doc.id).set({
          percentage: 0,
        });
      });
    });

  }catch (error){
    console.log(error.toString())
  }
}

loginUser = (email, password)=> {
  try{
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => this.props.navigation.navigate('Home') )
  }catch (error){
    console.log(error.toString())
  }
}



  render () {
    const { navigate } = this.props.navigation;
    return (
    <Container style={styles.mainContainer}>
      <Form style={styles.form}>
        <Item floatingLabel>
          <Label style={styles.inputTextLabel}>Email</Label>
          <Input
            style={styles.inputText}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(email) => this.setState({email})}
          />
        </Item>
        <Item floatingLabel>
          <Label style={styles.inputTextLabel}>Password</Label>
          <Input
            style={styles.inputText}
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(password) => this.setState({password})}
          />
        </Item>
        <Button style={styles.genericButton}
          onPress = {()=> { this.loginUser(this.state.email, this.state.password) }}
        >
          <Text style={styles.genericButtonText}>Login</Text>
        </Button>
        <Button style={styles.genericButton}
          onPress = {()=> this.signUpUser(this.state.email, this.state.password)}
        >
          <Text style={styles.genericButtonText}>Sign Up</Text>
        </Button>
      </Form>
    </Container>
  );
  }
}
