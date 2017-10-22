import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    alignSelf: 'center',
  },
})

class Question extends Component {
  render() {
    const { question, side } = this.props;

    function QuestionText(props) {
      const { question, side } = props;
      if (side === 'back') {
        return <Text style={styles.item}>{question.back}</Text>;
      }
      return <Text style={styles.item}>{question.front}</Text>;
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
