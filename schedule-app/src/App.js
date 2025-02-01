import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";  // Navigate を追加
import './App.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import DateRegisterPage from "./pages/DateRegisterPage";
import FriendsPage from "./pages/FriendsPage";
import { auth } from "./firebase";  // Firebase 認証をインポート

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Firebase 認証状態を監視
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser.email);  // ログインしたユーザーのメールアドレスをセット
      } else {
        setUser(null);  // ログアウトした場合は user を null に設定
      }
    });

    return () => unsubscribe();  // クリーンアップ処理
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>飲み友アプリ</p>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/main" /> : <LoginPage setUser={setUser} />} />
          <Route path="/register" element={user ? <Navigate to="/main" /> : <RegisterPage setUser={setUser} />} />
          <Route path="/main" element={user ? <MainPage user={user} /> : <Navigate to="/" />} />
          <Route path="/date-register" element={user ? <DateRegisterPage user={user} /> : <Navigate to="/" />} />
          <Route path="/friends" element={user ? <FriendsPage user={user} /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;