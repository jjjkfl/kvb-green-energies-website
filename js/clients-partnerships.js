// Clients & Partnerships Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Leaflet Map
    function initIndiaMap() {
        const mapContainer = document.getElementById('indiaMap');
        if (!mapContainer) return;
        
        // Create map centered on India
        const map = L.map('indiaMap').setView([20.5937, 78.9629], 5);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 8,
            minZoom: 4
        }).addTo(map);
        
        // Define project locations with coordinates
        const projectLocations = [
            {
                name: "Indian Army - Chennai",
                coords: [13.0827, 80.2707],
                type: "solar",
                category: "government",
                details: "Solar Steam Cooking System"
            },
            {
                name: "INS Mandovi - Goa",
                coords: [15.2993, 74.1240],
                type: "solar",
                category: "government",
                details: "Naval Base Solar Thermal System"
            },
            {
                name: "YASHADA - Pune",
                coords: [18.5204, 73.8567],
                type: "solar",
                category: "government",
                details: "Training Institute Solar Kitchen"
            },
            {
                name: "UAS Bengaluru",
                coords: [12.9716, 77.5946],
                type: "multiple",
                category: "education",
                details: "University Hostel & Research"
            },
            {
                name: "UHS Bagalkot",
                coords: [16.1865, 75.6963],
                type: "multiple",
                category: "education",
                details: "Performance Testing Center"
            },
            {
                name: "IIT Dharwad",
                coords: [15.4589, 75.0078],
                type: "smart",
                category: "education",
                details: "Research Collaboration"
            },
            {
                name: "Sri Siddharodhmath - Hubli",
                coords: [15.3647, 75.1240],
                type: "solar",
                category: "religious",
                details: "Temple Kitchen System"
            },
            {
                name: "Sri Siddaganga Math - Tumkur",
                coords: [13.3409, 77.1025],
                type: "solar",
                category: "religious",
                details: "Community Kitchen"
            },
            {
                name: "Coffee Board - Balehonnur",
                coords: [13.3515, 75.4650],
                type: "drying",
                category: "agriculture",
                details: "Coffee Drying Demonstration"
            },
            {
                name: "NABARD - Bagalkot",
                coords: [16.1865, 75.6963],
                type: "multiple",
                category: "agriculture",
                details: "Farmer Training Projects"
            },
            {
                name: "ICAR - Goa",
                coords: [15.2993, 74.1240],
                type: "smart",
                category: "agriculture",
                details: "Agricultural Research"
            },
            {
                name: "Sugati Ingredients - Challakere",
                coords: [14.3172, 76.6510],
                type: "drying",
                category: "industry",
                details: "Food Processing Solar Drying"
            },
            {
                name: "Nithya Foods - Puttur",
                coords: [12.7680, 75.2047],
                type: "solar",
                category: "industry",
                details: "Food Processing Thermal System"
            },
            {
                name: "Prakruti - Karwar",
                coords: [14.8134, 74.1295],
                type: "drying",
                category: "industry",
                details: "Organic Food Processing"
            },
            {
                name: "Dantiwada Agriculture University",
                coords: [24.3165, 72.5561],
                type: "smart",
                category: "education",
                details: "Field Testing & Research"
            },
            {
                name: "Keladi University - Shivamogga",
                coords: [13.9299, 75.5681],
                type: "smart",
                category: "education",
                details: "Renewable Energy Research"
            }
        ];
        
        // Define icon colors based on type
        const iconColors = {
            solar: '#FDB813', // Solar yellow
            drying: '#3A7D44', // Eco green
            smart: '#0B3D91', // Deep blue
            multiple: '#FF6F00' // Accent orange
        };
        
        // Create custom icons
        function createIcon(type) {
            return L.divIcon({
                className: 'custom-marker',
                html: `<div class="map-marker" style="background-color: ${iconColors[type] || '#666'}"></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
                popupAnchor: [0, -10]
            });
        }
        
        // Add markers to map
        projectLocations.forEach(location => {
            const marker = L.marker(location.coords, {
                icon: createIcon(location.type)
            }).addTo(map);
            
            marker.bindPopup(`
                <div class="map-popup">
                    <h4>${location.name}</h4>
                    <p><strong>Project:</strong> ${location.details}</p>
                    <p><strong>Category:</strong> ${location.category.charAt(0).toUpperCase() + location.category.slice(1)}</p>
                    <a href="case-studies.html#${location.name.toLowerCase().replace(/\s+/g, '-')}" class="popup-link">View Details</a>
                </div>
            `);
            
            // Store category for filtering
            marker._category = location.category;
        });
        
        // Fit map to show all markers
        const bounds = L.latLngBounds(projectLocations.map(loc => loc.coords));
        map.fitBounds(bounds, { padding: [50, 50] });
        
        return map;
    }
    
    // Client Filtering
    const categoryTabs = document.querySelectorAll('.category-tab');
    const clientCards = document.querySelectorAll('.client-card');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter client cards
            clientCards.forEach(card => {
                if (category === 'all' || card.classList.contains(`category-${category}`)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Load More Clients
    const loadMoreBtn = document.getElementById('loadMoreClients');
    const allClientCards = Array.from(document.querySelectorAll('.client-card'));
    let visibleCount = 12; // Initial number of visible cards
    
    if (loadMoreBtn) {
        // Initially hide extra cards
        allClientCards.forEach((card, index) => {
            if (index >= visibleCount) {
                card.style.display = 'none';
            }
        });
        
        loadMoreBtn.addEventListener('click', function() {
            // Show next set of cards
            const nextCards = allClientCards.slice(visibleCount, visibleCount + 6);
            
            nextCards.forEach(card => {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            });
            
            visibleCount += 6;
            
            // Hide button if all cards are visible
            if (visibleCount >= allClientCards.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
    
    // Partnership Statements Slider
    const statementSlides = document.querySelectorAll('.statement-slide');
    const statementDots = document.querySelectorAll('.statement-slide .dot');
    const statementPrevBtn = document.querySelector('.statement-slide .slider-prev');
    const statementNextBtn = document.querySelector('.statement-slide .slider-next');
    let currentStatementSlide = 0;
    
    function showStatementSlide(index) {
        // Hide all slides
        statementSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        if (statementDots.length > 0) {
            statementDots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show current slide
            statementSlides[index].classList.add('active');
            statementDots[index].classList.add('active');
            currentStatementSlide = index;
        }
    }
    
    // Next slide
    if (statementNextBtn) {
        statementNextBtn.addEventListener('click', function() {
            let nextIndex = currentStatementSlide + 1;
            if (nextIndex >= statementSlides.length) {
                nextIndex = 0;
            }
            showStatementSlide(nextIndex);
        });
    }
    
    // Previous slide
    if (statementPrevBtn) {
        statementPrevBtn.addEventListener('click', function() {
            let prevIndex = currentStatementSlide - 1;
            if (prevIndex < 0) {
                prevIndex = statementSlides.length - 1;
            }
            showStatementSlide(prevIndex);
        });
    }
    
    // Dot navigation
    if (statementDots.length > 0) {
        statementDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showStatementSlide(index);
            });
        });
    }
    
    // Auto-slide every 7 seconds
    if (statementSlides.length > 1) {
        setInterval(() => {
            let nextIndex = currentStatementSlide + 1;
            if (nextIndex >= statementSlides.length) {
                nextIndex = 0;
            }
            showStatementSlide(nextIndex);
        }, 7000);
    }
    
    // Client Logos Marquee Animation
    const logosContainer = document.querySelector('.logos-container');
    if (logosContainer) {
        // Duplicate logos for seamless scrolling
        const logosHTML = logosContainer.innerHTML;
        logosContainer.innerHTML += logosHTML;
        
        // Animate scroll
        let position = 0;
        const speed = 1; // pixels per frame
        const fps = 60;
        
        function animateLogos() {
            position -= speed;
            
            // Reset position when half of content has scrolled
            if (position <= -logosContainer.scrollWidth / 2) {
                position = 0;
            }
            
            logosContainer.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animateLogos);
        }
        
        // Start animation
        animateLogos();
    }
    
    // Add page-specific styles
    if (!document.querySelector('#clients-styles')) {
        const styles = document.createElement('style');
        styles.id = 'clients-styles';
        styles.textContent = `
            /* Clients page specific styles */
            .clients-hero {
                padding: 120px 0 80px;
                background: linear-gradient(135deg, var(--deep-blue) 0%, var(--eco-green) 100%);
                color: white;
                text-align: center;
            }
            
            .clients-hero .hero-subtitle {
                font-size: 1.5rem;
                margin-bottom: 20px;
                opacity: 0.9;
            }
            
            .clients-hero .hero-description {
                max-width: 800px;
                margin: 0 auto 40px;
                font-size: 1.1rem;
                line-height: 1.6;
                opacity: 0.8;
            }
            
            .hero-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 30px;
                max-width: 600px;
                margin: 50px auto 0;
            }
            
            .hero-stats .stat {
                padding: 20px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .hero-stats .stat-number {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--solar-yellow);
                margin-bottom: 5px;
                line-height: 1;
            }
            
            .hero-stats .stat-number span {
                font-size: 1.5rem;
            }
            
            .hero-stats .stat-label {
                font-size: 0.9rem;
                opacity: 0.9;
            }
            
            .client-categories {
                padding: 80px 0 40px;
                background: var(--light-gray);
            }
            
            .category-tabs {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 10px;
                margin: 40px 0;
            }
            
            .category-tab {
                padding: 12px 25px;
                background: white;
                border: 2px solid var(--light-gray);
                border-radius: 50px;
                font-family: var(--heading-font);
                font-weight: 600;
                color: var(--medium-gray);
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .category-tab:hover {
                border-color: var(--solar-yellow);
                color: var(--dark-charcoal);
                transform: translateY(-2px);
            }
            
            .category-tab.active {
                background: var(--solar-yellow);
                border-color: var(--solar-yellow);
                color: var(--dark-charcoal);
            }
            
            .india-map-section {
                margin-top: 60px;
                padding: 40px;
                background: white;
                border-radius: 15px;
                box-shadow: var(--shadow-light);
            }
            
            .india-map-section h3 {
                text-align: center;
                margin-bottom: 30px;
                color: var(--deep-blue);
            }
            
            .map-container {
                display: grid;
                grid-template-columns: 3fr 1fr;
                gap: 30px;
                height: 500px;
            }
            
            #indiaMap {
                height: 100%;
                border-radius: 10px;
                overflow: hidden;
                border: 1px solid var(--light-gray);
            }
            
            .map-legend {
                padding: 20px;
                background: var(--light-gray);
                border-radius: 10px;
            }
            
            .map-legend h4 {
                margin-bottom: 20px;
                color: var(--deep-blue);
            }
            
            .legend-items {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .legend-item {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .legend-icon {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: inline-block;
            }
            
            .legend-icon.solar {
                background-color: var(--solar-yellow);
            }
            
            .legend-icon.drying {
                background-color: var(--eco-green);
            }
            
            .legend-icon.smart {
                background-color: var(--deep-blue);
            }
            
            .legend-icon.multiple {
                background-color: var(--accent-orange);
            }
            
            /* Custom Leaflet marker styles */
            .custom-marker {
                background: transparent;
                border: none;
            }
            
            .map-marker {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            
            .map-marker:hover {
                transform: scale(1.3);
            }
            
            .map-popup {
                padding: 10px;
                min-width: 200px;
            }
            
            .map-popup h4 {
                margin: 0 0 10px;
                color: var(--deep-blue);
                font-size: 1.1rem;
            }
            
            .map-popup p {
                margin: 5px 0;
                font-size: 0.9rem;
                color: var(--medium-gray);
            }
            
            .popup-link {
                display: inline-block;
                margin-top: 10px;
                padding: 5px 15px;
                background: var(--solar-yellow);
                color: var(--dark-charcoal);
                text-decoration: none;
                border-radius: 5px;
                font-size: 0.9rem;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .popup-link:hover {
                background: var(--accent-orange);
                color: white;
            }
            
            .prestigious-clients {
                padding: 80px 0;
                background: white;
            }
            
            .clients-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 30px;
                margin-top: 50px;
            }
            
            .client-card {
                display: flex;
                flex-direction: column;
                padding: 30px;
                background: var(--light-gray);
                border-radius: 15px;
                border-left: 5px solid var(--deep-blue);
                transition: all 0.3s ease;
                opacity: 1;
                transform: translateY(0);
            }
            
            .client-card:hover {
                transform: translateY(-10px);
                box-shadow: var(--shadow-medium);
                border-left-color: var(--solar-yellow);
            }
            
            .client-logo {
                width: 60px;
                height: 60px;
                background: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                color: var(--deep-blue);
                font-size: 1.5rem;
            }
            
            .client-info h3 {
                margin: 0 0 5px;
                color: var(--deep-blue);
                font-size: 1.3rem;
            }
            
            .client-location {
                color: var(--medium-gray);
                font-size: 0.9rem;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 5px;
            }
            
            .client-location i {
                font-size: 0.8rem;
            }
            
            .client-project {
                margin: 10px 0 15px;
                color: var(--dark-charcoal);
                line-height: 1.5;
            }
            
            .client-impact {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin: 15px 0 20px;
            }
            
            .impact-stat {
                padding: 5px 12px;
                background: rgba(253, 184, 19, 0.1);
                color: var(--dark-charcoal);
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 500;
            }
            
            .client-link {
                margin-top: auto;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                color: var(--solar-yellow);
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .client-link:hover {
                color: var(--accent-orange);
                gap: 12px;
            }
            
            .view-all-clients {
                text-align: center;
                margin-top: 50px;
            }
            
            .partnership-statements {
                padding: 80px 0;
                background: var(--light-gray);
            }
            
            .statement-slider {
                max-width: 800px;
                margin: 50px auto 0;
                position: relative;
            }
            
            .statement-slide {
                display: none;
                animation: fadeIn 0.5s ease;
            }
            
            .statement-slide.active {
                display: block;
            }
            
            .statement-content {
                background: white;
                padding: 40px;
                border-radius: 15px;
                box-shadow: var(--shadow-light);
            }
            
            .statement-text {
                position: relative;
                padding: 0 30px;
                margin-bottom: 40px;
            }
            
            .statement-text i:first-child {
                position: absolute;
                top: -20px;
                left: 0;
                font-size: 3rem;
                color: rgba(253, 184, 19, 0.2);
            }
            
            .statement-text i:last-child {
                position: absolute;
                bottom: -20px;
                right: 0;
                font-size: 3rem;
                color: rgba(253, 184, 19, 0.2);
            }
            
            .statement-text p {
                font-size: 1.2rem;
                font-style: italic;
                color: var(--dark-charcoal);
                line-height: 1.6;
                text-align: center;
            }
            
            .statement-author {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 20px;
            }
            
            .author-avatar {
                width: 70px;
                height: 70px;
                background: var(--solar-yellow);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--dark-charcoal);
                font-size: 1.5rem;
            }
            
            .author-info h4 {
                margin: 0 0 5px;
                color: var(--deep-blue);
            }
            
            .author-info p {
                margin: 0;
                color: var(--medium-gray);
                font-size: 0.9rem;
            }
            
            .author-org {
                font-weight: 600;
                color: var(--dark-charcoal) !important;
                margin-top: 5px !important;
            }
            
            .statement-slider .slider-controls {
                margin-top: 30px;
            }
            
            .partnership-opportunities {
                padding: 80px 0;
                background: white;
            }
            
            .opportunities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
                margin-top: 50px;
            }
            
            .opportunity-card {
                padding: 40px 30px;
                background: var(--light-gray);
                border-radius: 15px;
                text-align: center;
                border-top: 5px solid transparent;
                transition: all 0.3s ease;
            }
            
            .opportunity-card:hover {
                transform: translateY(-10px);
                box-shadow: var(--shadow-medium);
                border-top-color: var(--solar-yellow);
            }
            
            .opportunity-icon {
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
            
            .opportunity-card h3 {
                margin-bottom: 15px;
                color: var(--deep-blue);
            }
            
            .opportunity-card p {
                color: var(--medium-gray);
                margin-bottom: 20px;
                line-height: 1.5;
            }
            
            .opportunity-list {
                list-style: none;
                padding: 0;
                margin: 25px 0;
                text-align: left;
            }
            
            .opportunity-list li {
                margin-bottom: 10px;
                padding-left: 25px;
                position: relative;
                color: var(--dark-charcoal);
            }
            
            .opportunity-list li:before {
                content: "✓";
                position: absolute;
                left: 0;
                color: var(--eco-green);
                font-weight: bold;
            }
            
            .client-logos-marquee {
                padding: 60px 0;
                background: linear-gradient(135deg, var(--deep-blue) 0%, var(--eco-green) 100%);
                color: white;
                overflow: hidden;
            }
            
            .client-logos-marquee h3 {
                text-align: center;
                margin-bottom: 40px;
                font-size: 1.5rem;
            }
            
            .logos-track {
                width: 100%;
                overflow: hidden;
                position: relative;
            }
            
            .logos-container {
                display: flex;
                gap: 50px;
                width: max-content;
                animation: none; /* Controlled by JS */
            }
            
            .logo-item {
                flex-shrink: 0;
                padding: 20px 40px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                min-width: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .logo-img {
                color: white;
                font-weight: 600;
                text-align: center;
            }
            
            .become-partner {
                padding: 100px 0;
                background: linear-gradient(135deg, var(--eco-green) 0%, var(--deep-blue) 100%);
                color: white;
                text-align: center;
            }
            
            .partner-cta-content h2 {
                color: white;
                margin-bottom: 20px;
            }
            
            .partner-cta-content p {
                max-width: 700px;
                margin: 0 auto 50px;
                font-size: 1.1rem;
                opacity: 0.9;
            }
            
            .partner-benefits {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 30px;
                margin-bottom: 50px;
            }
            
            .benefit {
                padding: 30px 20px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .benefit i {
                font-size: 2.5rem;
                color: var(--solar-yellow);
                margin-bottom: 20px;
                display: block;
            }
            
            .benefit h4 {
                color: white;
                margin-bottom: 10px;
            }
            
            .benefit p {
                margin: 0;
                opacity: 0.8;
                font-size: 0.95rem;
            }
            
            .partner-actions {
                display: flex;
                justify-content: center;
                gap: 20px;
                flex-wrap: wrap;
            }
            
            .btn-outline-light {
                background: transparent;
                color: white;
                border-color: white;
            }
            
            .btn-outline-light:hover {
                background: white;
                color: var(--deep-blue);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            /* Responsive styles */
            @media (max-width: 991px) {
                .map-container {
                    grid-template-columns: 1fr;
                    height: 400px;
                }
                
                .clients-grid {
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                }
                
                .opportunities-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .partner-benefits {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            
            @media (max-width: 767px) {
                .hero-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .category-tabs {
                    gap: 8px;
                }
                
                .category-tab {
                    padding: 10px 20px;
                    font-size: 0.9rem;
                }
                
                .clients-grid {
                    grid-template-columns: 1fr;
                }
                
                .opportunities-grid {
                    grid-template-columns: 1fr;
                }
                
                .partner-benefits {
                    grid-template-columns: 1fr;
                }
                
                .partner-actions {
                    flex-direction: column;
                    align-items: center;
                }
                
                .partner-actions .btn {
                    width: 100%;
                    max-width: 300px;
                }
                
                .statement-author {
                    flex-direction: column;
                    text-align: center;
                }
            }
            
            @media (max-width: 575px) {
                .hero-stats {
                    grid-template-columns: 1fr;
                }
                
                .category-tabs {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .category-tab {
                    text-align: center;
                }
                
                .india-map-section {
                    padding: 20px;
                }
                
                .logo-item {
                    min-width: 150px;
                    padding: 15px 25px;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Initialize map after styles are loaded
    setTimeout(initIndiaMap, 100);
});