import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// 新規ユーザー登録
export const registerUser = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Firestore にユーザー情報を保存
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    displayName: displayName,
    createdAt: new Date(),
  });

  return user;
};

// ログイン
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// ログアウト
export const logoutUser = async () => {
  await signOut(auth);
};
