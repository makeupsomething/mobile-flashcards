import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Question extends Component {
  render() {
    const { question, side } = this.props;

    function QuestionText(props) {
      const { question, side } = props;
      console.log(question)
      if (side === 'back') {
        return <Text>{question.back}</Text>;
      }
      return <Text>{question.front}</Text>;
    }

    return (
      <View>
        <QuestionText
          side={side}
          question={question}
        />
      </View>
    );
  }
}

export default Question;
