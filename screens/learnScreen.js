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
              console.log(currentCard)
              console.log(doc.data().Name)
            }
          })
        })
                      return currentCard;
      }

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
}




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
        <Button style={{ marginTop: 10}}
          full
          rounded
          success
          onPress = { () => this.updateQuestion() }
        >
          <Text style={{ color: 'white' } }>{this.state.currentQuestionContent}</Text>
        </Button>
        <Button style={{ marginTop: 10}}
          full
          rounded
          success
        >
          <Text style={{ color: 'white' } }>{this.state.currentQuestionOptionA}</Text>
        </Button>
        <Button style={{ marginTop: 10}}
          full
          rounded
          success
        >
          <Text style={{ color: 'white' } }>{this.state.currentQuestionOptionB}</Text>
        </Button>
        <Button style={{ marginTop: 10}}
          full
          rounded
          success
        >
          <Text style={{ color: 'white' } }>{this.state.currentQuestionOptionC}</Text>
        </Button>
    </Container>
  );
}
  }
}
