  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
  import { getFirestore, collection, getDocs, doc} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
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
  let products = [];




// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(doc.id);
//   console.log(doc.data());
// });

const renderProducts = () => {
  const productParent = document.getElementById("productParent");
  productParent.innerHTML = "";
  products.forEach((x) => {
    console.log(x);
      productParent.innerHTML += `
          <div class="bg-white rounded-lg overflow-hidden shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 flex flex-col">
              <img src="${x.image_url}" alt="${x.test}" class="w-full h-48 object-cover">
              <div class="p-4 flex-grow">
                  <h3 class="text-xl font-semibold mb-2">${x.title}</h3>
                  <p class="text-gray-500 mb-1">${x.content}</p>
                  <p class="text-gray-600 mb-4">${x.content}</p>
                  <p class="text-green-600 font-bold text-lg mb-4">${x.content}</p>
                  <a href="#" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block text-center mt-auto">Buy Now</a>
              </div>
          </div>
      `;
  });
};
const getProducts = async () => {
  const reference = collection(db, "users");
  const dt = await getDocs(reference);
  dt.forEach((dc) => {
      let obj = {
          id: dc.id,
          ...dc.data(),
      };
      products.push(obj);
  });
  renderProducts();
};
getProducts();