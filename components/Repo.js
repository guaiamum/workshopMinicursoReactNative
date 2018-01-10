import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class Repo extends Component<{}> {
  render() {
    return (
        <View style={styles.repo}>

          <Image
            style={styles.repoImage}
            source={{uri: this.props.data.thumbnail}}
            />

          <View style={styles.repoInfo}>
            <Text style={styles.repoTitle}> {this.props.data.title} </Text>
            <Text style={styles.repoDescrip}> {this.props.data.description} </Text>
          </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  repo: {
    padding : 20,
    backgroundColor: '#FFF',
    marginBottom: 20,
    flexDirection: 'row',
  },

  repoImage: {
    height: 50,
    width: 50,
  },

  repoInfo: {
    margin: 10,
  },

  repoTitle: {
    fontWeight: 'bold',
  },

  repoDescrip: {
    fontSize: 10,
    color: '#848484'
  },
});
