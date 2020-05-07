import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from '../components/firebaseConfig';
// End of firebase
// Start Imports
import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
// End of Imports
const db = firebase.firestore();

var cardId = 0;

import { styles } from '../components/styles';

export default class LearnScreen extends React.Component {

  constructor(props) {
        super(props)
        this.state = {
           loading: false,
           currentQuestionContent: 'Press to play',
           currentQuestionOptionA: '',
           currentQuestionOptionB: '',
           currentQuestionOptionC: '',
           currentCardId: '',
        }
     }

  async getSubjectOfLevel(level) {
    var subjectsId = [];
    await db.collection('subjects').get().then(snapshot => {
      snapshot.forEach(doc => {
          if(doc.data().Level == level){
            subjectsId.push(doc.id);
          }
        });
      });
    return subjectsId;
  };

    async getSubject(subjectsId) {
      var user = firebase.auth().currentUser
      var uid = user.uid
      var currentLearningPercentage = 101
      var currentSubjectId
      await db.collection("learner").doc(uid).collection("learningPercentage").get().then(snapshot => {
        snapshot.forEach(doc => {
          if(subjectsId.includes(doc.id)){
            if(doc.data().percentage < currentLearningPercentage) {
              currentSubjectId = doc.id
              currentLearningPercentage = doc.data().percentage
            }
          }
        });
      });
    return currentSubjectId;
  };

  async getCards(subId) {
      var cardIds = [];
      var currentId = subId
      await db.collection('cards').get().then(snapshot => {
        snapshot.forEach(doc => {
            console.log(currentId)
            if(doc.data().SubjectId == currentId){
              console.log("Hello")
              cardIds.push(doc.id);
            }
          });
        });
      return cardIds;
  };

      async getRandomCard(cardsIds) {
        var arrayLen = cardsIds.length
        var randomNum = Math.floor(0 + Math.random() * (arrayLen - 1))
        var randomCard = cardsIds[randomNum]
        let currentCard;
        await db.collection("cards").get().then(snapshot => {
          snapshot.forEach(doc => {
            if(doc.id == randomCard){
              currentCard = (doc.data());
              this.currentCardId = randomCard;
              console.log(this.currentCardId)
              console.log(currentCard)
              console.log(doc.data().Name)
            }
          })
        })
                      return currentCard;
    };

async  getQuestion(level) {
    var currentCard
    var ids = await this.getSubjectOfLevel(level);
    console.log(ids);
    let subId = await this.getSubject(ids);
    console.log(subId);
    var cards = await this.getCards(subId);
    console.log(cards);
    let randomCard = await this.getRandomCard(cards);
    console.log(randomCard)
    return randomCard;
  };

async updateQuestion() {
  this.setState({currentQuestionContent: 'loading...'})
  var currentCard = await this.getQuestion(1);
  console.log(currentCard)
  this.setState({currentQuestionContent: currentCard.Content, currentQuestionOptionA: currentCard.OptionA, currentQuestionOptionB: currentCard.OptionB, currentQuestionOptionC: currentCard.OptionC })
  return;
};

  async optionSelected(option) {
    this.setState({currentQuestionContent: 'Tap for new question'})
    let currentCard = await this.getRandomCard(this.currentCardId);
    var user = firebase.auth().currentUser
    console.log(user.uid)
    var uid = user.uid
    console.log('test 12')
    console.log(uid)
    let newPercentage = 0;
    let subjectId = currentCard.SubjectId.toString();
    if (currentCard.CorrectChoice == option){
      console.log('test 1');
      db.collection("learner").doc(uid).collection("learningPercentage").get().then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id)
          if (doc.id == subjectId) {
            console.log(doc.data().percentage)
            newPercentage = doc.data().percentage
            if( newPercentage < 25 ){
              newPercentage = newPercentage + 15
            } else if ( newPercentage < 50 ) {
              newPercentage = newPercentage + 10
            } else if ( newPercentage < 75 ) {
              newPercentage = newPercentage + 5
            } else if ( newPercentage < 90 ){
              newPercentage = newPercentage + 3
            } else {
              newPercentage = newPercentage + 1
            }
          }
        })
      });
      console.log(newPercentage)
      db.collection("learner").get().then(function(){
          db.collection("learner").doc(uid).collection("learningPercentage").doc(subjectId).set({
            percentage: newPercentage,
          });
        }
      );
      alert('Well Done');
    } else {
      console.log('test 1');
      db.collection("learner").doc(uid).collection("learningPercentage").get().then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id)
          if (doc.id == subjectId) {
            console.log(doc.data().percentage)
            newPercentage = doc.data().percentage
            if( newPercentage > 80 ){
              newPercentage = newPercentage - 15
            } else if ( newPercentage > 50 ) {
              newPercentage = newPercentage - 10
            } else if ( newPercentage > 20 ) {
              newPercentage = newPercentage - 5
            } else if ( newPercentage > 0 ){
              newPercentage = newPercentage - 1
            } else {
              newPercentage = newPercentage
            }
          }
        })
      });
      console.log(newPercentage)
      db.collection("learner").get().then(function(){
          db.collection("learner").doc(uid).collection("learningPercentage").doc(subjectId).set({
            percentage: newPercentage,
          });
        }
      );
      alert('Unlucky, better luck next time');
    }
    return;
  };



  render () {
    const { navigate } = this.props.navigation;
    if (this.state.loading){
      return (
        <Container style={styles.mainContainer}>
          <Text >loading...</Text>
        </Container>
      );
    }else{
    return (
    <Container style={styles.mainContainer}>
      <Container style={styles.secondContainer}>
        <Button style={styles.genericButton}
          onPress = { () => this.updateQuestion() }
        >
          <Text style={styles.genericButtonText}>{this.state.currentQuestionContent}</Text>
        </Button>
        <Button style={styles.genericButton}
        onPress = { () => this.optionSelected('A') }
        >
          <Text style={styles.genericButtonText}>{this.state.currentQuestionOptionA}</Text>
        </Button>
        <Button style={styles.genericButton}
        onPress = { () => this.optionSelected('B') }
        >
          <Text style={styles.genericButtonText}>{this.state.currentQuestionOptionB}</Text>
        </Button>
        <Button style={styles.genericButton}
        onPress = { () => this.optionSelected('C') }
        >
          <Text style={styles.genericButtonText}>{this.state.currentQuestionOptionC}</Text>
        </Button>
      </Container>
    </Container>
  );
}
  }
}
