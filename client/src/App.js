import React from 'react';
import './App.css';
import Image from './media/Image.js';
import Loader from './media/Loader.js';

const interval = 5000;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { imageUrl: 'test' };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      Loader.getImageUrl()
        .then((response) => {
          console.log(response.data);
          this.setState({
            imageUrl: response.data,
          });
        });
    }, interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Image image={this.state.imageUrl} className='alpha' />
        </header>
      </div>
    );
  }
}

export default App;
