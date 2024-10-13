import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Initialize AOS
AOS.init({
    duration: 1500,
  });

document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("loader");
  
    function hideLoader() {
      loader.style.opacity = "0";
      loader.style.transition = "opacity 0.5s ease-out";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }
    setTimeout(hideLoader, 3000);
  });
  
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0HmfxViCsYRqNzI7CEQZW6wRou_XVs1c",
    authDomain: "rc-sjcet.firebaseapp.com",
    projectId: "rc-sjcet",
    storageBucket: "rc-sjcet.appspot.com",
    messagingSenderId: "533155614413",
    appId: "1:533155614413:web:217d333825a33e2057a384",
    measurementId: "G-Z5FT708XPC",
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

function loadEvents() {
    const eventsContainer = document.getElementById("events-container");
    eventsContainer.innerHTML = "";
  
    const eventsCollection = collection(db, "events");
    getDocs(eventsCollection)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const event = doc.data();
          const eventElement = document.createElement("div");
          eventElement.className = "event-card"; 
          eventElement.innerHTML = `
                  <div class="poster-container">
                      <img src="${event.posterUrl}" alt="${event.title}" class="event-poster">
                  </div>
              `;
          eventsContainer.appendChild(eventElement);
        });
      })
      .catch((error) => {
        console.error("Error loading events: ", error);
      });
  }
  loadEvents();