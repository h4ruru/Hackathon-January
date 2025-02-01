import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";  // firebase.js から auth をインポート
import { useNavigate } from "react-router-dom";

const RegisterPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

      // Firebase での新規ユーザー作成
      await createUserWithEmailAndPassword(auth, email, password);
      setUser(email);  // ユーザーの情報をセット
      navigate("/main");  // メインページに遷移
  };

  return (
    <div>
      <h2>登録</h2>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default RegisterPage;
