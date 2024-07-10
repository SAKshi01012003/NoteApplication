import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js'
import {signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js'


const firebaseConfig = {
    apiKey: "AIzaSyC4AMEptpxUauG3BzZ6I-OzoMhYwJ5T-xQ",
    authDomain: "notesdb-8abcd.firebaseapp.com",
    projectId: "notesdb-8abcd",
    storageBucket: "notesdb-8abcd.appspot.com",
    messagingSenderId: "232066222820",
    appId: "1:232066222820:web:460aef00a1daa0393fbaf1"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();


  document.addEventListener("DOMContentLoaded",()=>{

    const registerbtn= document.getElementById("registerbtn");
    const loginbtn= document.getElementById("loginbtn");

    if(loginbtn){
      loginbtn.addEventListener("click",function(event){
        event.preventDefault()
    
        const email= document.getElementById("email").value;
        const password= document.getElementById("password").value;
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user= userCredential.user;
            alert("Logged in sussessfully !!!")
            window.location.href="../HTML/main.html";

        })
        .catch((error)=>{
            const errorCode= error.code
            const errorMessage= error.message
            alert(errorMessage)
         
        });
    
      })

     
    }

    
    if(registerbtn){

      registerbtn.addEventListener("click", function(event){
        event.preventDefault()
    
        const username= document.getElementById("username").value;
        const remail= document.getElementById("remail").value;
        const rpassword=document.getElementById("rpassword").value;

        if (isValidEmail(remail) == false || isValidPassword(rpassword) == false) {
          alert("Incorrect email or password");
          return;
        }
        
        createUserWithEmailAndPassword(auth,remail,rpassword)
        .then((userCredential)=>{
            const user= userCredential.user;
            alert("Creating account!!")
            window.location.href="login.html"
        })
        .catch((error)=>{
            const errorCode= error.code;
            const errorMessage= error.message;
            alert(errorMessage);
        })
    
      })
    }

  })
  


  function isValidEmail(email) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }
  
  function isValidPassword(password) {
    if (password.length < 6) {
      return false;
    } else {
      return true;
    }
  }
  