import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from "axios";
import RestAPI from "./RestAPI.jsx";


function App() {
  return (
   
    <div className="App">
       
      <header className="App-header">
        <RestAPI />
      </header>
    </div>
  );
}

export default App
