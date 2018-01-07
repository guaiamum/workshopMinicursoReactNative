import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Repo from './components/Repo';
import NewRepoModal from './components/NewRepoModal';

export default class App extends Component<{}> {
  state = {
    modalVisible: false,
    repos: [
      // {id:1,title: 'Oi',description: 'oioioi.com.br',thumbnail: 'https://avatars1.githubusercontent.com/u/21321095?s=460&v=4'},
      // {id:2,title: 'Tchau',description: 'tchaaau.net',thumbnail: 'https://avatars1.githubusercontent.com/u/21321095?s=460&v=4'}
    ],
  }

  _addRepo = async (newRepoText ) => {
    try{
      const repoCall = await fetch(`https://api.github.com/repos/${newRepoText}`);
      console.warn(repoCall);
      const response = repoCall.json();
      const repo = {
        id: response.id,
        title: response.name,
        description: response.html_url,
        thumbnail: response.owner.avatar_url
        // thumbnail: "https://avatars2.githubusercontent.com/u/2254731?v=4"
      };

      this.setState({
        modalVisible: false,
        repos: [
          ...this.state.repos,
          repo
        ]
      })
    } catch(err) {
      console.warn("fuck: " + err);
    }
  }

  render() {
    return (
      <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}> MiniCurso React Native!</Text>
        <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
          <Text style={styles.addButton}> + </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.repoList}>
        {this.state.repos.map(repo => <Repo key={repo.id} data={repo} />)}
      </ScrollView>

      <NewRepoModal
        onCancel={() => this.setState({modalVisible: false})}
        onAdd={this._addRepo}
        visible={this.state.modalVisible}
        />

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },

  header: {
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    height: (Platform.OS === 'ios') ? 50 : 70,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },

  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  repoList: {
    padding : 20,
  },

  addButton: {
    fontSize: 24,
    paddingHorizontal: 20,
    fontWeight: 'bold',
  },

  repo: {
    padding : 20,
    backgroundColor: '#FFF',
    height: 12,
    marginBottom: 20,
  },
});