import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (username.trim()) {
      setUser(username);
      navigate("/main");
    }
  };

  return (
    <div>
      <h2>登録</h2>
      <input 
        type="text" 
        placeholder="Choose a username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button onClick={handleRegister}>登録</button>
    </div>
  );
};

export default RegisterPage;
