import React from "react";

import { useAuthContext } from "./contexts/AuthContext";
import { Route, Routes, Navigate } from "react-router-dom";

import HeaderSearch from "./components/Navigation";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import UpdateProfile from "./pages/UpdateProfilePage";
import "./assets/App.scss";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const { currentUser } = useAuthContext();
  return (
    <div id="App">
      <HeaderSearch />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="user/:id" element={<ProfilePage />} />
        <Route
          path="/update-profile"
          element={!currentUser ? <Navigate to="/login" /> : <UpdateProfile />}
        />
      </Routes>
    </div>
  );
}

export default App;
