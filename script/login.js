// login.js
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Retrieve users array from localStorage
    let usersArray = JSON.parse(localStorage.getItem("usersArray")) || [];

    // Find user with matching username and password
    let loggedInUser = usersArray.find(user => user.username === username && user.password === password);

    if (loggedInUser) {
        // Store logged-in user details in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        // Redirect to user profile page
        window.location.href = "user.html";
    } else {
        alert("Invalid username or password.");
    }
});
