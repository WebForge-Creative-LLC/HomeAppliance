// Main JavaScript for AquaFlow Solutions Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('#mobileMenuClose');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animate Elements on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .product-card, .stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Form Validation (for contact forms)
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                } else {
                    field.style.borderColor = '#28a745';
                }
            });
            
            if (isValid) {
                // Show success message (in real implementation, this would submit to server)
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
    
    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#0066cc'};
            color: white;
            padding: 15px 20px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Product Image Lazy Loading
    const productImages = document.querySelectorAll('.product-image img');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    productImages.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
    
    // Search Functionality (if search is added later)
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            // Implement search logic here
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #0066cc;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Initialize tooltips (if any)
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 0.8rem;
                z-index: 1000;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            });
        });
    });
    
    // Modern Homepage Features
    
    // Animated Counter for Hero Stats
    const heroStatNumbers = document.querySelectorAll('.hero-stat-number');
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    };

    // Animate hero stats when they come into view
    const heroStatsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                heroStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    heroStatNumbers.forEach(stat => {
        heroStatsObserver.observe(stat);
    });

    // Animated Stats Section
    const statNumbers = document.querySelectorAll('.stat-number');
    const statCircles = document.querySelectorAll('.stat-circle path:last-child');
    
    const animateStats = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                const circle = entry.target.closest('.stat-item').querySelector('.stat-circle path:last-child');
                
                // Animate number
                let current = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(current);
                }, 20);
                
                // Animate circle
                const percentage = target;
                const circumference = 2 * Math.PI * 15.9155; // radius = 15.9155
                const offset = circumference - (percentage / 100) * circumference;
                circle.style.strokeDashoffset = offset;
                
                statsObserver.unobserve(entry.target);
            }
        });
    };

    const statsObserver = new IntersectionObserver(animateStats, { threshold: 0.5 });
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Testimonials Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialNavBtns = document.querySelectorAll('.testimonial-nav-btn');
    let currentSlide = 0;

    const showSlide = (index) => {
        testimonialItems.forEach(item => item.classList.remove('active'));
        testimonialNavBtns.forEach(btn => btn.classList.remove('active'));
        
        testimonialItems[index].classList.add('active');
        testimonialNavBtns[index].classList.add('active');
    };

    testimonialNavBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-advance testimonials
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialItems.length;
        showSlide(currentSlide);
    }, 5000);

    // Smooth scroll for hero scroll indicator
    const scrollIndicator = document.querySelector('.scroll-arrow');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const trustSection = document.querySelector('.trust-indicators');
            if (trustSection) {
                trustSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Enhanced form validation for modern contact form
    const modernContactForm = document.querySelector('.contact-form-modern');
    if (modernContactForm) {
        modernContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Enhanced validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                    field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
                } else {
                    field.style.borderColor = '#28a745';
                    field.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
                }
            });
            
            if (isValid) {
                showNotification('Thank you! Your quote request has been submitted successfully.', 'success');
                this.reset();
                
                // Reset field styles
                requiredFields.forEach(field => {
                    field.style.borderColor = '';
                    field.style.boxShadow = '';
                });
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }

    // Parallax effect for hero video background
    const heroVideo = document.querySelector('.hero-video-bg video');
    if (heroVideo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroVideo.style.transform = `translateY(${rate}px)`;
        });
    }

    // Advanced Modern Features
    
    // AOS (Animate On Scroll) Implementation
    const aosObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, aosObserverOptions);

    document.querySelectorAll('[data-aos]').forEach(element => {
        aosObserver.observe(element);
    });

    // Advanced Header Scroll Effect
    const modernHeader = document.querySelector('.header-modern');
    if (modernHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                modernHeader.classList.add('scrolled');
            } else {
                modernHeader.classList.remove('scrolled');
            }
        });
    }

    // Advanced Scroll Progress Indicator
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.height = scrollPercent + '%';
        });
    }

    // Interactive Stats with Enhanced Animations
    const heroStats = document.querySelectorAll('.hero-stat');
    heroStats.forEach(stat => {
        stat.addEventListener('mouseenter', () => {
            const progress = stat.querySelector('.stat-progress');
            if (progress) {
                progress.style.width = '100%';
            }
        });
        
        stat.addEventListener('mouseleave', () => {
            const progress = stat.querySelector('.stat-progress');
            if (progress) {
                progress.style.width = '0';
            }
        });
    });

    // Advanced Feature Cards with 3D Effects
    const featureCards = document.querySelectorAll('.feature-card-advanced');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `translateY(-12px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
        });
    });

    // Advanced Product Showcase with Parallax
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            item.style.transform = `scale(1.05) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotateY(0deg) rotateX(0deg)';
        });
    });

    // Parallax Background Effect
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            parallaxBg.style.transform = `translateY(${rate}px)`;
        });
    }

    // Advanced Form Interactions
    const formInputs = document.querySelectorAll('.contact-form-advanced input, .contact-form-advanced select');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Enhanced Button Glow Effects
    const modernButtons = document.querySelectorAll('.btn-modern, .btn-advanced');
    modernButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--mouse-x', x + 'px');
            button.style.setProperty('--mouse-y', y + 'px');
        });
    });

    // Floating Elements Animation
    const floatingShapes = document.querySelectorAll('.floating-shape');
    floatingShapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * -4}s`;
    });

    // Particle Animation Enhancement
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        particle.style.animationDelay = `${index * -2}s`;
    });

    // Advanced Testimonials with 3D Effect
    const testimonialCards = document.querySelectorAll('.testimonial-content');
    testimonialCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
        });
    });

    // Enhanced hover effects for hero visual elements
    const heroVisualElements = document.querySelectorAll('.hero-visual-element');
    heroVisualElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Advanced Form Validation with Visual Feedback
    const advancedContactForm = document.querySelector('.contact-form-advanced');
    if (advancedContactForm) {
        advancedContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                    field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
                    
                    // Add shake animation
                    field.style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => {
                        field.style.animation = '';
                    }, 500);
                } else {
                    field.style.borderColor = '#28a745';
                    field.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
                }
            });
            
            if (isValid) {
                showNotification('Thank you! Your quote request has been submitted successfully.', 'success');
                this.reset();
                
                requiredFields.forEach(field => {
                    field.style.borderColor = '';
                    field.style.boxShadow = '';
                });
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }

    // Add shake animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    console.log('AquaFlow Solutions advanced website loaded successfully!');
});

// ===== ADVANCED INDEX PAGE FEATURES =====

// Testimonials Slider
function initTestimonialsSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const navButtons = document.querySelectorAll('.testimonial-nav-btn');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        testimonialItems[index].classList.add('active');
        navButtons[index].classList.add('active');
    }

    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-advance slides
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialItems.length;
        showSlide(currentSlide);
    }, 5000);
}

// Animated Counters with Progress Circles
function initAnimatedCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    };

    const animateProgressCircle = (statItem) => {
        const circle = statItem.querySelector('.stat-circle path:last-child');
        const target = parseInt(statItem.querySelector('.stat-number').getAttribute('data-target'));
        const circumference = 100; // SVG circle circumference
        const progress = (target / 100) * circumference;
        
        circle.style.strokeDashoffset = circumference - progress;
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                
                const statItem = counter.closest('.stat-item');
                if (statItem) {
                    animateProgressCircle(statItem);
                }
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Enhanced Header Stats Animation
function initHeaderStats() {
    const headerStats = document.querySelectorAll('.header-stat-number');
    
    const animateHeaderCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // Increased duration for more noticeable animation
        const step = target / (duration / 16);
        let current = 0;
        
        // Add a small delay to make the animation more noticeable
        setTimeout(() => {
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toLocaleString();
            }, 16);
        }, 500); // 500ms delay
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateHeaderCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }); // Lowered threshold for earlier triggering

    headerStats.forEach(stat => observer.observe(stat));
}

// Advanced Feature Cards Hover Effects
function initAdvancedFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card-advanced');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Interactive Product Showcase
function initProductShowcase() {
    const showcaseItems = document.querySelectorAll('.showcase-item');
    
    showcaseItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });
}

// Enhanced Form Validation with Shake Animation
function initAdvancedFormValidation() {
    const forms = document.querySelectorAll('.contact-form-advanced');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    shakeElement(input);
                    input.style.borderColor = '#ff4757';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                    submitBtn.style.background = '#2ed573';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        form.reset();
                    }, 2000);
                }, 1500);
            }
        });
    });
}

// Shake Animation for Form Validation
function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Add shake animation to CSS
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
`;

// Inject shake animation CSS
const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize new advanced features
    initTestimonialsSlider();
    initAnimatedCounters();
    initHeaderStats();
    initAdvancedFeatureCards();
    initProductShowcase();
    initAdvancedFormValidation();
}); 