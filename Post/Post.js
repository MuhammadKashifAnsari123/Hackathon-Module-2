  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
  import { getFirestore, doc, setDoc, addDoc, collection} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
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
  const db = getFirestore(app);


  let title = document.getElementById("title");
  let content = document.getElementById("content");
  let image_url = document.getElementById("image-url");
  // let Dateofbirth = document.getElementById("Dateofbirth");
  // let Lastqualification = document.getElementById("Lastqualification");
  


  window.postUser = async () => {
    // Create the object with input values
    let obj = {
      title: title.value,
      content: content.value,
      image_url: image_url.value,
    };
  
    // Check for empty fields
    if (!obj.title || !obj.content || !obj.image_url) {
      Swal.fire({
        title: "All fields are required!",
        text: "Please fill in all fields.",
        icon: "warning",
      });
      return; // Stop the function execution if any field is empty  
    }
  
    try {
      // Add the document to the Firestore collection
      const docRef = await addDoc(collection(db, "users"), obj);
      console.log("Document written with ID: ", docRef.id);
  
      // Clear the fields after successful submission
      title.value = '';
      content.value = '';
      image_url.value = '';
      
      Swal.fire({
        title: "Success!",
        text: "Post added successfully.",
        icon: "success",
      });
  
    } catch (e) {
      console.error("Error adding document: ", e);
      Swal.fire({
        title: "Error!",
        text: "There was a problem adding the document.",
        icon: "error",
      });
    }
  };
  