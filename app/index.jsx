import React from 'react';
import ReactDOM from 'react-dom';
import style from '../styles/chat.scss';
import Scrollbars from 'react-custom-scrollbars';
import Spinner from 'react-spinner';
import Rebase from 're-base';
import Firebase from 'firebase';

import prettyMs from 'pretty-ms';
import FontAwesome  from 'react-fontawesome';
import fetchJsonp from 'fetch-jsonp';

import firebaseConfig from '../firebase.config.js';
var firebase = Firebase.initializeApp(firebaseConfig, 'Chat');


const base = Rebase.createClass(firebase.database());

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loading: false
    };

    this.time = new Date().getTime();
    let uid = localStorage.getItem('uid');
  }

  focus() {
    this.messageInput.focus();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.state.uid && this.state.messages) {
      setInterval(() => {
        const node = ReactDOM.findDOMNode(this.refs["bottom"]);
        node.scrollIntoView();
      }, 500);
    }
  }

  sendMessage() {
    let message = this.messageInput.value;
    let nick = this.state.nick;
    let messages = this.state.messages;

    if (message.trim() != "") {

      messages.push({
        nick: nick,
        message: message,
        time: new Date().getTime()
      });

      this.messageInput.value = '';

      this.setState({
        messages: messages,
        sendButton: false
      });

      let that = this;

      let url = window.location.href;
      let arr = url.split("/");

      fetchJsonp(arr[0] + '//www.cleverbot.com/getreply?key=3cb05a2e610b65b1b699fbc022507467&input=' + message)
        .then(function (response) {
          return response.json()
        }).then(function (json) {
        //console.log('parsed json', json);
        messages.push({
          nick: "Bot",
          message: json.output,
          time: new Date().getTime()
        });

        that.time = new Date().getTime();
        that.setState({
          messages: messages
        });

      }).catch(function (ex) {
        console.log('parsing failed', ex)
      });
    }
  }

  handleSendClick(event) {
    event.preventDefault();
    this.sendMessage();
  }

  handleMessageChange(event) {
    let message = this.messageInput.value;

    if (message.trim().length > 0) {
      this.setState({
        sendButton: true
      });
    } else {
      this.setState({
        sendButton: false
      });
    }

    if (event.key == 'Enter') {
      this.sendMessage();
    }
  }

  handleLoginClick(e, provider) {
    e.preventDefault();
    if (provider === 'google') {
      provider = new Firebase.auth.GoogleAuthProvider();
    } else if (provider === 'facebook') {
      provider = new Firebase.auth.FacebookAuthProvider();
    } else if (provider === 'github') {
      provider = new Firebase.auth.GithubAuthProvider();
    }
  
    firebase.auth().signInWithRedirect(provider).then(function(result) {
      console.log(result);
    }).catch(function(error) {
      console.log(error);
    });
  };

  handleSignOutClick(event) {
    event.preventDefault();
    localStorage.removeItem('uid');
    base.unauth();
    this.setState({uid: null});
  }

  render() {
    let messages = this.state.messages;
    let sameNick = true;
    let showNick = true;
    let that = this;
    let uid = this.state.uid;

    return (
      <div>
        {uid != null && <a href="#"
                      ref="sign-out"
                      className="sign-out"
                      onClick={(e) => this.handleSignOutClick(e)}>
          <FontAwesome name="sign-out" />
        </a>}

        {this.state.loading == true &&
        <div className="spinner">
          <Spinner />
        </div>
        }

        {uid != null && <div className="messages">
          <Scrollbars className="scroll">
            {this.state.nick && messages.length == 0 && <div>
              <div className="text">
                <span className="body">Bot enters chat...</span>
              </div>
              <div className="text">
                <span className="body">{this.state.nick} enters too... Start by saying "Hello" :)</span>
              </div>
            </div>}

            {this.state.nick && messages.map((result, index) => {
              if (index > 0) {
                if (messages[index - 1].nick != messages[index].nick) {
                  sameNick = !sameNick;
                  showNick = true
                } else {
                  showNick = false
                }
              }

              return (<div key={index} className={"message " + sameNick}>
                {showNick && result.nick && <div className="nick">{result.nick}</div>}
                <div className="text">
                  <span className="body">{result.message}</span>
                  <span
                    className="time">{that.time > result.time && prettyMs(that.time - result.time, {secDecimalDigits: 0})}{that.time <= result.time && "now"}
                </span>
                </div>
              </div>)
            })}

            <div ref="bottom" />
          </Scrollbars>
        </div>}

        {uid == null && <div className="login">
          <div className="header">
            <h1>
              <FontAwesome name="comments" />
              <span>ChatBot Demo 1.2</span>
            </h1>
            <h3>Please login with your provider</h3>
          </div>

          <a href="#"
             ref="google"
             onClick={(e) => this.handleLoginClick(e, "google")}>
            <FontAwesome name="google-plus-square" /> <span>Google</span>
          </a>
          <a href="#"
             ref="facebook"
             onClick={(e) => this.handleLoginClick(e, "facebook")}>
            <FontAwesome name="facebook-square" /> <span>Facebook</span>
          </a>

          <a href="#"
             ref="github"
             onClick={(e) => this.handleLoginClick(e, "github")}>
            <FontAwesome name="github-square" /> <span>Github</span>
          </a>

          {this.state.error &&
            <div className="error">{this.state.error}</div>
          }
        </div>}

        {uid != null && <div className="footer">
          <input ref={(input) => { this.messageInput = input; }}
                 type="text"
                 placeholder={"Send new message"}
                 className="newMessage"
                 onClick={() => this.scrollToBottom()}
                 onKeyUp={(e) => this.handleMessageChange(e)} />
          {this.state.sendButton && <a href="#"
             ref="send"
             className="send"
             onClick={(e) => this.handleSendClick(e)}>
            <FontAwesome name="arrow-circle-right" />
          </a>}
        </div>}
      </div>
    );
  };
}

ReactDOM.render(<Chat />, document.getElementById('chat'));