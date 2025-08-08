document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.problem-card, .solution-item, .benefit-item, .testimonial');
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    const ctaButtons = document.querySelectorAll('.hero-cta, .cta-primary, .cta-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    let scrollTimer = null;
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        scrollTimer = setTimeout(function() {
            lastScrollTop = scrollTop;
        }, 100);
    }, false);
    
    header.style.transition = 'transform 0.3s ease';
    
    const countElements = document.querySelectorAll('.price-amount');
    
    countElements.forEach(element => {
        const targetText = element.textContent;
        const targetNumber = parseInt(targetText.replace(/[^0-9]/g, ''));
        if (isNaN(targetNumber)) return;
        
        let hasAnimated = false;
        
        const countObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    let currentNumber = 0;
                    const increment = targetNumber / 30;
                    const timer = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= targetNumber) {
                            currentNumber = targetNumber;
                            clearInterval(timer);
                        }
                        element.textContent = Math.floor(currentNumber).toLocaleString() + '円';
                    }, 30);
                }
            });
        }, { threshold: 0.5 });
        
        countObserver.observe(element);
    });
    
    if (window.innerWidth <= 768) {
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.innerHTML = '<span></span><span></span><span></span>';
        mobileMenuButton.style.cssText = `
            display: none;
            flex-direction: column;
            gap: 4px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
        `;
        
        const menuSpans = mobileMenuButton.querySelectorAll('span');
        menuSpans.forEach(span => {
            span.style.cssText = `
                width: 25px;
                height: 3px;
                background: var(--text-primary);
                transition: transform 0.3s;
            `;
        });
        
        if (window.innerWidth <= 768) {
            mobileMenuButton.style.display = 'flex';
        }
        
        const headerContent = document.querySelector('.header-content');
        const nav = document.querySelector('.nav');
        
        headerContent.appendChild(mobileMenuButton);
        
        mobileMenuButton.addEventListener('click', function() {
            const isOpen = nav.style.display === 'flex';
            
            if (isOpen) {
                nav.style.display = 'none';
                menuSpans[0].style.transform = 'none';
                menuSpans[1].style.opacity = '1';
                menuSpans[2].style.transform = 'none';
            } else {
                nav.style.cssText = `
                    display: flex;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    flex-direction: column;
                    background: white;
                    padding: 1rem;
                    box-shadow: var(--shadow-md);
                `;
                menuSpans[0].style.transform = 'rotate(45deg) translateY(8px)';
                menuSpans[1].style.opacity = '0';
                menuSpans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            }
        });
    }
});