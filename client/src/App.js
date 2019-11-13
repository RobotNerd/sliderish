import React from 'react';
import './App.css';
import Config from './Config.js';
import PatternManager from './pattern/PatternManager.js';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      nameStyle: 'image-name hidden',
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
    var nameStyle = ["image-name"];
    if (this.showName) {
      nameStyle.push("hidden");
    }
    this.showName = !this.showName;
    this.setState({
      nameStyle: nameStyle.join(" "),
    });
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
