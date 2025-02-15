import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { getSchedule, getAllSchedules } from "../auth/schedules";
import './css/MainPage.css';

const MainPage = ({ user }) => {
  const [selectedDates, setSelectedDates] = useState([]); // 自分の登録した日付
  const [allSchedules, setAllSchedules] = useState([]); // 全ユーザーの登録状況
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // 自分のスケジュールを取得
      const userDates = await getSchedule();
      setSelectedDates(userDates);

      // 他のユーザーのスケジュールを取得
      const schedules = await getAllSchedules();
      setAllSchedules(schedules);
    };
    fetchData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("ログアウトエラー:", error.message);
    }
  };

  // 日程の色を決定する関数
  const getColor = (date) => {
    // 登録した人数を計算
    const registeredByOthers = allSchedules.filter((dates) => dates.includes(date)).length;

    if (registeredByOthers >= 5) return "gold"; // 3人以上で金色
    if (registeredByOthers === 4) return "red"; // 3人以上で金色
    if (registeredByOthers === 3) return "orange"; // 3人以上で金色
    if (registeredByOthers === 2) return "blue"; // 2人で赤色
    if (registeredByOthers === 1) return "gray"; // 1人で青色
    return "white"; // 登録がない場合は白色
  };

  return (
    <div>
      <h2>メインカレンダーページ</h2>
      <div>
        <button onClick={() => navigate("/date-register")}>行ける日登録</button>
        <button onClick={() => navigate("/friends")}>友達リスト</button>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
      <div className="calendar-container">
        {[...Array(29)].map((_, i) => {
          const day = i + 1;
          const date = `2025-02-${day.toString().padStart(2, "0")}`;
          const color = getColor(date); // カラーを決定
          const isSelected = selectedDates.includes(date); // 自分が選択した日付かどうか

          return (
            <div key={date}>
              <button 
                className="calender"
                style={{
                  backgroundColor: color,
                  color: color === "white" ? "black" : "white",
                }}
              >
                {day}
                {isSelected && <span className="star">⭐</span>}
              </button>
            </div>
          );
        })}
      </div>
      <p>
      色の意味:
      <br />
      <span style={{ 
        backgroundColor: "gold", 
        color: "white", 
        padding: "5px", 
        margin: "3px", 
        display: "inline-block", 
        borderRadius: "5px"
      }}>
        　　
      </span>: 五人以上の登録
      <br />
      <span style={{ 
        backgroundColor: "red", 
        color: "white", 
        padding: "5px", 
        margin: "3px", 
        display: "inline-block", 
        borderRadius: "5px"
      }}>
        　　
      </span>: 四人の登録
      <br />
      <span style={{ 
        backgroundColor: "orange", 
        color: "white", 
        padding: "5px", 
        margin: "3px", 
        display: "inline-block", 
        borderRadius: "5px"
      }}>
        　　
      </span>: 三人の登録
      <br />
      <span style={{ 
        backgroundColor: "blue", 
        color: "white", 
        padding: "5px", 
        margin: "3px", 
        display: "inline-block", 
        borderRadius: "5px"
      }}>
        　　
      </span>: 二人の登録
      <br />
      <span style={{ 
        backgroundColor: "gray", 
        color: "white", 
        padding: "5px", 
        margin: "3px", 
        display: "inline-block", 
        borderRadius: "5px"
      }}>
        　　
      </span>: 一人の登録
    </p>
      <div>
        <p></p>
      </div>
    </div>
  );
};

export default MainPage;
