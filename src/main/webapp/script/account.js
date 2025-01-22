document.addEventListener('DOMContentLoaded', function() {
    let dropdownOpen = localStorage.getItem("dropdownState") === "true";
    let isDarkMode = localStorage.getItem("darkMode") === "dark";
    
    const dropdownMenu = document.getElementById("account-dropdown-menu");
    const modeText = document.getElementById("mode-text");
    const accountIcon = document.querySelector('.account-icon img');
    
    if (dropdownOpen) {
        dropdownMenu.style.display = "block";
    } else {
        dropdownMenu.style.display = "none";
    }

    updateModeText(isDarkMode);

    accountIcon.addEventListener('click', toggleDropdown);

    function toggleDropdown() {
        if (dropdownOpen) {
            dropdownMenu.style.display = "none";
            dropdownOpen = false;
        } else {
            dropdownMenu.style.display = "block";
            dropdownOpen = true;
        }
        localStorage.setItem("dropdownState", dropdownOpen);
    }

    function toggleModeText() {
        isDarkMode = !isDarkMode;
        updateModeText(isDarkMode);
        localStorage.setItem("darkMode", isDarkMode ? "dark" : "light");
    }

    function updateModeText(isDarkMode) {
        if (modeText) {
            modeText.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
        }
    }

    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleModeText);
    }

    if (dropdownOpen) {
        localStorage.setItem("dropdownState", "true");
    } else {
        localStorage.setItem("dropdownState", "false");
    }

    document.addEventListener('click', function(event) {
        if (!accountIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
            if (dropdownOpen) {
                dropdownMenu.style.display = "none";
                dropdownOpen = false;
                localStorage.setItem("dropdownState", "false");
            }
        }
    });
});

function handleLogout() {
    localStorage.removeItem("dropdownState");
    localStorage.removeItem("darkMode");
    window.location.href = '/login';
}
