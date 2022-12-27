import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage'

function App() {

  return (
    <div id='App'>
      <Routes>
        <Route path='/' element={<RegisterPage/>}/>
      </Routes>
    </div>
  )
}

export default App
