import logo from './logo.svg';
import './App.css';
import Holder from './components/holder.js'
import User from './components/userdata.js'
import {useEffect} from 'react'
import React, { Component } from 'react'

 class App extends Component {
  render() {
    let current ;
    current = localStorage.getItem('Auth_state') ? <User/>:<Holder/>
 
    return (   
    <div className="App">
    {current}
   </div>
    )
  }
}


export default App;
