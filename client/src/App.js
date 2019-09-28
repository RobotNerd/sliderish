import React from 'react';
import './App.css';
import Image from './media/Image.js';
import Loader from './media/Loader.js';

function App() {
  const imageUrl = Loader.getImageUrl();
  return (
    <div className="App">
      <header className="App-header">
        <Image image={imageUrl} className='alpha' />
      </header>
    </div>
  );
}

export default App;
