// Firebase authentication
const auth = firebase.auth();

// Check authentication state when the page loads
auth.onAuthStateChanged((user) => {
    if (!user) {
        // User is not authenticated, redirect to login page
        window.location.href = 'index.html';
    } else {
        // User is authenticated, show dashboard content
        document.querySelector('.login-container').style.display = 'none';
        document.querySelector('.dashboard-container').style.display = 'block';
        // Call function to populate hall list
        populateHallList();
    }
});

// Logout button
const logoutBtn = document.getElementById('logout-btn');

// Logout button click event listener
logoutBtn.addEventListener('click', () => {
    // Sign out the user
    auth.signOut().then(() => {
        // Sign-out successful, redirect to login page
        window.location.href = 'index.html';
    }).catch((error) => {
        // An error happened
        console.error('Logout error:', error);
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
