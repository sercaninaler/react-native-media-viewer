import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import firebase from 'firebase';
import firebaseConfig from './firebase.config.js';
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class ChatBot extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  handleLoginClick() {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      webClientId: '824972688539-niq93qbc71bbin9pov0p37ujf3st167i.apps.googleusercontent.com',
      offlineAccess: true,
      forceConsentPrompt: true
    }).then(() => {
      GoogleSignin.signIn().then((user) => {
        this.setState({user: user});
        console.log(user);
      }).catch((err) => {
      }).done();
    });
  }

  handleLogoutClick() {
    GoogleSignin.signOut().then(() => {
      this.setState({user: null});
    }).catch((err) => {
    }).done();
  }

  render() {

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./public/chat.png')}/>
        <Text style={styles.welcome}>
          React Native Firebase Chat Bot
        </Text>

        {!this.state.user && <Text style={styles.instructions}>
          Login
        </Text>}

        {!this.state.user && <GoogleSigninButton
          style={{50, height: 50}}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => this.handleLoginClick()} />}

        {this.state.user && <Text style={styles.instructions} onPress={() => this.handleLogoutClick()}>
          Logout - {this.state.user.email}
        </Text>}
      </View>
        )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6541a5',
  },
  logo: {
    height: 100,
    width: 100
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 15,
    marginTop: 0,
    color: '#FFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#FFF',
    marginBottom: 5,
    fontSize: 20,
  },
});

AppRegistry.registerComponent('ChatBot', () => ChatBot);
