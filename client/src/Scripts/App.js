import React, { Component } from 'react';
import "../../node_modules/video-react/dist/video-react.css";
import '../Styles/App.css';
import Header from '.././Components/Header/Header.js';
import VideoCore from '.././Components/VideoCore/VideoCore.js';

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
