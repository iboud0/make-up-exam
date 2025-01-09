import { defineNuxtPlugin } from "#app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyC-4IkJouV2XgP-zk-OdQoU7xpfjwyG-sA",
        authDomain: "mymakeupexam.firebaseapp.com",
        projectId: "mymakeupexam",
        storageBucket: "mymakeupexam.firebasestorage.app",
        messagingSenderId: "830588202270",
        appId: "1:830588202270:web:eca1f871aa9f97110cad0f",
        measurementId: "G-59GJZZT2KH"
    };

  const app = initializeApp(firebaseConfig);

  // Export Firestore and Auth for use in your app
  const db = getFirestore(app);
  const auth = getAuth(app);

  return {
    provide: {
      db,
      auth,
    },
  };
});
