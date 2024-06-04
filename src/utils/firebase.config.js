import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDeqrRq2IsDN6wm25GJDKZxBxNirTbLjjU",
  authDomain: "task-master-3e3c9.firebaseapp.com",
  projectId: "task-master-3e3c9",
  storageBucket: "task-master-3e3c9.appspot.com",
  messagingSenderId: "972156469702",
  appId: "1:972156469702:web:2962a0a25e7dbd078f32c7",
  measurementId: "G-54SQSGXY3S"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
