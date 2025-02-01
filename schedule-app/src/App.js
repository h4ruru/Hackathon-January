import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import DateRegisterPage from "./pages/DateRegisterPage";
import FriendsPage from "./pages/FriendsPage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <p>飲み友アプリ</p>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage setUser={setUser} />} />
          <Route path="/main" element={user ? <MainPage user={user} /> : <LoginPage setUser={setUser} />} />
          <Route path="/date-register" element={<DateRegisterPage user={user} />} />
          <Route path="/friends" element={<FriendsPage user={user} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
