import React from 'react';
import Navbar from './components/Navigation';
import { Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { useAuthContext } from './contexts/AuthContext';
import UpdateProfile from './pages/UpdateProfilePage';

function App() {
  const {currentUser} = useAuthContext();
  return (
    <div id='App'>
      {/* <Navbar/> */}
      <Routes>
      <Route path="*" element={<NotFoundPage/>} />
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        
        <Route path='/' element={!currentUser? <Navigate to="/login" /> : <HomePage />}/>
        <Route path='/update-profile' element={!currentUser? <Navigate to="/login" /> : <UpdateProfile/>}/>
        
      </Routes>
    </div>
  )
}

export default App
