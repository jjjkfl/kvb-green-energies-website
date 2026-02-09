// Solutions Page Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const solutionTabs = document.querySelectorAll('.solution-tab');
    const solutionCategories = document.querySelectorAll('.solution-category');
    
    solutionTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target category
            const targetId = this.getAttribute('data-tab');
            
            // Update active tab
            solutionTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show target category
            solutionCategories.forEach(cat => {
                cat.classList.remove('active');
                if (cat.id === targetId) {
                    cat.classList.add('active');
                }
            });
            
            // Smooth scroll to category
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Solution Selector Wizard
    const selectorSteps = document.querySelectorAll('.step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const selectorResults = document.getElementById('selectorResults');
    let currentStep = 0;
    
    // Show current step
    function showStep(stepIndex) {
        selectorSteps.forEach((step, index) => {
            if (index === stepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update buttons
        prevBtn.disabled = stepIndex === 0;
        
        if (stepIndex === selectorSteps.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
        
        // Update current step
        currentStep = stepIndex;
    }
    
    // Next button
    nextBtn.addEventListener('click', function() {
        // Validate current step
        const currentStepElement = selectorSteps[currentStep];
        const selectedOption = currentStepElement.querySelector('input:checked');
        
        if (!selectedOption) {
            alert('Please select an option to continue.');
            return;
        }
        
        // Move to next step
        showStep(currentStep + 1);
    });
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        showStep(currentStep - 1);
    });
    
    // Submit button
    submitBtn.addEventListener('click', function() {
        // Collect all answers
        const application = document.querySelector('input[name="application"]:checked');
        const fuel = document.querySelector('input[name="fuel"]:checked');
        const scale = document.querySelector('input[name="scale"]:checked');
        
        if (!application || !fuel || !scale) {
            alert('Please answer all questions.');
            return;
        }
        
        // Determine recommendation based on answers
        const recommendations = getRecommendations(
            application.value,
            fuel.value,
            scale.value
        );
        
        // Display results
        displayRecommendations(recommendations);
    });
    
    // Get recommendations based on answers
    function getRecommendations(application, fuel, scale) {
        const recommendations = [];
        
        // Logic based on document requirements
        if (application === 'cooking') {
            if (scale === 'small') {
                recommendations.push({
                    title: 'Parabolic Solar Cookers',
                    description: 'Ideal for small community kitchens, schools, and hostels.',
                    features: ['Quick cooking', 'Easy operation', 'Low maintenance'],
                    link: 'solutions/solar-thermal-systems.html#parabolic'
                });
            } else {
                recommendations.push({
                    title: 'Solar Steam Cooking Systems',
                    description: 'Perfect for large institutional kitchens and community cooking.',
                    features: ['High capacity', 'Fuel savings up to 70%', 'Automated operation'],
                    link: 'solutions/solar-thermal-systems.html#steam-cooking'
                });
                
                if (scale === 'large') {
                    recommendations.push({
                        title: 'Solar Scheffler Dish Systems',
                        description: 'For very large scale cooking applications with high reliability.',
                        features: ['Industrial grade', 'High temperature', '25+ year lifespan'],
                        link: 'solutions/solar-thermal-systems.html#scheffler'
                    });
                }
            }
        }
        
        if (application === 'drying') {
            recommendations.push({
                title: 'Hybrid Solar Tunnel Dryers',
                description: 'Advanced crop drying systems for farmers and agri-processors.',
                features: ['Controlled drying', 'Reduced losses', 'Improved quality'],
                link: 'solutions/smart-agriculture.html#dryers'
            });
            
            if (fuel === 'firewood' || fuel === 'diesel') {
                recommendations.push({
                    title: 'Biomass Hybrid Heating',
                    description: 'For drying operations needing continuous thermal supply.',
                    features: ['24/7 operation', 'Renewable integration', 'Cost effective'],
                    link: 'solutions/energy-storage.html#biomass'
                });
            }
        }
        
        if (application === 'heating') {
            recommendations.push({
                title: 'PTC Thermal Systems',
                description: 'Industrial process heating solutions for various industries.',
                features: ['80-300°C range', 'High reliability', 'Customizable'],
                link: 'solutions/energy-storage.html#ptc'
            });
            
            if (fuel === 'electricity' || fuel === 'diesel') {
                recommendations.push({
                    title: 'Solar Scheffler Dish',
                    description: 'High temperature thermal systems for industrial applications.',
                    features: ['Up to 450°C', 'Precision tracking', 'Long lifespan'],
                    link: 'solutions/solar-thermal-systems.html#scheffler'
                });
            }
        }
        
        if (application === 'farming') {
            if (scale === 'small' || scale === 'medium') {
                recommendations.push({
                    title: 'Microgreen Systems',
                    description: 'Automated vertical farming for high-value crop production.',
                    features: ['Year-round production', 'Automated control', 'High density'],
                    link: 'solutions/smart-agriculture.html#microgreen'
                });
            }
            
            recommendations.push({
                title: 'AI Crop Quality Detection',
                description: 'Smart grading systems for improved product quality and pricing.',
                features: ['Automated grading', 'Quality consistency', 'Data analytics'],
                link: 'solutions/smart-agriculture.html#ai-crop'
            });
            
            recommendations.push({
                title: 'Soil-to-Sale Platform',
                description: 'Digital platform for farm management and market linkage.',
                features: ['Crop tracking', 'Quality monitoring', 'Market access'],
                link: 'solutions/smart-agriculture.html#soil-to-sale'
            });
        }
        
        // Add energy storage for larger scale applications
        if (scale === 'large' && (application === 'cooking' || application === 'heating')) {
            recommendations.push({
                title: 'Sand Battery Storage',
                description: 'Thermal energy storage for continuous renewable energy supply.',
                features: ['12-48 hour storage', 'Low cost', 'High capacity'],
                link: 'solutions/energy-storage.html#sand-battery'
            });
        }
        
        return recommendations;
    }
    
    // Display recommendations
    function displayRecommendations(recommendations) {
        if (recommendations.length === 0) {
            selectorResults.innerHTML = `
                <div class="recommendation-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>No specific recommendations found</h4>
                    <p>Please contact our technical team for a customized assessment.</p>
                    <a href="contact.html" class="btn btn-primary">Contact Technical Team</a>
                </div>
            `;
            return;
        }
        
        let html = `
            <div class="recommendations-header">
                <h4><i class="fas fa-lightbulb"></i> Recommended Solutions</h4>
                <p>Based on your requirements, here are our recommendations:</p>
            </div>
            <div class="recommendations-grid">
        `;
        
        recommendations.forEach(rec => {
            html += `
                <div class="recommendation-card">
                    <div class="rec-header">
                        <h5>${rec.title}</h5>
                    </div>
                    <div class="rec-body">
                        <p>${rec.description}</p>
                        <ul class="rec-features">
                            ${rec.features.map(feature => `<li><i class="fas fa-check-circle"></i> ${feature}</li>`).join('')}
                        </ul>
                        <a href="${rec.link}" class="btn btn-small">Learn More</a>
                    </div>
                </div>
            `;
        });
        
        html += `
            </div>
            <div class="recommendations-footer">
                <p><strong>Next Step:</strong> Schedule a consultation with our engineering team for detailed assessment.</p>
                <div class="rec-actions">
                    <a href="contact.html?request=consultation" class="btn btn-primary">Schedule Consultation</a>
                    <a href="tel:+911234567890" class="btn btn-outline">
                        <i class="fas fa-phone"></i> Call Now
                    </a>
                </div>
            </div>
        `;
        
        selectorResults.innerHTML = html;
        selectorResults.style.display = 'block';
        
        // Smooth scroll to results
        selectorResults.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Comparison table enhancements
    const comparisonTable = document.querySelector('.comparison-table table');
    if (comparisonTable) {
        // Make table rows clickable
        const tableRows = comparisonTable.querySelectorAll('tbody tr');
        tableRows.forEach(row => {
            row.addEventListener('click', function(e) {
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                    return; // Don't interfere with button clicks
                }
                
                const detailsBtn = this.querySelector('a');
                if (detailsBtn) {
                    detailsBtn.click();
                }
            });
            
            // Add hover effect
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(253, 184, 19, 0.1)';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });
    }
    
    // Add styles for solution selector
    if (!document.querySelector('#solutions-styles')) {
        const styles = document.createElement('style');
        styles.id = 'solutions-styles';
        styles.textContent = `
            /* Solutions page specific styles */
            .solutions-hero {
                background: linear-gradient(135deg, var(--deep-blue) 0%, var(--eco-green) 100%);
                color: white;
                padding: 120px 0 80px;
                text-align: center;
            }
            
            .solutions-nav {
                background: var(--light-gray);
                padding: 20px 0;
                position: sticky;
                top: 80px;
                z-index: 100;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            
            .solutions-tabs {
                display: flex;
                justify-content: center;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .solution-tab {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 15px 25px;
                background: white;
                border-radius: 50px;
                text-decoration: none;
                color: var(--dark-charcoal);
                font-weight: 600;
                transition: all 0.3s ease;
                border: 2px solid transparent;
            }
            
            .solution-tab:hover {
                transform: translateY(-3px);
                box-shadow: var(--shadow-medium);
            }
            
            .solution-tab.active {
                background: var(--solar-yellow);
                border-color: var(--solar-yellow);
                color: var(--dark-charcoal);
            }
            
            .solution-tab i {
                font-size: 1.2rem;
            }
            
            .solution-category {
                display: none;
                padding: 80px 0;
            }
            
            .solution-category.active {
                display: block;
            }
            
            .products-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
                margin-top: 50px;
            }
            
            .product-card {
                background: white;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: var(--shadow-light);
                transition: all 0.3s ease;
            }
            
            .product-card:hover {
                transform: translateY(-10px);
                box-shadow: var(--shadow-medium);
            }
            
            .product-image {
                height: 200px;
                overflow: hidden;
            }
            
            .product-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
            }
            
            .product-card:hover .product-image img {
                transform: scale(1.05);
            }
            
            .product-content {
                padding: 25px;
            }
            
            .product-features {
                list-style: none;
                margin: 20px 0;
                padding: 0;
            }
            
            .product-features li {
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .product-features i {
                color: var(--eco-green);
            }
            
            .solutions-comparison {
                background: var(--light-gray);
            }
            
            .comparison-table {
                overflow-x: auto;
                margin-top: 40px;
            }
            
            .comparison-table table {
                width: 100%;
                border-collapse: collapse;
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: var(--shadow-light);
            }
            
            .comparison-table th {
                background: var(--deep-blue);
                color: white;
                padding: 15px;
                text-align: left;
                font-weight: 600;
            }
            
            .comparison-table td {
                padding: 15px;
                border-bottom: 1px solid var(--light-gray);
            }
            
            .comparison-table tbody tr:hover {
                background: rgba(253, 184, 19, 0.05);
                cursor: pointer;
            }
            
            .btn-small {
                padding: 8px 16px;
                font-size: 0.9rem;
            }
            
            .solution-selector {
                background: linear-gradient(135deg, var(--eco-green) 0%, var(--deep-blue) 100%);
                color: white;
                padding: 80px 0;
            }
            
            .selector-wrapper {
                max-width: 800px;
                margin: 0 auto;
                text-align: center;
            }
            
            .step {
                display: none;
                animation: fadeIn 0.5s ease;
            }
            
            .step.active {
                display: block;
            }
            
            .option-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin: 40px 0;
            }
            
            .option-card {
                cursor: pointer;
            }
            
            .option-card input {
                display: none;
            }
            
            .option-content {
                background: rgba(255,255,255,0.1);
                border: 2px solid rgba(255,255,255,0.2);
                border-radius: 10px;
                padding: 30px 20px;
                text-align: center;
                transition: all 0.3s ease;
            }
            
            .option-content i {
                font-size: 2.5rem;
                margin-bottom: 15px;
                display: block;
                color: var(--solar-yellow);
            }
            
            .option-card input:checked + .option-content {
                background: rgba(253, 184, 19, 0.2);
                border-color: var(--solar-yellow);
                transform: translateY(-5px);
            }
            
            .option-card:hover .option-content {
                background: rgba(255,255,255,0.15);
                transform: translateY(-3px);
            }
            
            .navigation-buttons {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-top: 40px;
            }
            
            .results {
                display: none;
                margin-top: 50px;
                padding: 30px;
                background: rgba(255,255,255,0.1);
                border-radius: 15px;
                text-align: left;
                animation: fadeIn 0.5s ease;
            }
            
            .recommendations-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 25px;
                margin: 30px 0;
            }
            
            .recommendation-card {
                background: white;
                border-radius: 10px;
                overflow: hidden;
                color: var(--dark-charcoal);
            }
            
            .rec-header {
                background: var(--solar-yellow);
                padding: 20px;
                color: var(--dark-charcoal);
            }
            
            .rec-header h5 {
                margin: 0;
                font-size: 1.2rem;
            }
            
            .rec-body {
                padding: 20px;
            }
            
            .rec-features {
                list-style: none;
                padding: 0;
                margin: 15px 0;
            }
            
            .rec-features li {
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .rec-features i {
                color: var(--eco-green);
                font-size: 0.9rem;
            }
            
            .recommendation-error {
                text-align: center;
                padding: 30px;
            }
            
            .recommendation-error i {
                font-size: 3rem;
                color: var(--solar-yellow);
                margin-bottom: 20px;
            }
            
            .solutions-cta {
                background: var(--solar-yellow);
                text-align: center;
                padding: 80px 0;
            }
            
            .cta-content h2 {
                color: var(--dark-charcoal);
            }
            
            .cta-content p {
                color: rgba(28, 28, 28, 0.8);
                margin-bottom: 30px;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
});

// Product page template functionality
function initProductPage() {
    // Product specifications toggle
    const specToggle = document.querySelector('.specs-toggle');
    if (specToggle) {
        specToggle.addEventListener('click', function() {
            const specsContent = document.querySelector('.specs-content');
            specsContent.classList.toggle('expanded');
            this.textContent = specsContent.classList.contains('expanded') 
                ? 'Show Less' 
                : 'Show Full Specifications';
        });
    }
    
    // Image gallery
    const galleryImages = document.querySelectorAll('.gallery-thumb');
    const mainImage = document.querySelector('.product-main-image img');
    
    if (galleryImages.length > 0 && mainImage) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                // Update main image
                mainImage.src = this.src;
                
                // Update active thumbnail
                galleryImages.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // FAQ toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            answer.classList.toggle('active');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });
    
    // Document download tracking
    const downloadLinks = document.querySelectorAll('.download-link');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const docName = this.getAttribute('data-doc');
            console.log(`Document downloaded: ${docName}`);
            // Here you can send analytics data
        });
    });
}