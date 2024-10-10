// Initialize AOS
AOS.init({
    duration: 1500,
});

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function loadEvents() {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '';

    db.collection('events').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const event = doc.data();
            const eventElement = document.createElement('div');
            eventElement.className = 'bg-white rounded-lg shadow-md p-6';
            eventElement.innerHTML = `
                <svg class="h-12 w-12 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 class="text-xl font-semibold mb-2">${event.title}</h3>
                <p class="text-gray-600 mb-2">${event.date}</p>
            `;
            eventsContainer.appendChild(eventElement);
        });
    });
}
loadEvents();

const contactForm = document.querySelector('form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you soon!');
    this.reset();
});
