import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4NHs1Twj5xmwZzOpu12U0n3oKtcLtbLA",
  authDomain: "test-bc7a7.firebaseapp.com",
  projectId: "test-bc7a7",
  storageBucket: "test-bc7a7.appspot.com",
  messagingSenderId: "653678648894",
  appId: "1:653678648894:web:c8e8a742c5964f12ce7b6f"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);