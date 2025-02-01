import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const signIn = async (email, password) => {
  try {
    // Firebase Authentication でログイン
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore から username を取得
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      console.log("User signed in:", userDoc.data());
    } else {
      console.log("No user data found!");
    }
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
};