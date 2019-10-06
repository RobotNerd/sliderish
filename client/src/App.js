import React from 'react';
import './App.css';
import Config from './Config.js';
import PatternManager from './pattern/PatternManager.js';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <PatternManager
            config={Config}
          />
        </header>
      </div>
    );
  }
}

export default App;
