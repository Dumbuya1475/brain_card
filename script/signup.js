// signup.js
document.getElementById("signupForm").addEventListener("submit", function (e) {
	e.preventDefault();

	var fullname = document.getElementById("name").value;
	var username = document.getElementById("username").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var confirmpass = document.getElementById("confirmpass").value;

	// Check if passwords match
	if (password !== confirmpass) {
			alert("Passwords do not match!");
			return;
	}

	// Check if any field is empty
	if (!fullname || !username || !email || !password || !confirmpass) {
			alert("All fields are mandatory.");
			return;
	}

	// Retrieve existing users or initialize an empty array
	let usersArray = JSON.parse(localStorage.getItem("usersArray")) || [];

	// Check if the username already exists
	if (usersArray.some(user => user.username === username)) {
			alert("Username already exists!");
			return;
	}

	// Create a new user object
	const newUser = {
			name: fullname,
			username: username,
			email: email,
			password: password
	};

	// Add the new user to the users array
	usersArray.push(newUser);

	// Store the updated users array in localStorage
	localStorage.setItem("usersArray", JSON.stringify(usersArray));

	// Store the logged-in user's details
	localStorage.setItem("loggedInUser", JSON.stringify(newUser));

	// Redirect to user profile page after signup
	window.location.href = "user.html";
});


function generateToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Check if user is logged in and redirect accordingly
function route() {
  let token = window.localStorage.getItem("token");
  if (token) {
    window.location.href = "user.html";
  } else {
    window.location.href = "index.html";
  }
}

// Accessing the user details from localStorage and displaying them on profile page
document.addEventListener("DOMContentLoaded", function () {
  let userDetailsArray = JSON.parse(window.localStorage.getItem("userDetailsArray"));
  if (userDetailsArray && userDetailsArray.length > 0) {
    let user = userDetailsArray[userDetailsArray.length - 1]; // Display the most recent user's details
    document.getElementById("name").innerText = user.name;
    document.getElementById("username").innerText = user.username;
    document.getElementById("userEmail").innerText = user.email;
  } else {
    console.log("User details array not found in localStorage or is empty.");
  }
});

// Logout function to clear localStorage and redirect to signup page
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
