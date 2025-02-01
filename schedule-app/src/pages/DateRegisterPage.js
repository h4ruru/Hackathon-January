import React, { useState, useEffect } from "react";
import { db } from "../firebase";  // firebase.js から db をインポート
import { doc, setDoc, getDoc } from "firebase/firestore";  // Firestore 関連のインポート

const DateRegisterPage = ({ user }) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user) {
      // ユーザーがログインしている場合、そのユーザーの登録済み日程を取得する
      const fetchEvents = async () => {
          const userDocRef = doc(db, "users", user);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setEvents(userData.events || []);  // ユーザーのイベントリストを設定
          }
      };

      fetchEvents();
    }
  }, [user]);  // user が変更される度に実行

  const handleRegisterDate = async () => {
    if (date.trim() && description.trim()) {
        // 新しい日程を Firestore に追加
        const userDocRef = doc(db, "users", user);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const updatedEvents = [...userData.events, { date, description }];

          // Firestore に日程リストを更新
          await setDoc(userDocRef, { events: updatedEvents }, { merge: true });

          setEvents(updatedEvents);  // ローカル状態にも日程リストを更新
          setDate("");  // 入力フィールドをクリア
          setDescription("");  // 入力フィールドをクリア
        }
    }
  };

  return (
    <div>
      <h2>行ける日登録</h2>
      {user && <p>Logged in as: {user}</p>}
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Event Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <button onClick={handleRegisterDate}>登録</button>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event.date}: {event.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default DateRegisterPage;
