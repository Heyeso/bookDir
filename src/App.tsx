import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from "styled-components";

const Dev = styled.div`
  text-align: center;
  height: fit-content;
  background-color: rgb(0, 128, 0);
  color: white;
  font-family: 'Noto Sans regular';
`;

function App() {
  return (
    <div className="App">
      <Dev>
        development
      </Dev>
    </div>
  );
}

export default App;
