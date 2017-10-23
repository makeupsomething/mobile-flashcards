import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, TextInput, StyleSheet } from 'react-native';
import { Provider, connect } from 'react-redux'
import { white, gray } from '../utils/colors'
import { createDeck, createCard, getDecks } from '../utils/api';
import { receiveDecks, addDeck } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: gray,
    padding: 30,
    borderRadius: 7,
    height: 20,
    marginLeft: 55,
    marginRight: 55,
    marginTop: 55,
    justifyContent: 'center'
  },
  addDeckButton: {
    backgroundColor: gray,
    padding: 30,
    borderRadius: 7,
    height: 20,
    marginLeft: 55,
    marginRight: 55,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center'
  },
})

class CreateCardModal extends Component {
  constructor(props) {
    super(props);
    this.addCardTest = this.addCardTest.bind(this);
    this.state = {
      question: 'question',
      answer: 'answer',
      modalVisible: false,
    };
  }

  addCardTest(question, answer) {
    const { dispatch, decks, deck } = this.props
    console.log("ADD CARD TO DECK")
    console.log(deck)
    console.log("########")
    let id = Math.floor(Math.random() * 90000) + 10000;
    const tempCard = { id: id, front: question, back: answer };
    console.log("########ADDING CARD TO############")
    console.log(deck.id)
    console.log("########ADDING CARD TO############")
    createCard(decks.decks, deck, deck.id, tempCard)
    .then(decks => dispatch(receiveDecks(decks)))
    this.setModalVisible(!this.state.modalVisible)
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {

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
              style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 150, alignSelf: 'center'}}
              onChangeText={(text) => this.setState({question: text})}
              value={this.state.question}
            />
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 150, alignSelf: 'center'}}
              onChangeText={(text) => this.setState({answer: text})}
              value={this.state.answer}
            />
            <View  style={{flex: 1, flexDirection: 'row', justifyContent: 'center',}}>
              <TouchableHighlight style={styles.iosSubmitBtn} onPress={() => {
                this.addCardTest(this.state.question, this.state.answer)
              }}>
                <Text>Add Card</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.iosSubmitBtn} onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}>
                <Text>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
         </View>
        </Modal>
        <TouchableHighlight style={styles.iosSubmitBtn} onPress={() => {
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
