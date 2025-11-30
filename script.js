// ===== MENU TOGGLE =====
function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');

    // Update ARIA attributes
    const isOpen = menu.classList.contains('open');
    icon.setAttribute('aria-expanded', isOpen);
}

// ===== KEYBOARD NAVIGATION =====

// Close menu with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const menu = document.querySelector('.menu-links');
        const icon = document.querySelector('.hamburger-icon');
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
            icon.classList.remove('open');
            icon.setAttribute('aria-expanded', 'false');
            icon.focus(); // Return focus to button
        }
    }
});

const root = document.documentElement;
const toggleBtn = document.getElementById("themeToggle");
const toggleBtnMobile = document.getElementById("themeToggleMobile");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

function updateToggleIcons(theme) {
    const icon = theme === "dark" ? "☀️" : "🌙";
    if (toggleBtn) toggleBtn.innerHTML = icon;
    if (toggleBtnMobile) toggleBtnMobile.innerHTML = icon;
}

if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
    updateToggleIcons(savedTheme);
} else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.setAttribute("data-theme", prefersDark ? "dark" : "light");
    updateToggleIcons(prefersDark ? "dark" : "light");
}

// Toggle theme function
function toggleTheme() {
    let current = root.getAttribute("data-theme");
    let newTheme = current === "light" ? "dark" : "light";

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateToggleIcons(newTheme);
}

// Add event listeners to both buttons
if (toggleBtn) toggleBtn.addEventListener("click", toggleTheme);
if (toggleBtnMobile) toggleBtnMobile.addEventListener("click", toggleTheme);

// ===== ACTIVE NAV INDICATOR =====
function updateActiveNavLink() {
    // Get all nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Get all sections
    const sections = document.querySelectorAll('section, #profile');
    
    let currentSection = '';
    
    // Find which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active link styling
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Extract the section ID from the href
        const href = link.getAttribute('href');
        const sectionId = href.replace('#', '');
        
        if (sectionId === currentSection) {
            link.classList.add('active');
        }
    });
}

// Update active link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Update active link on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// Initialize animation control button
document.addEventListener('DOMContentLoaded', function () {
    const animationButton = document.getElementById('animation-toggle');
    if (animationButton) {
        animationButton.addEventListener('click', toggleAnimations);

        // Keyboard support for animation toggle
        animationButton.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAnimations();
            }
        });
    }
});

// ===== STICKY NAV WITH AUTO-HIDE ON IDLE =====
let navHideTimeout;
const IDLE_TIME = 10000; // 10 seconds
const desktopNav = document.getElementById('desktop-nav');
const hamburgerNav = document.getElementById('hamburger-nav');

function showNav() {
    desktopNav.classList.remove('hidden');
    desktopNav.classList.add('visible');
    hamburgerNav.classList.remove('hidden');
    hamburgerNav.classList.add('visible');
    
    // Clear existing timeout
    clearTimeout(navHideTimeout);
    
    // Set new timeout to hide nav after idle time
    navHideTimeout = setTimeout(() => {
        desktopNav.classList.remove('visible');
        desktopNav.classList.add('hidden');
        hamburgerNav.classList.remove('visible');
        hamburgerNav.classList.add('hidden');
    }, IDLE_TIME);
}

// Show nav on mouse move
document.addEventListener('mousemove', showNav);

// Show nav on scroll
document.addEventListener('scroll', showNav);

// Show nav on keypress
document.addEventListener('keydown', showNav);

// Show nav on touch (for mobile)
document.addEventListener('touchstart', showNav);

// Initialize nav as visible on page load
window.addEventListener('load', () => {
    desktopNav.classList.add('visible');
    hamburgerNav.classList.add('visible');
    showNav();
});

