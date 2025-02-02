import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";  // Navigate を追加
import './App.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage"; // メインカレンダーページ
import FriendsPage from "./pages/FriendsPage"; // フレンドページ
import DateRegisterPage from "./pages/DateRegisterPage"; // 登録ページ
import { auth } from "./firebase";  // Firebase 認証をインポート
import Logo from './images/Logo.png';

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
        <div>
        <img src={Logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
         <p>日程調整アプリ</p> 
        </div>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/main" /> : <LoginPage setUser={setUser} />} />
          <Route path="/register" element={user ? <Navigate to="/main" /> : <RegisterPage setUser={setUser} />} />
          <Route path="/main" element={user ? <MainPage user={user} /> : <Navigate to="/" />} /> {/* メインページ */}
          <Route path="/friends" element={user ? <FriendsPage/> : <Navigate to="/" />} /> {/* フレンドページ */}
          <Route path="/date-register" element={user ? <DateRegisterPage user={user} /> : <Navigate to="/" />} /> {/* 登録ページ */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
