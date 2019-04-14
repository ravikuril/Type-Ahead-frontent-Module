import React, { Component } from 'react';
import './App.css';
import AutoCompleteText from './AutoCompleteText';
import logo from './cat.jpg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-Component">
           <img src={logo} className="App-logo" alt="logo" />
          <AutoCompleteText/>
        </div>
      </div>
    );
  }
}

export default App;
