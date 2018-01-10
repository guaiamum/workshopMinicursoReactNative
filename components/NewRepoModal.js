import React, {Component} from 'react';

import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class NewRepoModal extends Component {
  state = {
    // newRepoText: 'guaiamum/XamarinFest',
    newRepoText: '',
  }

  render() {
    return (
      <Modal animationType='fade' transparent={true} visible={this.props.visible} onRequestClose={() => {}}>

        <View style={styles.modalContainer}>
          <View style={styles.boxContainer}>
            <Text style={styles.boxTitle}> Add Repo</Text>
              <TextInput
                autofocus
                autoCapitalize='none'
                style={styles.boxInput}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="organization/repository"
                value={this.state.newRepoText}
                onChangeText={newRepoText => this.setState({newRepoText})}
                />

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton ]}
                  onPress={this.props.onCancel}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.submitButton ]}
                  onPress={() => this.props.onAdd(this.state.newRepoText)}>
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>

      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',

  },

  boxContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    width: 280,
  },

  boxTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  boxInput: {
    // backgroundColor: '#DDD', /*
    borderWidth: 1,
    borderColor: '#DDD',//*/
    marginVertical: 10,
    alignSelf: 'stretch',
    padding: 15,
  },

  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    padding: 10,
    marginHorizontal: 2,
  },

  buttonText: {
    fontWeight: 'bold',
    color: "#FFF",
  },

  cancelButton: {
    backgroundColor: '#ff5252'
  },

  submitButton: {
    backgroundColor: '#4caf50'
  },
});
