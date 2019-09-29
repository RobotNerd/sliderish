import React from 'react';
import './App.css';
import Image from './media/Image.js';
import Loader from './media/Loader.js';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { imageUrl: '' };
    this.loadImage();
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.loadImage();
    }, Loader.getInterval());
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadImage() {
    Loader.getImageUrl()
      .then((response) => {
        this.setState({
          imageUrl: `http://${response.data}`,
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Image image={this.state.imageUrl} className='fullscreen animation-pan' />
        </header>
      </div>
    );
  }
}

export default App;
