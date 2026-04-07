/* Interactive Functionality for Portfolio */

document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality for publications
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            this.classList.add('active');
            const activeContent = document.getElementById(tabId);
            if (activeContent) activeContent.classList.add('active');
        });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Highlight active section
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        sections.forEach(section => {
            if (pageYOffset >= section.offsetTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });

    // Fade in on scroll
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Award item hover effect
    document.querySelectorAll('.award-item').forEach(item => {
        item.style.transition = 'all 0.3s ease';
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.boxShadow = '0 4px 12px rgba(74, 138, 194, 0.15)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
    });
});

// Toggle publications expansion
function togglePublications() {
    const pubList = document.querySelector('.publication-list-expandable');
    const btn = document.querySelector('.btn-expand-publications');
    if (pubList.classList.contains('expanded')) {
        pubList.classList.remove('expanded');
        btn.textContent = 'Show All 51 Publications';
    } else {
        pubList.classList.add('expanded');
        btn.textContent = 'Show Less';
    }
}
