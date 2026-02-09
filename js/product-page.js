// Product Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Interactive Diagram Hotspots
    const hotspots = document.querySelectorAll('.hotspot');
    
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('mouseenter', function() {
            const infoBox = this.querySelector('.hotspot-info');
            infoBox.style.opacity = '1';
            infoBox.style.visibility = 'visible';
        });
        
        hotspot.addEventListener('mouseleave', function() {
            const infoBox = this.querySelector('.hotspot-info');
            infoBox.style.opacity = '0';
            infoBox.style.visibility = 'hidden';
        });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Close other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('i').classList.remove('fa-chevron-up');
                    otherItem.querySelector('i').classList.add('fa-chevron-down');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                answer.style.maxHeight = '0';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Next slide
    nextBtn.addEventListener('click', function() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= testimonialSlides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    });
    
    // Previous slide
    prevBtn.addEventListener('click', function() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = testimonialSlides.length - 1;
        }
        showSlide(prevIndex);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto-slide every 5 seconds
    setInterval(() => {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= testimonialSlides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }, 5000);
    
    // Contact Form Handling
    const inquiryForm = document.getElementById('product-inquiry-form');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h5>Thank you for your inquiry!</h5>
                        <p>We have received your request for "${formObject.requirement}". Our technical team will contact you within 24 hours.</p>
                        <p>For immediate assistance, call us at <strong>+91-XXXXXXXXXX</strong></p>
                    </div>
                `;
                
                // Insert success message
                inquiryForm.parentNode.insertBefore(successMessage, inquiryForm);
                inquiryForm.style.display = 'none';
                
                // Send data to server (example)
                console.log('Form submitted:', formObject);
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Gallery Lightbox initialization
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': 'Image %1 of %2',
            'fadeDuration': 300
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Performance metrics animation
    const metricCards = document.querySelectorAll('.metric-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metricValue = entry.target.querySelector('.metric-value');
                const text = metricValue.textContent;
                const number = parseFloat(text);
                const suffix = text.replace(number, '');
                
                if (!isNaN(number)) {
                    animateCounter(metricValue, number, suffix);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    metricCards.forEach(card => observer.observe(card));
    
    function animateCounter(element, target, suffix) {
        let current = 0;
        const increment = target / 50; // Adjust speed
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format based on target value
            if (target >= 1000) {
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            } else if (target % 1 !== 0) {
                element.textContent = current.toFixed(1) + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    }
    
    // Add product page specific styles
    if (!document.querySelector('#product-styles')) {
        const styles = document.createElement('style');
        styles.id = 'product-styles';
        styles.textContent = `
            /* Product page specific styles */
            .product-hero {
                padding: 120px 0 60px;
                background: linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%);
            }
            
            .breadcrumb {
                margin-bottom: 30px;
                font-size: 0.9rem;
                color: var(--medium-gray);
            }
            
            .breadcrumb a {
                color: var(--medium-gray);
                text-decoration: none;
            }
            
            .breadcrumb a:hover {
                color: var(--solar-yellow);
            }
            
            .breadcrumb span {
                color: var(--deep-blue);
                font-weight: 600;
            }
            
            .product-header {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 60px;
                align-items: center;
            }
            
            .product-tagline {
                font-size: 1.3rem;
                color: var(--medium-gray);
                margin-bottom: 30px;
            }
            
            .product-highlights {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
                margin-bottom: 30px;
            }
            
            .highlight-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 15px;
                background: rgba(253, 184, 19, 0.1);
                border-radius: 8px;
                border-left: 3px solid var(--solar-yellow);
            }
            
            .highlight-item i {
                color: var(--solar-yellow);
                font-size: 1.2rem;
            }
            
            .hero-cta {
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
            }
            
            .product-hero-media {
                position: relative;
            }
            
            .hero-image {
                border-radius: 15px;
                overflow: hidden;
                box-shadow: var(--shadow-medium);
            }
            
            .hero-image img {
                width: 100%;
                height: auto;
                display: block;
            }
            
            .video-preview {
                position: absolute;
                bottom: 20px;
                right: 20px;
            }
            
            .video-play-btn {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 12px 25px;
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
                border-radius: 50px;
                text-decoration: none;
                color: var(--deep-blue);
                font-weight: 600;
                box-shadow: var(--shadow-light);
                transition: all 0.3s ease;
            }
            
            .video-play-btn:hover {
                background: var(--white);
                transform: translateY(-3px);
                box-shadow: var(--shadow-medium);
            }
            
            .video-play-btn i {
                background: var(--solar-yellow);
                color: var(--dark-charcoal);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .problem-solution {
                padding: 60px 0;
                background: var(--light-gray);
            }
            
            .ps-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 30px;
            }
            
            .box-header {
                padding: 20px;
                border-radius: 10px 10px 0 0;
                color: white;
            }
            
            .problem-box .box-header {
                background: var(--accent-orange);
            }
            
            .solution-box .box-header {
                background: var(--eco-green);
            }
            
            .box-header h3 {
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .box-content {
                background: white;
                padding: 30px;
                border-radius: 0 0 10px 10px;
                box-shadow: var(--shadow-light);
            }
            
            .box-content ul {
                list-style: none;
                padding: 0;
                margin: 20px 0 0;
            }
            
            .box-content li {
                margin-bottom: 10px;
                padding-left: 25px;
                position: relative;
            }
            
            .box-content li:before {
                content: "•";
                color: var(--solar-yellow);
                font-size: 1.5rem;
                position: absolute;
                left: 0;
                top: -3px;
            }
            
            .process-steps {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 30px;
                margin: 50px 0;
            }
            
            .process-step {
                text-align: center;
                padding: 30px 20px;
                position: relative;
            }
            
            .step-number {
                position: absolute;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
                width: 30px;
                height: 30px;
                background: var(--solar-yellow);
                color: var(--dark-charcoal);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 0.9rem;
            }
            
            .step-icon {
                width: 80px;
                height: 80px;
                background: var(--deep-blue);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                font-size: 2rem;
            }
            
            .interactive-diagram {
                margin: 60px 0;
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: var(--shadow-light);
            }
            
            .diagram-container {
                position: relative;
                max-width: 800px;
                margin: 0 auto;
            }
            
            .diagram-main {
                width: 100%;
                height: auto;
                display: block;
                border-radius: 10px;
            }
            
            .hotspot {
                position: absolute;
                cursor: pointer;
            }
            
            .hotspot-dot {
                width: 20px;
                height: 20px;
                background: var(--solar-yellow);
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 0 10px rgba(0,0,0,0.3);
                transition: transform 0.3s ease;
            }
            
            .hotspot:hover .hotspot-dot {
                transform: scale(1.3);
            }
            
            .hotspot-info {
                position: absolute;
                bottom: 30px;
                left: 10px;
                width: 200px;
                background: white;
                padding: 15px;
                border-radius: 10px;
                box-shadow: var(--shadow-medium);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 10;
            }
            
            .hotspot-info h5 {
                margin: 0 0 5px;
                color: var(--deep-blue);
            }
            
            .hotspot-info p {
                margin: 0;
                font-size: 0.9rem;
                color: var(--medium-gray);
            }
            
            .technical-specs {
                background: var(--light-gray);
                padding: 80px 0;
            }
            
            .specs-wrapper {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 50px;
                margin: 40px 0;
            }
            
            .specs-table table {
                width: 100%;
                border-collapse: collapse;
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: var(--shadow-light);
            }
            
            .specs-table th {
                background: var(--deep-blue);
                color: white;
                padding: 15px;
                text-align: left;
                font-weight: 600;
            }
            
            .specs-table td {
                padding: 15px;
                border-bottom: 1px solid var(--light-gray);
            }
            
            .specs-table tr:last-child td {
                border-bottom: none;
            }
            
            .specs-table tr:hover td {
                background: rgba(253, 184, 19, 0.05);
            }
            
            .feature-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .feature-list li {
                display: flex;
                gap: 15px;
                margin-bottom: 25px;
                align-items: flex-start;
            }
            
            .feature-list i {
                color: var(--eco-green);
                font-size: 1.2rem;
                margin-top: 3px;
            }
            
            .feature-list strong {
                display: block;
                margin-bottom: 5px;
                color: var(--dark-charcoal);
            }
            
            .feature-list p {
                margin: 0;
                color: var(--medium-gray);
                font-size: 0.95rem;
            }
            
            .specs-download {
                text-align: center;
                margin-top: 40px;
            }
            
            .download-btn {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                padding: 15px 30px;
                background: var(--deep-blue);
                color: white;
                text-decoration: none;
                border-radius: 50px;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .download-btn:hover {
                background: var(--eco-green);
                transform: translateY(-3px);
                box-shadow: var(--shadow-medium);
            }
            
            .applications-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 30px;
                margin-top: 50px;
            }
            
            .application-card {
                text-align: center;
                padding: 40px 20px;
                background: white;
                border-radius: 15px;
                box-shadow: var(--shadow-light);
                transition: all 0.3s ease;
                border-top: 5px solid transparent;
            }
            
            .application-card:hover {
                transform: translateY(-10px);
                box-shadow: var(--shadow-medium);
                border-top-color: var(--solar-yellow);
            }
            
            .app-icon {
                width: 70px;
                height: 70px;
                background: var(--light-gray);
                color: var(--deep-blue);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                font-size: 1.8rem;
            }
            
            .performance-impact {
                background: var(--light-gray);
                padding: 80px 0;
            }
            
            .impact-metrics {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 30px;
                margin: 50px 0;
            }
            
            .metric-card {
                background: white;
                padding: 40px 20px;
                border-radius: 15px;
                text-align: center;
                box-shadow: var(--shadow-light);
            }
            
            .metric-value {
                font-size: 3.5rem;
                font-weight: 800;
                color: var(--deep-blue);
                line-height: 1;
                margin-bottom: 10px;
            }
            
            .metric-value span {
                font-size: 2rem;
                font-weight: 600;
            }
            
            .metric-label {
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--dark-charcoal);
                margin-bottom: 10px;
            }
            
            .metric-card p {
                color: var(--medium-gray);
                margin: 0;
                font-size: 0.95rem;
            }
            
            .case-study-preview {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 40px;
                background: white;
                padding: 40px;
                border-radius: 15px;
                margin-top: 60px;
                box-shadow: var(--shadow-light);
            }
            
            .case-results {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
                margin: 30px 0;
            }
            
            .result-item {
                text-align: center;
                padding: 20px;
                background: var(--light-gray);
                border-radius: 10px;
            }
            
            .result-value {
                font-size: 2rem;
                font-weight: 700;
                color: var(--solar-yellow);
                margin-bottom: 5px;
            }
            
            .result-label {
                font-size: 0.9rem;
                color: var(--medium-gray);
            }
            
            .case-image {
                border-radius: 10px;
                overflow: hidden;
            }
            
            .case-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .installation-gallery {
                padding: 80px 0;
            }
            
            .gallery-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin: 40px 0;
            }
            
            .gallery-grid a {
                position: relative;
                display: block;
                border-radius: 10px;
                overflow: hidden;
                height: 200px;
            }
            
            .gallery-grid img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
            }
            
            .gallery-grid a:hover img {
                transform: scale(1.05);
            }
            
            .gallery-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(11, 61, 145, 0.8);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .gallery-grid a:hover .gallery-overlay {
                opacity: 1;
            }
            
            .gallery-overlay i {
                font-size: 2rem;
                margin-bottom: 10px;
            }
            
            .gallery-cta {
                text-align: center;
                margin-top: 40px;
            }
            
            .testimonials {
                background: var(--light-gray);
                padding: 80px 0;
            }
            
            .testimonial-slider {
                max-width: 800px;
                margin: 50px auto 0;
                position: relative;
            }
            
            .testimonial-slide {
                display: none;
                animation: fadeIn 0.5s ease;
            }
            
            .testimonial-slide.active {
                display: block;
            }
            
            .testimonial-content {
                background: white;
                padding: 40px;
                border-radius: 15px;
                box-shadow: var(--shadow-light);
                position: relative;
            }
            
            .quote-icon {
                position: absolute;
                top: 20px;
                right: 20px;
                color: rgba(253, 184, 19, 0.2);
                font-size: 3rem;
            }
            
            .testimonial-text {
                font-size: 1.2rem;
                font-style: italic;
                color: var(--dark-charcoal);
                margin-bottom: 30px;
                line-height: 1.6;
            }
            
            .testimonial-author {
                display: flex;
                align-items: center;
                gap: 20px;
            }
            
            .author-info h4 {
                margin: 0 0 5px;
                color: var(--deep-blue);
            }
            
            .author-info p {
                margin: 0;
                color: var(--medium-gray);
                font-size: 0.95rem;
            }
            
            .slider-controls {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 30px;
                margin-top: 30px;
            }
            
            .slider-prev, .slider-next {
                background: var(--deep-blue);
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 1.2rem;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .slider-prev:hover, .slider-next:hover {
                background: var(--solar-yellow);
                color: var(--dark-charcoal);
                transform: scale(1.1);
            }
            
            .slider-dots {
                display: flex;
                gap: 10px;
            }
            
            .dot {
                width: 12px;
                height: 12px;
                background: var(--medium-gray);
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .dot.active {
                background: var(--solar-yellow);
                transform: scale(1.2);
            }
            
            .faq-section {
                padding: 80px 0;
            }
            
            .faq-accordion {
                max-width: 800px;
                margin: 50px auto 0;
            }
            
            .faq-item {
                margin-bottom: 15px;
                border: 1px solid var(--light-gray);
                border-radius: 10px;
                overflow: hidden;
            }
            
            .faq-question {
                padding: 20px 25px;
                background: white;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: background 0.3s ease;
            }
            
            .faq-question:hover {
                background: var(--light-gray);
            }
            
            .faq-question h4 {
                margin: 0;
                font-size: 1.1rem;
                color: var(--dark-charcoal);
            }
            
            .faq-question i {
                color: var(--solar-yellow);
                transition: transform 0.3s ease;
            }
            
            .faq-answer {
                padding: 0 25px;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
                background: white;
            }
            
            .faq-answer p {
                padding: 20px 0;
                margin: 0;
                color: var(--medium-gray);
                border-top: 1px solid var(--light-gray);
            }
            
            .product-contact {
                background: linear-gradient(135deg, var(--deep-blue) 0%, var(--eco-green) 100%);
                color: white;
                padding: 80px 0;
            }
            
            .contact-wrapper {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 60px;
            }
            
            .contact-info h3 {
                color: white;
                margin-bottom: 20px;
            }
            
            .info-points {
                margin-top: 40px;
            }
            
            .info-item {
                display: flex;
                gap: 15px;
                margin-bottom: 25px;
                align-items: flex-start;
            }
            
            .info-item i {
                color: var(--solar-yellow);
                font-size: 1.5rem;
                margin-top: 5px;
            }
            
            .info-item h5 {
                margin: 0 0 5px;
                color: white;
            }
            
            .info-item p {
                margin: 0;
                color: rgba(255, 255, 255, 0.8);
                font-size: 0.95rem;
            }
            
            .contact-form {
                background: white;
                padding: 40px;
                border-radius: 15px;
                box-shadow: var(--shadow-heavy);
            }
            
            .contact-form h4 {
                color: var(--deep-blue);
                margin-bottom: 30px;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: var(--dark-charcoal);
            }
            
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 12px 15px;
                border: 1px solid var(--light-gray);
                border-radius: 8px;
                font-family: var(--body-font);
                font-size: 1rem;
                transition: all 0.3s ease;
            }
            
            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: var(--solar-yellow);
                box-shadow: 0 0 0 3px rgba(253, 184, 19, 0.2);
            }
            
            .form-submit {
                text-align: center;
                margin-top: 30px;
            }
            
            .form-note {
                margin-top: 15px;
                color: var(--medium-gray);
                font-size: 0.9rem;
            }
            
            .form-success {
                background: white;
                padding: 40px;
                border-radius: 15px;
                box-shadow: var(--shadow-light);
                display: flex;
                gap: 20px;
                align-items: flex-start;
                animation: fadeIn 0.5s ease;
            }
            
            .form-success i {
                color: var(--eco-green);
                font-size: 2.5rem;
                flex-shrink: 0;
            }
            
            .form-success h5 {
                margin: 0 0 10px;
                color: var(--deep-blue);
            }
            
            .form-success p {
                margin: 0 0 10px;
                color: var(--medium-gray);
            }
            
            .related-products {
                padding: 80px 0;
                background: var(--light-gray);
            }
            
            .related-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
                margin-top: 50px;
            }
            
            .related-card {
                background: white;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: var(--shadow-light);
                transition: all 0.3s ease;
            }
            
            .related-card:hover {
                transform: translateY(-10px);
                box-shadow: var(--shadow-medium);
            }
            
            .related-card img {
                width: 100%;
                height: 200px;
                object-fit: cover;
            }
            
            .related-content {
                padding: 25px;
            }
            
            .related-content h4 {
                margin: 0 0 10px;
                color: var(--deep-blue);
            }
            
            .related-content p {
                margin: 0 0 20px;
                color: var(--medium-gray);
                font-size: 0.95rem;
            }
            
            .btn-link {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                color: var(--solar-yellow);
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .btn-link:hover {
                color: var(--accent-orange);
                gap: 12px;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            /* Responsive styles for product page */
            @media (max-width: 991px) {
                .product-header,
                .ps-grid,
                .specs-wrapper,
                .case-study-preview,
                .contact-wrapper {
                    grid-template-columns: 1fr;
                    gap: 40px;
                }
                
                .product-highlights {
                    grid-template-columns: 1fr;
                }
                
                .process-steps {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .applications-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .gallery-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            
            @media (max-width: 767px) {
                .process-steps,
                .applications-grid,
                .gallery-grid {
                    grid-template-columns: 1fr;
                }
                
                .form-row {
                    grid-template-columns: 1fr;
                }
                
                .related-grid {
                    grid-template-columns: 1fr;
                }
                
                .case-results {
                    grid-template-columns: 1fr;
                    gap: 15px;
                }
                
                .impact-metrics {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            
            @media (max-width: 575px) {
                .impact-metrics {
                    grid-template-columns: 1fr;
                }
                
                .hero-cta {
                    flex-direction: column;
                }
                
                .hero-cta .btn {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(styles);
    }
});