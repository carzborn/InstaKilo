import { useState } from 'react'
import reactLogo from './assets/react.svg'
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage'
import Login from './pages/LoginPage';

function App() {

  return (
    <div id='App'>
      <Routes>
        <Route path='/' element={<RegisterPage/>}/>
        <Route path='/Login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
