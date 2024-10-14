import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


// Initialize AOS
AOS.init({
  duration: 1500,
});

const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

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
  const eventsQuery = query(eventsCollection, orderBy("timestamp", "desc"), limit(8)); 

  getDocs(eventsQuery)
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

function populateExecom(execomMembers) {
  const execomContainer = document.getElementById("execom-container");
  execomMembers.forEach((member) => {
    const memberElement = document.createElement("div");
    memberElement.className = "bg-white rounded-lg shadow-md p-6 text-center";
    memberElement.innerHTML = `
            <img src="${member.image}" alt="${member.name}" class="w-24 h-24 rounded-full mx-auto mb-4">
            <h3 class="text-xl font-semibold mb-2">${member.name}</h3>
            <p class="text-gray-600">${member.position}</p>
          `;
    execomContainer.appendChild(memberElement);
  });
}


emailjs.init('3RV2Ed8Xk_93cwJJe');

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); 


  const user_name = document.getElementById('user_name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  emailjs.send('service_ro53zed', 'template_5uq1u8k', {
    user_name: user_name,  
    user_email: email,      
    message: message     
  })
  .then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
    alert('Message sent successfully!'); 
  }, function(error) {
    console.log('FAILED...', error); 
    alert('Failed to send the message. Please try again.'); 
  });
  document.getElementById('contactForm').reset();
});
