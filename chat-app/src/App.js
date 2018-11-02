import React, { Component } from 'react';
import './App.css';
import './assets/css/bootstrap.min.css';
import SignIn from './components/SignIn';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SignIn />
      </div>
    );
  }
}

export default App;
