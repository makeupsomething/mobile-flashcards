import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, TextInput } from 'react-native';
import { Provider, connect } from 'react-redux'

class CreateDeckModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Deck Name',
      modalVisible: false,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const {
      addDeckTest,
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
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />

            <TouchableHighlight onPress={() => {
              addDeckTest(this.state.text)
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Add Deck</Text>
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
          <Text>Add Deck</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(CreateDeckModal)
