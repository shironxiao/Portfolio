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


// ===== ACTIVE NAV INDICATOR =====
function updateActiveNavLink() {
    // Get all nav links (desktop nav, hamburger menu, and footer)
    const desktopNavLinks = document.querySelectorAll('#desktop-nav .nav-links a');
    const hamburgerNavLinks = document.querySelectorAll('#hamburger-nav .menu-links a');
    const footerNavLinks = document.querySelectorAll('.footer-nav a');

    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Function to update links in a collection
    function updateLinks(links) {
        links.forEach(link => {
            link.classList.remove('active');

            // Get the href attribute
            const href = link.getAttribute('href');

            // Check if this link matches the current page
            if (href === currentPage ||
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Update all navigation areas
    updateLinks(desktopNavLinks);
    updateLinks(hamburgerNavLinks);
    updateLinks(footerNavLinks);
}

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


// ===== CONTACT FORM HANDLING =====
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Validate form (basic validation, browser handles required fields)
            if (name && email && subject && message) {
                // Hide the form
                contactForm.style.display = 'none';

                // Show success message
                successMessage.style.display = 'block';

                // Log form data (in a real application, you would send this to a server)
                console.log('Form submitted:', {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    timestamp: new Date().toISOString()
                });

                // Reset form after 5 seconds and show it again
                setTimeout(function () {
                    contactForm.reset();
                    contactForm.style.display = 'flex';
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
});

// ===== FULLSCREEN IMAGE VIEWER =====
function openImageFullscreen(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    if (modal && modalImg && imgElement) {
        modal.classList.add('active');
        modalImg.src = imgElement.src;
        modalImg.alt = imgElement.alt;
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeImageFullscreen() {
    const modal = document.getElementById('imageModal');

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('imageModal');

    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeImageFullscreen();
            }
        });
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeImageFullscreen();
    }
});

// ===== DYNAMIC NAV COLOR CHANGE BASED ON SECTION =====
document.addEventListener('DOMContentLoaded', function () {
    const desktopNav = document.getElementById('desktop-nav');

    if (!desktopNav) return;

    // Sections with light backgrounds that need dark text
    const lightSections = [
        document.querySelector('section[id="set-sail-adventure"]'),
        document.querySelector('article[id="Gomu Gomu Fruits"]')
    ].filter(section => section !== null);

    function updateNavColor() {
        // Get the nav position
        const navBottom = desktopNav.getBoundingClientRect().bottom;

        // Check if any light section is currently overlapping with the nav
        let isOverLightSection = false;

        lightSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Check if section is in the viewport and overlapping with nav area
            if (rect.top < navBottom && rect.bottom > 0) {
                isOverLightSection = true;
            }
        });

        // Update nav class based on current section
        if (isOverLightSection) {
            desktopNav.classList.add('nav-dark-text');
        } else {
            desktopNav.classList.remove('nav-dark-text');
        }
    }

    // Update on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateNavColor, 10);
    });

    // Initial check
    updateNavColor();
});

// ===== CREW MEMBERS CARDS GENERATION =====
document.addEventListener('DOMContentLoaded', function () {
    const crewMembersGrid = document.getElementById('crewMembersGrid');

    if (!crewMembersGrid) return;

    const crewMembers = [
        { name: 'Monkey D. Luffy', position: 'Captain', icon: '👑' },
        { name: 'Roronoa Zoro', position: 'Swordsman', icon: '⚔️' },
        { name: 'Nami', position: 'Navigator', icon: '🧭' },
        { name: 'Usopp', position: 'Sniper', icon: '🎯' },
        { name: 'Sanji', position: 'Cook', icon: '👨‍🍳' },
        { name: 'Tony Tony Chopper', position: 'Doctor', icon: '🩺' },
        { name: 'Nico Robin', position: 'Archaeologist', icon: '📚' },
        { name: 'Franky', position: 'Shipwright', icon: '🔧' },
        { name: 'Brook', position: 'Musician', icon: '🎸' },
        { name: 'Jinbe', position: 'Helmsman', icon: '🌊' }
    ];

    crewMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'crew-card';
        card.innerHTML = `
            <div class="crew-icon">${member.icon}</div>
            <h3 class="crew-name">${member.name}</h3>
            <p class="crew-position">${member.position}</p>
        `;
        crewMembersGrid.appendChild(card);
    });
});
