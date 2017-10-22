import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, TextInput } from 'react-native';
import { Provider, connect } from 'react-redux'

class CreateCardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 'question',
      answer: 'answer',
      modalVisible: false,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const {
      addCardTest,
    } = this.props;

    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({question: text})}
              value={this.state.question}
            />
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({answer: text})}
              value={this.state.answer}
            />

            <TouchableHighlight onPress={() => {
              addCardTest(this.state.question, this.state.answer)
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Add Card</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Close</Text>
            </TouchableHighlight>
          </View>
         </View>
        </Modal>
        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Add Card</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

function mapStateToProps(state) {
  const { decks, score } = state;
  return {
    decks,
    score,
  };
}

export default connect(mapStateToProps)(CreateCardModal);
