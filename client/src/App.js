import React from 'react';
import './App.css';
import Image from './Image.js';
import blue from './images/blue-square.png';
import pink from './images/pink-4x3.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Image image={blue} className='alpha' />
        <Image image={pink} className='alpha' />
      </header>
    </div>
  );
}

export default App;
