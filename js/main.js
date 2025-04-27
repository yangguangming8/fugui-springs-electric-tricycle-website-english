/**
 * Fugui Springs Electric Tricycle Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    "use strict";
    
    // Initialize components
    initHeader();
    initMobileMenu();
    initBackToTop();
    initTestimonialSlider();
    initProductFilters();
    initProductGallery();
    initFaqAccordion();
    initAnimations();
    initContactForm();
    initPreloader();
});

/**
 * Initialize the header behavior
 */
function initHeader() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Initialize dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        // For mobile devices
        link.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
}

/**
 * Initialize mobile menu
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.main-nav');
    
    if (!menuBtn || !mobileNav) return;
    
    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            menuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Reset dropdowns
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideMenu = mobileNav.contains(e.target);
        const isClickOnMenuBtn = menuBtn.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnMenuBtn && mobileNav.classList.contains('active')) {
            menuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize testimonial slider
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    
    if (!slider) return;
    
    const items = slider.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    let currentIndex = 0;
    
    function showSlide(index) {
        // Hide all slides
        items.forEach(item => {
            item.style.display = 'none';
        });
        
        // Show the current slide
        items[index].style.display = 'block';
    }
    
    // Initialize
    showSlide(currentIndex);
    
    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = items.length - 1;
            }
            showSlide(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex++;
            if (currentIndex >= items.length) {
                currentIndex = 0;
            }
            showSlide(currentIndex);
        });
    }
    
    // Auto slide (optional)
    let interval = setInterval(function() {
        currentIndex++;
        if (currentIndex >= items.length) {
            currentIndex = 0;
        }
        showSlide(currentIndex);
    }, 5000);
    
    // Stop auto slide on hover
    slider.addEventListener('mouseenter', function() {
        clearInterval(interval);
    });
    
    slider.addEventListener('mouseleave', function() {
        interval = setInterval(function() {
            currentIndex++;
            if (currentIndex >= items.length) {
                currentIndex = 0;
            }
            showSlide(currentIndex);
        }, 5000);
    });
}

/**
 * Initialize product filters
 */
function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-card');
    
    if (filterBtns.length === 0 || productItems.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter products
            productItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}

/**
 * Initialize product gallery
 */
function initProductGallery() {
    const mainImg = document.querySelector('.gallery-main img');
    const thumbs = document.querySelectorAll('.gallery-thumb');
    
    if (!mainImg || thumbs.length === 0) return;
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Get image source
            const imgSrc = this.querySelector('img').getAttribute('src');
            
            // Update main image
            mainImg.setAttribute('src', imgSrc);
            
            // Remove active class from all thumbs
            thumbs.forEach(thumb => {
                thumb.classList.remove('active');
            });
            
            // Add active class to clicked thumb
            this.classList.add('active');
        });
    });
}

/**
 * Initialize FAQ accordion
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        
        header.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/**
 * Initialize animations
 */
function initAnimations() {
    // Add animation classes on scroll
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    if (elements.length === 0) return;
    
    function checkIfInView() {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }
    
    // Check on load
    checkIfInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);
}

/**
 * Initialize contact form
 */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = form.querySelector('[name="name"]').value;
        const email = form.querySelector('[name="email"]').value;
        const message = form.querySelector('[name="message"]').value;
        
        // Validate form
        let valid = true;
        
        if (name.trim() === '') {
            showError(form.querySelector('[name="name"]'), 'Please enter your name');
            valid = false;
        } else {
            removeError(form.querySelector('[name="name"]'));
        }
        
        if (email.trim() === '') {
            showError(form.querySelector('[name="email"]'), 'Please enter your email');
            valid = false;
        } else if (!isValidEmail(email)) {
            showError(form.querySelector('[name="email"]'), 'Please enter a valid email');
            valid = false;
        } else {
            removeError(form.querySelector('[name="email"]'));
        }
        
        if (message.trim() === '') {
            showError(form.querySelector('[name="message"]'), 'Please enter your message');
            valid = false;
        } else {
            removeError(form.querySelector('[name="message"]'));
        }
        
        if (valid) {
            // Simulate form submission
            form.querySelector('button[type="submit"]').disabled = true;
            form.querySelector('button[type="submit"]').textContent = 'Sending...';
            
            // Here you would normally send the form data to a server
            // For demo purposes, we're just waiting for 2 seconds
            setTimeout(function() {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-msg';
                successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
                
                form.insertBefore(successMsg, form.firstChild);
                
                // Reset form
                form.reset();
                form.querySelector('button[type="submit"]').disabled = false;
                form.querySelector('button[type="submit"]').textContent = 'Send Message';
                
                // Remove success message after 5 seconds
                setTimeout(function() {
                    successMsg.remove();
                }, 5000);
            }, 2000);
        }
    });
    
    function showError(input, message) {
        // Remove any existing error message
        removeError(input);
        
        // Add error class to input
        input.classList.add('error');
        
        // Create error message
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-msg';
        errorMsg.textContent = message;
        
        // Insert error message after input
        input.parentNode.insertBefore(errorMsg, input.nextSibling);
    }
    
    function removeError(input) {
        // Remove error class from input
        input.classList.remove('error');
        
        // Remove error message
        const errorMsg = input.parentNode.querySelector('.error-msg');
        if (errorMsg) {
            errorMsg.remove();
        }
    }
    
    function isValidEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }
}

/**
 * Initialize preloader
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (!preloader) return;
    
    window.addEventListener('load', function() {
        preloader.classList.add('hide');
        
        // Remove preloader from DOM after transition
        setTimeout(function() {
            preloader.remove();
        }, 500);
    });
}