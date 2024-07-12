document.addEventListener("DOMContentLoaded", () => {
	const toggleButton = document.getElementById('theme-toggle');
	const currentTheme = localStorage.getItem('theme') || 'light';

	// Apply the stored theme on initial load
	document.documentElement.setAttribute('data-theme', currentTheme);

	// Update button text based on the current theme
	updateButtonText(currentTheme);

	toggleButton.addEventListener('click', () => {
		let newTheme = 'light';

		// Toggle between light and dark mode
		if (document.documentElement.getAttribute('data-theme') === 'light') {
			newTheme = 'dark';
		}

		// Apply the new theme
		document.documentElement.setAttribute('data-theme', newTheme);

		// Save the new theme in local storage
		localStorage.setItem('theme', newTheme);

		// Update button text
		updateButtonText(newTheme);
	});

	function updateButtonText(theme) {
		toggleButton.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
	}
});
