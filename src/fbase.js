import {initializeApp} from "firebase/app";
import { getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain:  process.env.REACT_APP_AUTH_DOMIAN,
  projectId:  process.env.REACT_APP_PROJECT_ID,
  storageBucket:  process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:  process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID
};

initializeApp(firebaseConfig);
export const authService = getAuth();