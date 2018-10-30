import React, { Component } from 'react';
import './App.css';
import './assets/css/bootstrap.min.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

var config = {
  apiKey: "AIzaSyBOYTlv7UGsbd896HM5nre6BfFDesPl3sY",
  authDomain: "fir-react-redux-edaf5.firebaseapp.com",
  databaseURL: "https://fir-react-redux-edaf5.firebaseio.com",
  storageBucket: "fir-react-redux-edaf5.appspot.com",
  messagingSenderId: "661614553631"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    }
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn: !!user})
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? 
          (<span>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="nav navbar-nav">
                  <li><a><img alt="avatar" height="42" width="42" src={firebase.auth().currentUser.photoURL} /></a></li>
                  <li><a><h4><b>{firebase.auth().currentUser.displayName}</b></h4></a></li>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                    <li><a><button className="btn btn-danger" onClick={()=>firebase.auth().signOut()}>Sign out</button></a></li>
                  </ul>
                </div>
              </div>
            </nav>
          </span>)
         :
          (<span>
            <h1>Login</h1>
            <StyledFirebaseAuth 
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </span>)
        }
      </div>
    );
  }
}

export default App;
