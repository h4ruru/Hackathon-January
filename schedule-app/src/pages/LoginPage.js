import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../auth/signIn"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
      await signIn(email, password);
  };

  return (
    <div>
      <h2>ログイン</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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