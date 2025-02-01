import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { getSchedule, getAllSchedules } from "../auth/schedules"; // 修正したFirestore関数をインポート

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

    if (registeredByOthers >= 3) return "gold"; // 3人以上で金色
    if (registeredByOthers === 2) return "red"; // 2人で赤色
    if (registeredByOthers === 1) return "blue"; // 1人で青色
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
      <div>
        {[...Array(29)].map((_, i) => {
          const day = i + 1;
          const date = `2025-02-${day.toString().padStart(2, "0")}`;
          const color = getColor(date); // カラーを決定
          const isSelected = selectedDates.includes(date); // 自分が選択した日付かどうか

          return (
            <div key={date} style={{ display: "inline-block", margin: 5 }}>
              <button
                style={{
                  backgroundColor: color,
                  width: 40,
                  height: 40,
                  position: "relative",
                  color: color === "white" ? "black" : "white", // 色に応じて文字色変更
                }}
              >
                {day}
                {isSelected && (
                  <span style={{ position: "absolute", bottom: 0, right: 0, fontSize: "12px" }}>
                    ⭐
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;
