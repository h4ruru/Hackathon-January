import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const signUp = async (email, password, username) => {
  try {
    // Firebase Authentication にユーザーを登録
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore にユーザー情報を保存
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      username: username
    });

    console.log("User registered:", user);
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};