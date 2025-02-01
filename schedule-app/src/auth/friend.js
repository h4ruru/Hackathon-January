import { db } from "../firebase";
import { collection, setDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

// フレンド申請を送る
export const sendFriendRequest = async (userId, friendId) => {
  // users/{userId}/friends/{friendId} というサブコレクションのドキュメントを作成
  const friendDocRef = doc(db, "users", userId, "friends", friendId);

  // ドキュメントの作成 (status を "pending" に設定)
  await setDoc(friendDocRef, {
    status: "pending",  // 申請中
    createdAt: new Date(),
  });
};


// ユーザーのフレンドを取得
export const getFriends = async (userId) => {
  // フレンドのステータスが "accepted" のものを取得
  const q = query(
    collection(db, "users", userId, "friends"), // users/{userId}/friends サブコレクション
    where("status", "==", "accepted")  // 申請が承認されたフレンド
  );
  
  const querySnapshot = await getDocs(q);

  // フレンドのIDをリストとして返す
  return querySnapshot.docs.map(doc => doc.id);
};

// フレンドを削除
export const removeFriend = async (friendshipId) => {
  await deleteDoc(doc(db, "friends", friendshipId));
};
