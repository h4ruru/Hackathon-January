import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>ようこそ, {user}!</h2>
      <button onClick={() => navigate("/date-register")}>行ける日登録</button>
      <button onClick={() => navigate("/friends")}>友達リスト</button>
    </div>
  );
};

export default MainPage;
