import { db } from "../firebase";  // firebase.js から db をインポート
import { collection, getDoc, setDoc, updateDoc, getDocs, arrayUnion, arrayRemove, doc } from "firebase/firestore";  // Firestore 関数をインポート

// 日程を登録する
export const addSchedule = async (date, userId) => {
  const scheduleRef = doc(db, "schedules", date);
  const docSnap = await getDoc(scheduleRef);

  if (docSnap.exists()) {
    await updateDoc(scheduleRef, {
      users: arrayUnion(userId),
    });
  } else {
    await setDoc(scheduleRef, { users: [userId] });
  }
};

// 日程を削除する
export const removeSchedule = async (date, userId) => {
  const scheduleRef = doc(db, "schedules", date);
  await updateDoc(scheduleRef, {
    users: arrayRemove(userId),
  });
};

// 全日程を取得する
export const getSchedules = async () => {
  const querySnapshot = await getDocs(collection(db, "schedules"));  // Firestore から全日程を取得
  let schedules = {};

  querySnapshot.forEach(doc => {
    schedules[doc.id] = doc.data().users;
  });

  return schedules;
};
