// Firebase authentication
const auth = firebase.auth();

// Login form
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Error message containers
const errorContainer = document.getElementById('error-container');
const registerErrorContainer = document.getElementById('register-error-container');

// Login form submit event listener
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    // Sign in with email and password
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User logged in:', user.uid);
            // Redirect to dashboard
            document.querySelector('.login-container').style.display = 'none';
            document.querySelector('.register-container').style.display = 'none';
            document.querySelector('.dashboard-container').style.display = 'block';
            populateHallList();
        })
        .catch((error) => {
            // Handle errors
            const errorMessage = error.message;
            console.error('Login error:', errorMessage);
            // Display error message to the user
            errorContainer.textContent = errorMessage;
        });
});

// Registration form submit event listener
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = registerForm['register-email'].value;
    const password = registerForm['register-password'].value;

    // Create user with email and password
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User registered
            const user = userCredential.user;
            console.log('User registered:', user.uid);
            // Optionally, automatically log in the user after registration
            // auth.signInWithEmailAndPassword(email, password);
        })
        .catch((error) => {
            // Handle errors
            const errorMessage = error.message;
            console.error('Registration error:', errorMessage);
            // Display error message to the user
            registerErrorContainer.textContent = errorMessage;
        });
});

// Function to populate hall list
function populateHallList() {
    const hallList = document.getElementById('hall-list');
    hallList.innerHTML = ''; // Clear previous content
    for (let i = 1; i <= 14; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = `Hall ${i}`;
        hallList.appendChild(listItem);
    }
}

// Logout button event listener
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
        // Sign-out successful, redirect to login page
        document.querySelector('.login-container').style.display = 'block';
        document.querySelector('.register-container').style.display = 'block';
        document.querySelector('.dashboard-container').style.display = 'none';
    }).catch((error) => {
        console.error('Logout error:', error);
    });
});

// Check authentication state on page load
auth.onAuthStateChanged((user) => {
    if (user) {
        document.querySelector('.login-container').style.display = 'none';
        document.querySelector('.register-container').style.display = 'none';
        document.querySelector('.dashboard-container').style.display = 'block';
        populateHallList();
    } else {
        document.querySelector('.login-container').style.display = 'block';
        document.querySelector('.register-container').style.display = 'block';
        document.querySelector('.dashboard-container').style.display = 'none';
    }
});
