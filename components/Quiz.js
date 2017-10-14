import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import Question from './Question';
import { createDeck, createCard, getDecks } from '../utils/api';
import { receiveDecks, addDeck } from '../actions';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.flipCard = this.flipCard.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
    this.state = {
      currentQuestion: 0,
      cardSide: 'front',
      correctCount: 0,
    };
  }

  flipCard() {
    console.log("flipCard")
    if(this.state.cardSide == 'front'){
      this.setState({cardSide: 'back'})
    } else {
      this.setState({cardSide: 'front'})
    }
  }

  answerQuestion(isCorrect){
    const { deck } = this.props
    const { navigate } = this.props.navigation;

    console.log("answering question")
    console.log(this.state.currentQuestion)
    console.log(deck.cards.length)
    if(isCorrect){
      this.setState({
        correctCount: this.state.correctCount + 1
      })
    }
    if(this.state.currentQuestion + 1 < deck.cards.length ) {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1
      })
      this.setState({
        cardSide: 'front'
      })
    } else {
      console.log("quiz over")
      navigate('ResultsView', {deck: deck})
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
  }

  render() {
    const { deck } = this.props

    function ButtonGroup(props) {
      const { flipCard, answerQuestion, side } = props;
      console.log("current question")
      if (side == 'back') {
        return  <View>
                  <Button
                    onPress={flipCard}
                    title="Flip Card"
                    color="#839484"
                    accessibilityLabel="Flip Card"
                  />
                  <Button
                    onPress={() => answerQuestion(true)}
                    title="Correct"
                    color="#839484"
                    accessibilityLabel="Correct"
                  />
                  <Button
                    onPress={() => answerQuestion(false)}
                    title="Wrong"
                    color="#839484"
                    accessibilityLabel="Correct"
                  />
                </View>
      }
      return <Button
                onPress={flipCard}
                title="Flip Card"
                color="#839484"
                accessibilityLabel="Flip Card"
              />
    }
    console.log("doing quiz of deck")
    console.log(this.state.currentQuestion)
    console.log(deck)
    return (
      <View>
        <Text>Quiz!</Text>
        <Question
          question={deck.cards[this.state.currentQuestion]}
          side={this.state.cardSide}
        />
        <ButtonGroup
          side={this.state.cardSide}
          flipCard={() => {
            this.flipCard();
          }}
          answerQuestion={(isCorrect) => {
            this.answerQuestion(isCorrect);
          }}
        />
      </View>
    )
  }
}

function mapStateToProps (decks, { navigation }) {
  const { deck } = navigation.state.params

  return {
    deck,
  }
}

export default connect(mapStateToProps)(Quiz);
