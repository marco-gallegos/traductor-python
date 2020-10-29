import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Editor from './components/Editor';
import {Container} from 'reactstrap';

function App() {
  return (
    <Container className="App">
      <Editor />
    </Container>
  );
}

export default App;
