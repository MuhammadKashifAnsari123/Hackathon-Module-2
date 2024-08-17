// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

window.onload = async function() {
    // Fetch and display posts data
    await displayPosts();
};

// Function to fetch and display posts
async function displayPosts() {
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);

    const postsTableBody = document.querySelector('.table tbody');
    postsTableBody.innerHTML = ''; // Clear existing posts

    querySnapshot.forEach((doc) => {
        const post = doc.data();
        const postId = doc.id;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${post.title}</td>
            <td>${post.status || 'Draft'}</td>
            <td>${new Date(post.timestamp.seconds * 1000).toLocaleDateString()}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editPost('${postId}')">Edit</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deletePost('${postId}')">Delete</button>
            </td>
        `;
        postsTableBody.appendChild(row);
    });
}

// Function to handle post deletion
window.deletePost = async function(postId) {
    try {
        await deleteDoc(doc(db, 'posts', postId));
        alert('Post deleted successfully!');
        displayPosts(); // Refresh the posts list
    } catch (error) {
        alert('Error deleting post: ' + error.message);
    }
}

// Function to handle post editing (Placeholder)
window.editPost = function(postId) {
    alert('Edit post functionality not implemented yet.');
}

// Function to handle sign out
document.getElementById('signout-link').addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent the default link behavior
    try {
        await signOut(auth);
        alert('Successfully signed out!');
        window.location.href = "../index.html"; // Redirect to sign-in page
    } catch (error) {
        alert('Error signing out: ' + error.message);
    }
});