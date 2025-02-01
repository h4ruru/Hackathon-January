import React, { useState, useEffect } from "react";
import { db } from "../firebase";  // firebase.js から db をインポート
import { doc, setDoc, getDoc } from "firebase/firestore";  // Firestore 関連のインポート

const FriendsPage = ({ user }) => {
  const [friendName, setFriendName] = useState("");
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (user) {
      // ユーザーがログインしている場合、フレンドリストを取得する
      const fetchFriends = async () => {
          const userDocRef = doc(db, "users", user);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setFriends(userData.friends || []);  // ユーザーのフレンドリストを設定
          }
      };

      fetchFriends();
    }
  }, [user]);  // user が変更される度に実行

  const addFriend = async () => {
    if (friendName.trim()) {
        // 新しいフレンドを追加するために、Firestore に保存
        const userDocRef = doc(db, "users", user);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const updatedFriends = [...userData.friends, friendName];

          // Firestore にフレンドリストを更新
          await setDoc(userDocRef, { friends: updatedFriends }, { merge: true });

          setFriends(updatedFriends);  // ローカル状態にもフレンドリストを更新
          setFriendName("");  // 入力フィールドをクリア
        }
    }
  };

  return (
    <div>
      <h2>友達リスト</h2>
      {user && <p>ユーザー: {user}</p>}
      <input 
        type="text" 
        placeholder="友達を追加"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)} 
      />
      <button onClick={addFriend}>追加</button>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsPage;
