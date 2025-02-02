import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../auth/signIn"; 
import './css/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
      await signIn(email, password);
      navigate("/main"); 
  };

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">ログイン</button>
      </form>
      <button onClick={() => navigate("/register")}>新規登録</button>
    </div>
  );
};


export default LoginPage;