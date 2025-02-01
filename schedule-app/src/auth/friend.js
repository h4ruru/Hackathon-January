import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

// フレンド申請を送る
export const sendFriendRequest = async (userId, friendId) => {
  await addDoc(collection(db, "friends"), {
    userId: userId,
    friendId: friendId,
    status: "pending",
    createdAt: new Date(),
  });
};

// フレンド一覧を取得
export const getFriends = async (userId) => {
  const q = query(collection(db, "friends"), where("userId", "==", userId), where("status", "==", "accepted"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => doc.data().friendId);
};

// フレンドを削除
export const removeFriend = async (friendshipId) => {
  await deleteDoc(doc(db, "friends", friendshipId));
};
