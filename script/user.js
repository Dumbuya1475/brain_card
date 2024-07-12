// Function to display logged-in user's information
document.addEventListener("DOMContentLoaded", function () {
	let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

	if (loggedInUser) {
		document.getElementById("name").innerText = `${loggedInUser.name}`;
		document.getElementById("username").innerText = `${loggedInUser.username}`;
		document.getElementById("email").innerText = `${loggedInUser.email}`;
	} else {
		// Redirect to login page if no user is logged in
		window.location.href = "index.html";
	}
});

// Logout function to clear user session and redirect to login page
function logout() {
	localStorage.removeItem("loggedInUser");
	window.location.href = "";
}

// This function controls the open and close of side panels
document.addEventListener("DOMContentLoaded", () => {
	const sidePanel = document.getElementById("side-panel");
	const openBtn = document.getElementById("open-btn");
	const closeBtn = document.getElementById("close-btn");
	const userMainContent = document.getElementById("user-main-content");
	const userContainer2 = document.getElementById("container_2");
	const feed = document.getElementById("feeds");
	const feedContainer = document.getElementById("feedsContainer");
	// const textContent = document.getElementById("textContent");
	// const textContent = document.querySelectorAll('.content');

	openBtn.addEventListener("click", () => {
		sidePanel.style.width = "240px";
		userMainContent.style.marginLeft = "240px";
		closeBtn.style.display = "block";
		openBtn.style.display = "none";
		userContainer2.style.width = "260px"
		feed.style.width = "260px"
		feedContainer.style.width = "250px"
		feedContainer.style.paddingLeft = "10px"
		// feedContainer.style.padding = "0"
		sidePanel.style.borderRightWidth = "1px";
		textContent.style.width = "0px"
});

closeBtn.addEventListener("click", () => {
	sidePanel.style.width = "0";
	sidePanel.style.border = "none";
	userMainContent.style.marginLeft = "0";
	closeBtn.style.display = "none";
	openBtn.style.display = "block";
	userContainer2.style.width = "500px"
	feed.style.width = "500px"
	feedContainer.style.width = "500px"
	textContent.style.width = "450px"
});
});
