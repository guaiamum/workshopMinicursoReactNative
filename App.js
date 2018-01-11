import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  AsyncStorage,
  View
} from 'react-native';

import Repo from './components/Repo';
import NewRepoModal from './components/NewRepoModal';

export default class App extends Component<{}> {
  state = {
    modalVisible: false,
    repos: [ ],
  }

  async componentDidMount(){
    //loads data
    const repos = JSON.parse(await AsyncStorage.getItem('@MiniCurso:repos')) || [ ];

    this.setState({repos});
  }

  _addRepo = async (newRepoText ) => {
    try{
      const options = { headers: {  method: 'GET',
        'User-Agent': 'myWorkshopApp', } };
      const repoCall = await fetch(`https://api.github.com/repos/${newRepoText}`, options);
      const response = await repoCall.json();

      const repo = {
        id: response.id,
        title: response.name,
        description: response.html_url,
        thumbnail: response.owner.avatar_url
      };

      this.setState({
        modalVisible: false,
        repos: [
          ...this.state.repos,
          repo
        ]
      })

      await AsyncStorage.setItem('@MiniCurso:repos',JSON.stringify(this.state.repos));
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
    height: (Platform.OS === 'ios') ? 70 : 50,
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
