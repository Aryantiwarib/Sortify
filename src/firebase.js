import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDocs } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSEiXxcFMZcV4e9Ag0o88toG2EQyB3gQA",
  authDomain: "sortify-aff5a.firebaseapp.com",
  projectId: "sortify-aff5a",
  storageBucket: "sortify-aff5a.appspot.com",
  messagingSenderId: "909464800972",
  appId: "1:909464800972:web:1e3b631087f5bc15ea7c69",
  measurementId: "G-NCY6FR9T5H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Google Sign-in
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-in Error:", error);
  }
};

// Logout Function
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

// Store Emails in Firestore
export const storeEmail = async (userEmail, emailData) => {
  try {
    await setDoc(doc(db, "emails", userEmail, "userEmails", emailData.id), emailData);
    console.log("Email stored successfully!");
  } catch (error) {
    console.error("Error storing email:", error);
  }
};

// ✅ Fetch All Emails from Firestore
export const getAllStoredEmails = async () => {
  try {
    const snapshot = await getDocs(collection(db, "emails"));
    let allEmails = [];
    
    for (let userDoc of snapshot.docs) {
      const userEmailsCollection = collection(db, "emails", userDoc.id, "userEmails");
      const userEmailsSnapshot = await getDocs(userEmailsCollection);
      
      userEmailsSnapshot.forEach((doc) => {
        allEmails.push({ id: doc.id, ...doc.data() });
      });
    }

    return allEmails;
  } catch (error) {
    console.error("Error fetching all stored emails:", error);
    return [];
  }
};

export { auth, db, getAllStoredEmails};
