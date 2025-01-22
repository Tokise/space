document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    
    const savedMode = localStorage.getItem('darkMode') || 'light';
    const isDarkMode = savedMode === 'dark';

    
    body.classList.toggle('dark-mode', isDarkMode);
    updateIcon();

  
    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkMode ? 'dark' : 'light');
        updateIcon();
    });

   
    function updateIcon() {
        const icon = darkModeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            icon.style.color = 'white';
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            icon.style.color = ''; 
        }
    }
});
