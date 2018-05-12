import React, { Component } from 'react';
import "../node_modules/video-react/dist/video-react.css";
import './App.css';
import Header from './Header.js';
import VideoCore from './VideoCore.js';

class App extends Component {

  render() {
    return (
      <div className="App">
          <Header/>
          <VideoCore/>
      </div>
    );
  }
}

export default App;
