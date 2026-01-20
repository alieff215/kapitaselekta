document.addEventListener('DOMContentLoaded', () => {
    const userBtn = document.getElementById('userMenuBtn');
    const dropdown = document.getElementById('userDropdown');
    const userNameDisplay = document.getElementById('dropdown-user-name');
    
    if (!userBtn || !dropdown) return;

    // Update user info
    const user = Auth.getUser();
    if (user) {
        if(userNameDisplay) userNameDisplay.textContent = user.name;
        // Initials logic
        const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        userBtn.textContent = initials;
    }

    // Toggle dropdown
    userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    // Close on click outside
    document.addEventListener('click', () => {
        dropdown.classList.remove('show');
    });
    
    dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});