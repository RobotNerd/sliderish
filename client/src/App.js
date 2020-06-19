import React from 'react';
import './App.css';
import Config from './Config.js';
import PatternManager from './pattern/PatternManager.js';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      nameStyle: 'hidden',
    };
    this.showName = false;
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    switch (event.code) {
      case 'Space':
        this.toggleName();
        break;
      default:
        break;
    };
  }

  toggleName() {
    this.setState({
      nameStyle: this.showName ? 'hidden' : 'image-name',
    });
    this.showName = !this.showName;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <PatternManager
            config={Config}
            nameStyle={this.state.nameStyle}
          />
        </header>
      </div>
    );
  }
}

export default App;
