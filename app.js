  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  import { getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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





  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");


  

  window.signupUser = () => {
      let obj = {
        name:name.value,
        email:email.value,
        password:password.value
      }
  if(!obj.name || !obj.email || !password.value) {
    Swal.fire({
      title: "All fields are required!",
      text: "Please fill in all fields.",
      icon: "warning"
  });
  return; // Stop the function execution if any field is empty
    }
      name.value = '';
      email.value = '';
      password.value = '';

      createUserWithEmailAndPassword(auth, obj.email, obj.password)
      .then((res) => {
        obj.id = res.user.uid;
        obj.userType = "user";
        delete obj.password;

        const reference = doc(db, "users", obj.id);
        setDoc(reference, obj)

        .then(()=>{
          const userObj = JSON.stringify(obj);
          localStorage.setItem("user", userObj);
             Swal.fire({
            title: "Your account has been created!",
            text: "You clicked the button!",
            icon: "success"
        });
        })
        window.location.assign("./DashBoard/DashBoard.html")

        .catch((err)=>{
        console.log(err);
      })  
        
      })
      .catch((err)=>{
        console.log(err.message);
        Swal.fire({
          title: "You are already registered!",
          text: "You clicked the button!",
          icon: "error"
      });
      })
  }