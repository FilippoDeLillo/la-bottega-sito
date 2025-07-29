document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Wine Selection Functionality
    const wineButtons = document.querySelectorAll('.wine-btn');
    const wineDetails = document.getElementById('wine-details');
    
    const wineData = {
        chianti: {
            name: 'Chianti Classico DOCG',
            region: 'Toscana',
            color: 'Rosso rubino intenso',
            notes: 'Bouquet fruttato con sentori di ciliegia e spezie dolci'
        },
        vermentino: {
            name: 'Vermentino di Sardegna DOC',
            region: 'Sardegna',
            color: 'Giallo paglierino',
            notes: 'Fresco e minerale, con note di agrumi e erbe mediterranee'
        },
        sangiovese: {
            name: 'Sangiovese di Toscana IGT',
            region: 'Toscana',
            color: 'Rosso rubino',
            notes: 'Elegante e strutturato, con tannini morbidi e lunga persistenza'
        },
        pinot: {
            name: 'Pinot Grigio DOC',
            region: 'Veneto',
            color: 'Giallo paglierino tenue',
            notes: 'Secco e delicato, con sentori floreali e fruttati'
        }
    };
    
    wineButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            wineButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get wine data
            const wineType = this.getAttribute('data-wine');
            const wine = wineData[wineType];
            
            // Update wine details
            if (wine && wineDetails) {
                wineDetails.innerHTML = `
                    <h4>${wine.name}</h4>
                    <p><strong>Regione:</strong> ${wine.region}</p>
                    <p><strong>Colore:</strong> ${wine.color}</p>
                    <p><strong>Note:</strong> ${wine.notes}</p>
                `;
            }
        });
    });
    
    // Shop Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterCategory = this.getAttribute('data-category');
            
            // Show/hide products based on category
            productItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterCategory === 'all' || itemCategory === filterCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Add to Cart Functionality (Simple)
    const addToCartButtons = document.querySelectorAll('.product-item .btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.parentElement.querySelector('h4').textContent;
            
            // Simple feedback - in a real app this would add to cart
            alert(`"${productName}" aggiunto al carrello!`);
            
            // Add visual feedback
            this.textContent = 'Aggiunto!';
            this.style.background = '#4CAF50';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = 'Aggiungi';
                this.style.background = '';
            }, 2000);
        });
    });
    
    // Scroll Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements and observe them
    const elementsToAnimate = document.querySelectorAll('.feature-card, .product-card, .spirit-category, .product-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Hero Buttons Functionality
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Vini')) {
                // Scroll to wine section
                document.querySelector('#vino-sfuso').scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (this.textContent.includes('Negozio')) {
                // Scroll to shop section
                document.querySelector('#shop').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Navigation Link Highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Simple Form Validation (if contact form exists)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            if (name && email && message) {
                alert('Messaggio inviato! Ti risponderemo presto.');
                this.reset();
            } else {
                alert('Per favore compila tutti i campi.');
            }
        });
    }
    
    // Simple Newsletter Signup (if exists)
    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                alert('Grazie per la tua iscrizione alla newsletter!');
                this.reset();
            } else {
                alert('Per favore inserisci un indirizzo email valido.');
            }
        });
    }
});

// Utility Functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add back to top functionality
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        if (!document.querySelector('.back-to-top')) {
            const backToTop = document.createElement('button');
            backToTop.innerHTML = '↑';
            backToTop.className = 'back-to-top';
            backToTop.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border: none;
                border-radius: 50%;
                background: var(--primary-color);
                color: white;
                font-size: 20px;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            `;
            
            backToTop.addEventListener('click', scrollToTop);
            backToTop.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            backToTop.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            document.body.appendChild(backToTop);
        }
    } else {
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            backToTop.remove();
        }
    }
});

console.log('La Bottega di Lucca website loaded successfully!');
