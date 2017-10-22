import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import Question from './Question';
import { createDeck, createCard, getDecks } from '../utils/api';
import { receiveDecks, addDeck, setScore } from '../actions';
import { white, purple, red, green } from '../utils/colors'

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    height: 150,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.7,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
})

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
    this.setState({correctCount: 0})
    this.setState({currentQuestion: 0})
    this.setState({cardSide: 'back'})
  }

  flipCard() {
    if(this.state.cardSide == 'front'){
      this.setState({cardSide: 'back'})
    } else {
      this.setState({cardSide: 'front'})
    }
  }

  answerQuestion(isCorrect){
    const { dispatch, deck, score } = this.props
    const { navigate } = this.props.navigation;
    let currentScore = score.score
    if(isCorrect){
      currentScore = currentScore + 1
      dispatch(setScore(currentScore))
    }
    if(this.state.currentQuestion + 1 < deck.cards.length ) {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1
      })
      this.setState({
        cardSide: 'front'
      })
    } else {
      this.setState({currentQuestion: 0})
      this.setState({cardSide: 'front'})
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
    function ButtonGroup(props) {
      const { flipCard, answerQuestion, side } = props;
      if (side == 'back') {
        return  <View>
                  <Button
                    onPress={flipCard}
                    title="Flip Card"
                    color="#839484"
                    accessibilityLabel="Flip Card"
                  />
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center',}}>
                    <Button
                      style={{marginLeft: 5, width: 50, height: 50, backgroundColor: 'powderblue'}}
                      onPress={() => answerQuestion(true)}
                      title="Correct"
                      color="#839484"
                      accessibilityLabel="Correct"
                    />
                    <Button
                      style={{marginRight: 5, width: 50, height: 50, backgroundColor: 'powderblue'}}
                      onPress={() => answerQuestion(false)}
                      title="Wrong"
                      color="#839484"
                      accessibilityLabel="Correct"
                    />
                  </View>
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
      <View style={styles.item}>
        <Text>Question {this.state.currentQuestion+1}/{deck.cards.length}</Text>
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
