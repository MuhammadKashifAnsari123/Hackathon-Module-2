// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { doc, getDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwf74oOK37PvFl8G8M9_eS-Kg61L41GLQ",
  authDomain: "hackathon-29872.firebaseapp.com",
  projectId: "hackathon-29872",
  storageBucket: "hackathon-29872.appspot.com",
  messagingSenderId: "564045473503",
  appId: "1:564045473503:web:8812a9845967bf8a992b6a",
  measurementId: "G-8M0K2KKG5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

let email = document.getElementById("email");
let password = document.getElementById("password");

window.loginUser = () => {
  let obj = {
    email: email.value,
    password: password.value
  };

  if (!obj.email || !obj.password) {
    Swal.fire({
      title: "All fields are required!",
      text: "Please fill in all fields.",
      icon: "warning"
    });
    return; // Stop the function execution if any field is empty
  }

  email.value = '';
  password.value = '';

  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(async (res) => {
      console.log("User signed in:", res);
      const docRef = doc(db, "users", "SF");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
      Swal.fire({
        title: "You have logged in successfully!",
        text: "You clicked the button!",
        icon: "success"
      });
    window.location.assign("../DashBoard/DashBoard.html")
    })

    .catch((error) => {
      console.error("Error signing in:", error);
      Swal.fire({
        title: "Invalid Email and Password!",
        text: "Please check your credentials.",
        icon: "error"
      });
    });
}
