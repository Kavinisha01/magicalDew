// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIxY5sncIfc1xpN2IBLxL5HAHTS7fuHP4",
  authDomain: "login-e97dc.firebaseapp.com",
  databaseURL: "https://login-e97dc-default-rtdb.firebaseio.com",
  projectId: "login-e97dc",
  storageBucket: "login-e97dc.firebasestorage.app",
  messagingSenderId: "853778405308",
  appId: "1:853778405308:web:7e5e61737330390f76fdb9",
  measurementId: "G-PRNDG1T2YL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Function to display feedback message
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Determine if the current page is for registration or login
const isRegisterPage = window.location.pathname.includes("register.html");

if (isRegisterPage) {
    // Handle registration process
    document.getElementById('form').addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve user input values
        const registerUsername = document.getElementById("username").value; // Renamed variable
        const email = document.getElementById("email").value;
        const password = document.getElementById('password').value;

        try {
            // Create user with email and password
            const registerUserCredential = await createUserWithEmailAndPassword(auth, email, password); // Renamed variable
            const user = registerUserCredential.user;

            // Prepare user data for Firestore
            const userData = {
                userName: registerUsername,
                email: email
            };

            // Store user data in Firestore under "users" collection
            await setDoc(doc(db, "users", user.uid), userData);

            // Show success message and redirect to login
            showMessage('Account Created Successfully!', 'signUpMessage');
            setTimeout(() => {
                window.location.href = "login.html"; // Redirect to login page
            }, 1000);

        } catch (error) {
            // Handle errors during sign-up or Firestore write
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists!', 'signUpMessage');
            } else {
                showMessage('Unable to create user. Please try again.', 'signUpMessage');
            }
            console.error("Error creating user:", error);
        }
    });
} else {
    // Handle login process
    document.getElementById('form').addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve user input values
        const loginUsername = document.getElementById("username").value; // Renamed variable
        const email = document.getElementById("email").value;
        const password = document.getElementById('password').value;

        try {
            // Login user with email and password
            const loginUserCredential = await signInWithEmailAndPassword(auth, email, password); // Renamed variable
            // Successful login can redirect or perform actions here
            showMessage('Login Successful!', 'signUpMessage');
            setTimeout(() => {
                window.location.href = "index.html"; // Redirect to home page or dashboard
            }, 1000);
        } catch (error) {
            // Handle errors during login
            const errorCode = error.code;
            if (errorCode === 'auth/wrong-password') {
                showMessage('Incorrect password. Please try again.', 'signUpMessage');
            } else if (errorCode === 'auth/user-not-found') {
                showMessage('No account found with this email. Please register.', 'signUpMessage');
            } else {
                showMessage('Unable to process your request. Please try again.', 'signUpMessage');
            }
            console.error("Error:", error);
        }
    });
}




// // Import Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
// import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyAIxY5sncIfc1xpN2IBLxL5HAHTS7fuHP4",
//   authDomain: "login-e97dc.firebaseapp.com",
//   databaseURL: "https://login-e97dc-default-rtdb.firebaseio.com",
//   projectId: "login-e97dc",
//   storageBucket: "login-e97dc.firebasestorage.app",
//   messagingSenderId: "853778405308",
//   appId: "1:853778405308:web:7e5e61737330390f76fdb9",
//   measurementId: "G-PRNDG1T2YL"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth()
// const db = getFirestore(app);

// // Function to display feedback message
// function showMessage(message, divId) {
//     const messageDiv = document.getElementById(divId);
//     messageDiv.style.display = "block";
//     messageDiv.innerHTML = message;
//     messageDiv.style.opacity = 1;
//     setTimeout(() => {
//         messageDiv.style.opacity = 0;
//     }, 5000);
// }

// // Handle sign-up process
// document.getElementById('form').addEventListener("submit", async function(event) {
//     event.preventDefault(); // Prevent default form submission

//     // Retrieve user input values
//     const username = document.getElementById("username").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById('password').value;

//     try {
//         // Create user with email and password
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;

//         // Prepare user data for Firestore
//         const userData = {
//             email: email,
//             userName: username
//         };

//         // Store user data in Firestore under "users" collection
//         await setDoc(doc(db, "users", user.uid), userData);

//         // Show success message and redirect to login
//         showMessage('Account Created Successfully!', 'signUpMessage');
//         setTimeout(() => {
//             window.location.href = "login.html";
//         }, 1000);

//     } catch (error) {
//         // Handle errors during sign-up or Firestore write
//         const errorCode = error.code;
//         if (errorCode === 'auth/email-already-in-use') {
//             showMessage('Email Address Already Exists!', 'signUpMessage');
//         } else {
//             showMessage('Unable to create user. Please try again.', 'signUpMessage');
//         }
//         console.error("Error creating user:", error);
//     }
// });





