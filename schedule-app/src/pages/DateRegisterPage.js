import React, { useState, useEffect } from "react";
import { updateSchedule, getSchedule } from "../auth/schedules";  // Firestore 関数のインポート
import { useNavigate } from "react-router-dom";
import "./css/DateRegisterPage.css";

const DateRegisterPage = ({ user }) => {
  const [selectedDates, setSelectedDates] = useState([]); // 自分の登録した日付
  const navigate = useNavigate();

  // 初期データの取得（自分のスケジュール）
  useEffect(() => {
    const fetchSchedule = async () => {
      const dates = await getSchedule(); // 自分のスケジュールを取得
      setSelectedDates(dates);
    };
    fetchSchedule();
  }, [user]);

  // カレンダーの日付クリック時の処理
  const handleDateClick = async (date) => {
    await updateSchedule(date); // Firestore に日程を登録または削除
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  return (
    <div>
      <h2>自分の可能な日を登録</h2>
      <button onClick={() => navigate("/main")}>メインページへ戻る</button>
      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 300 }}>
        {[...Array(29)].map((_, i) => {
          const day = i + 1;
          const date = `2025-02-${day.toString().padStart(2, "0")}`;
          const isSelected = selectedDates.includes(date);

          return (
            <button
              key={date}
              onClick={() => handleDateClick(date)}
              style={{
                margin: 5,
                backgroundColor: isSelected ? "blue" : "gray", // 選択された日付の色
                width: 40,
                height: 40,
                color: "white",
                borderRadius: "5px",
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateRegisterPage;
