import { doc, setDoc, getDoc, getDocs, collection} from "firebase/firestore";
import { auth, db } from "../firebase";  // Firebaseの設定

// 現在のユーザーのスケジュールを取得
export const getSchedule = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const userRef = doc(db, "schedules", user.uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return userDoc.data().availableDates || [];
  }
  return [];
};

// 現在のユーザーのスケジュールを更新（登録または削除）
export const updateSchedule = async (date) => {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "schedules", user.uid);
  const userDoc = await getDoc(userRef);

  let availableDates = userDoc.exists() ? userDoc.data().availableDates || [] : [];
  
  if (availableDates.includes(date)) {
    availableDates = availableDates.filter((d) => d !== date); // 既に登録されていれば削除
  } else {
    availableDates.push(date); // 新たに追加
  }

  await setDoc(userRef, { availableDates });
};

export const getAllSchedules = async () => {
  const schedulesRef = collection(db, "schedules");
  const snapshot = await getDocs(schedulesRef);
  const allSchedules = [];

  snapshot.forEach((doc) => {
    allSchedules.push(doc.data().availableDates || []);
  });

  return allSchedules;
};