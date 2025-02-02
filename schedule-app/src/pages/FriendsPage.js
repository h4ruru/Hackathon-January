import React, {/*{ useState, useEffect }*/} from "react";
import { useNavigate } from "react-router-dom";
import './css/FriendsPage.css';
// import { db } from "../firebase";  // firebase.js から db をインポート
// import { doc, setDoc, getDocs, query, where, collection, updateDoc } from "firebase/firestore";  // Firestore 関連のインポート

// 引数に{ user }を設定予定
const FriendsPage = () => {
  // const [friendName, setFriendName] = useState("");
  // const [friends, setFriends] = useState([]);
  // const [pendingRequests, setPendingRequests] = useState([]);
 const navigate = useNavigate();

  // // ユーザーのフレンドリストを取得
  // useEffect(() => {
  //   if (user) {
  //     const fetchFriends = async () => {
  //       // ユーザーのフレンドサブコレクションを取得 (accepted フレンド)
  //       const friendsRef = collection(db, "users", user, "friends");
  //       const q = query(friendsRef, where("status", "==", "accepted")); // "accepted" ステータスのフレンドのみ取得
  //       const querySnapshot = await getDocs(q);

  //       const friendList = querySnapshot.docs.map(doc => doc.id);  // フレンドのID（friendId）をリストとして取得
  //       setFriends(friendList);  // フレンドリストを設定

  //       // フレンド申請中のリストを取得 (pending フレンド)
  //       const pendingQ = query(friendsRef, where("status", "==", "pending")); // "pending" ステータスのフレンドのみ取得
  //       const pendingSnapshot = await getDocs(pendingQ);

  //       const pendingList = pendingSnapshot.docs.map(doc => doc.id);  // 申請中のフレンドIDをリストとして取得
  //       setPendingRequests(pendingList);  // 申請中のフレンドリストを設定
  //     };

  //     fetchFriends();
  //   }
  // }, [user]);

  // // フレンド申請を送る
  // const addFriend = async () => {
  //   if (friendName.trim()) {
  //     // 友達リクエストを送るために、Firestore に "pending" 状態で追加
  //     const friendsRef = collection(db, "users", user, "friends");
  //     const friendRequestRef = doc(friendsRef, friendName); // friendName は friendId として使用

  //     // 友達サブコレクションに "pending" 状態で追加
  //     await setDoc(friendRequestRef, {
  //       status: "pending",  // 申請中
  //       createdAt: new Date(),
  //     });

  //     // 相手にも "pending" の状態でフレンドリクエストを追加
  //     const friendRef = collection(db, "users", friendName, "friends");
  //     const friendRequestRefOther = doc(friendRef, user);  // user は自分の ID

  //     await setDoc(friendRequestRefOther, {
  //       status: "pending",  // 申請中
  //       createdAt: new Date(),
  //     });

  //     // 入力フィールドをクリア
  //     setFriendName("");
  //   }
  // };

  // // フレンドリクエストを承諾
  // const acceptFriendRequest = async (friendId) => {
  //   // 申請中のフレンドリクエストの status を "accepted" に変更
  //   const userFriendRef = doc(db, "users", user, "friends", friendId);
  //   await updateDoc(userFriendRef, {
  //     status: "accepted",
  //   });

  //   // 相手のサブコレクションでも status を "accepted" に変更
  //   const friendUserRef = doc(db, "users", friendId, "friends", user);
  //   await updateDoc(friendUserRef, {
  //     status: "accepted",
  //   });

  //   // リストを再取得して更新
  //   setPendingRequests(pendingRequests.filter((id) => id !== friendId)); // 申請中リストから削除
  //   setFriends([...friends, friendId]);  // フレンドリストに追加
  // };

  return (
    <div>
      <h1>フレンドページ</h1>
      <button onClick={() => navigate("/main")}>メインページへ戻る</button>
      <h2>友達リスト</h2>
      {/* {user && <p>ユーザー: {user}</p>}
      <input
        type="text"
        placeholder="友達を追加"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />
      <button onClick={addFriend}>追加</button>

      <h3>フレンドリスト:</h3>
      <ul>
        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <li key={index}>{friend}</li>
          ))
        ) : (
          <p>フレンドがいません</p>
        )}
      </ul> */}

      <h3>フレンド申請中:</h3>
      {/* <ul>
        {pendingRequests.length > 0 ? (
          pendingRequests.map((friend, index) => (
            <li key={index}>
              {friend} <button onClick={() => acceptFriendRequest(friend)}>承諾</button>
            </li>
          ))
        ) : (
          <p>申請中のフレンドはいません</p>
        )}
      </ul>  */}
    </div>
  );
};

export default FriendsPage;
