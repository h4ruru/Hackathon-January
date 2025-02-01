import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../auth/signUp";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
      await signUp(email, password, username);
      alert("登録が完了しました。");
  };

  return (
    <div>
      <h2>新規登録</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">登録</button>
      </form>
      <button onClick={() => navigate("/")}>ログイン</button>
    </div>
  );
};

export default RegisterPage;
