import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";  // firebase.js から auth をインポート

const MainPage = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
      await signOut(auth);  // Firebase でサインアウト
      navigate("/login");  // ログインページに遷移
  };

  return (
    <div>
      <h2>ようこそ, {user}!</h2>
      <button onClick={() => navigate("/date-register")}>行ける日登録</button>
      <button onClick={() => navigate("/friends")}>友達リスト</button>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default MainPage;
