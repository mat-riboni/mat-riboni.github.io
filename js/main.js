document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GESTIONE CURSORE PERSONALIZZATO ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    window.addEventListener('mousemove', e => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('a, button, .project');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // --- 2. HEADER STICKY ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // --- 3. INTERSECTION OBSERVER (Animazioni allo scroll) ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .timeline-item, .project').forEach((el, index) => {
        el.style.transitionDelay = (index % 3) * 100 + 'ms';
        observer.observe(el);
    });

    // --- 4. LINK MAGNETICI FOOTER ---
    const magneticLinks = document.querySelectorAll('.magnetic-link');
    
    magneticLinks.forEach(link => {
        const span = link.querySelector('span');
        
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            span.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
        });
        
        link.addEventListener('mouseleave', () => {
            span.style.transform = 'translate(0, 0)';
        });
    });


    // --- 5. SMOOTH SCROLL per link interni ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const offset = (targetId === '#hero') ? 0 : headerOffset; 
                
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- 6. SCROLL BOTTONE "PARLIAMONE" (NUOVO) ---
    const scrollToContactButton = document.querySelector('.scroll-to-contact');
    if (scrollToContactButton) {
        scrollToContactButton.addEventListener('click', () => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                // Ricalcola l'offset dell'header al momento del clic
                const headerOffset = document.querySelector('header.sticky') ? document.querySelector('header.sticky').offsetHeight : document.querySelector('header').offsetHeight;
                const elementPosition = contactSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    }

});
