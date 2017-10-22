import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import Question from './Question';
import { createDeck, createCard, getDecks } from '../utils/api';
import { receiveDecks, addDeck, setScore } from '../actions';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.flipCard = this.flipCard.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
    this.restartQuiz = this.restartQuiz.bind(this);
    this.state = {
      currentQuestion: 0,
      cardSide: 'front',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setScore(0))
  }

  restartQuiz() {
    console.log("restart quiz")
    this.setState({correctCount: 0})
    this.setState({currentQuestion: 0})
    this.setState({cardSide: 'back'})
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
    const { dispatch, deck, score } = this.props
    const { navigate } = this.props.navigation;

    console.log("answering question")
    console.log(this.state.currentQuestion)
    console.log(deck.cards.length)
    let currentScore = score.score
    if(isCorrect){
      console.log("####score before####")
      console.log(currentScore)
      console.log("####score before####")
      currentScore = currentScore + 1
      console.log("####score####")
      console.log(currentScore)
      dispatch(setScore(currentScore))
      console.log("####score####")
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
      this.setState({currentQuestion: 0})
      this.setState({cardSide: 'front'})
      console.log("go to results")
      console.log(deck)
      navigate(
        'ResultsView',
        {deck: deck}
      )
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
  }

  render() {
    const { deck, score } = this.props
    console.log("start.....")
    console.log(score.score)
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

function mapStateToProps (state, { navigation }) {
  const { deck } = navigation.state.params
  const { score } = state;

  return {
    deck,
    score,
  }
}

export default connect(mapStateToProps)(Quiz);
