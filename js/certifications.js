// Certifications Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Certification Filtering
    const categoryTabs = document.querySelectorAll('.category-tab');
    const certCards = document.querySelectorAll('.cert-card');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter certification cards
            certCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
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
    
    // Subsidy Calculator
    const subsidyCalculator = document.getElementById('subsidyCalculator');
    const subsidyResults = document.getElementById('subsidy-results');
    
    if (subsidyCalculator) {
        subsidyCalculator.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const projectType = document.getElementById('project-type').value;
            const clientType = document.getElementById('client-type').value;
            const state = document.getElementById('state').value;
            const systemCost = parseFloat(document.getElementById('system-cost').value);
            
            // Validate inputs
            if (!projectType || !clientType || !state || !systemCost || systemCost <= 0) {
                alert('Please fill in all fields with valid values.');
                return;
            }
            
            // Calculate subsidies based on rules
            let centralSubsidy = 0;
            let stateSubsidy = 0;
            let totalSubsidy = 0;
            let netCost = systemCost;
            
            // Central subsidy calculation (MNRE)
            if (projectType === 'cooking') {
                centralSubsidy = systemCost * 0.30; // 30% for cooking
            } else if (projectType === 'drying') {
                centralSubsidy = systemCost * 0.40; // 40% for drying
            } else if (projectType === 'processing') {
                centralSubsidy = systemCost * 0.35; // 35% for processing
            } else {
                centralSubsidy = systemCost * 0.25; // 25% for others
            }
            
            // State subsidy calculation
            if (state === 'karnataka') {
                if (clientType === 'farmer') {
                    stateSubsidy = systemCost * 0.20; // 20% for farmers in Karnataka
                } else if (clientType === 'institution' || clientType === 'religious') {
                    stateSubsidy = systemCost * 0.15; // 15% for institutions
                }
            } else if (state === 'tamil-nadu') {
                stateSubsidy = systemCost * 0.10; // 10% in Tamil Nadu
            } else if (state === 'goa') {
                stateSubsidy = systemCost * 0.25; // 25% in Goa
            } else if (state === 'maharashtra') {
                stateSubsidy = systemCost * 0.15; // 15% in Maharashtra
            }
            
            // Additional benefits for specific client types
            if (clientType === 'farmer') {
                // Farmers get additional benefits
                centralSubsidy += systemCost * 0.10;
            } else if (clientType === 'government') {
                // Government projects have special schemes
                stateSubsidy += systemCost * 0.05;
            }
            
            // Calculate total subsidy (capped at 60%)
            totalSubsidy = centralSubsidy + stateSubsidy;
            const maxSubsidy = systemCost * 0.60;
            if (totalSubsidy > maxSubsidy) {
                totalSubsidy = maxSubsidy;
            }
            
            netCost = systemCost - totalSubsidy;
            
            // Format currency
            const formatCurrency = (amount) => {
                return '₹' + amount.toLocaleString('en-IN', {
                    maximumFractionDigits: 0
                });
            };
            
            // Display results
            subsidyResults.innerHTML = `
                <div class="results-header">
                    <h4><i class="fas fa-calculator"></i> Subsidy Calculation Results</h4>
                </div>
                <div class="results-summary">
                    <div class="summary-item">
                        <div class="summary-label">System Cost</div>
                        <div class="summary-value">${formatCurrency(systemCost)}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">Central Subsidy (MNRE)</div>
                        <div class="summary-value subsidy-amount">${formatCurrency(centralSubsidy)}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">State Subsidy (${state})</div>
                        <div class="summary-value subsidy-amount">${formatCurrency(stateSubsidy)}</div>
                    </div>
                    <div class="summary-item total">
                        <div class="summary-label">Total Subsidy</div>
                        <div class="summary-value total-subsidy">${formatCurrency(totalSubsidy)}</div>
                    </div>
                    <div class="summary-item final">
                        <div class="summary-label">Your Net Cost</div>
                        <div class="summary-value net-cost">${formatCurrency(netCost)}</div>
                    </div>
                </div>
                <div class="results-breakdown">
                    <h5>Subsidy Breakdown:</h5>
                    <div class="breakdown-chart">
                        <div class="chart-bar">
                            <div class="chart-segment" style="width: ${(systemCost/systemCost)*100}%; background: #f0f0f0;">
                                <span>System Cost: ${formatCurrency(systemCost)}</span>
                            </div>
                        </div>
                        <div class="chart-bar">
                            <div class="chart-segment" style="width: ${(centralSubsidy/systemCost)*100}%; background: #FDB813;">
                                <span>Central Subsidy: ${formatCurrency(centralSubsidy)}</span>
                            </div>
                            <div class="chart-segment" style="width: ${(stateSubsidy/systemCost)*100}%; background: #3A7D44; margin-left: ${(centralSubsidy/systemCost)*100}%;">
                                <span>State Subsidy: ${formatCurrency(stateSubsidy)}</span>
                            </div>
                            <div class="chart-segment" style="width: ${(netCost/systemCost)*100}%; background: #0B3D91; margin-left: ${((centralSubsidy+stateSubsidy)/systemCost)*100}%;">
                                <span>Your Cost: ${formatCurrency(netCost)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="results-actions">
                    <p><strong>Next Steps:</strong> Contact our subsidy assistance team for detailed documentation support.</p>
                    <div class="action-buttons">
                        <a href="contact.html?type=subsidy" class="btn btn-primary">
                            <i class="fas fa-handshake"></i> Get Subsidy Assistance
                        </a>
                        <a href="downloads/subsidy-application-guide.pdf" class="btn btn-outline" download>
                            <i class="fas fa-download"></i> Download Application Guide
                        </a>
                    </div>
                </div>
            `;
            
            // Smooth scroll to results
            subsidyResults.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add styles for results if not already present
            if (!document.querySelector('#subsidy-styles')) {
                const styles = document.createElement('style');
                styles.id = 'subsidy-styles';
                styles.textContent = `
                    .results-header {
                        margin-bottom: 20px;
                        padding-bottom: 15px;
                        border-bottom: 1px solid var(--light-gray);
                    }
                    
                    .results-header h4 {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        color: var(--deep-blue);
                    }
                    
                    .results-summary {
                        background: var(--light-gray);
                        border-radius: 10px;
                        padding: 20px;
                        margin: 20px 0;
                    }
                    
                    .summary-item {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 15px;
                        padding-bottom: 15px;
                        border-bottom: 1px solid rgba(0,0,0,0.1);
                    }
                    
                    .summary-item:last-child {
                        border-bottom: none;
                        margin-bottom: 0;
                        padding-bottom: 0;
                    }
                    
                    .summary-item.total {
                        border-top: 2px solid var(--solar-yellow);
                        padding-top: 15px;
                        margin-top: 15px;
                    }
                    
                    .summary-item.final {
                        background: rgba(11, 61, 145, 0.1);
                        padding: 15px;
                        border-radius: 8px;
                        margin-top: 20px;
                    }
                    
                    .summary-label {
                        font-weight: 600;
                        color: var(--dark-charcoal);
                    }
                    
                    .summary-value {
                        font-weight: 700;
                        color: var(--dark-charcoal);
                    }
                    
                    .subsidy-amount {
                        color: var(--eco-green);
                    }
                    
                    .total-subsidy {
                        color: var(--solar-yellow);
                        font-size: 1.2rem;
                    }
                    
                    .net-cost {
                        color: var(--deep-blue);
                        font-size: 1.3rem;
                    }
                    
                    .results-breakdown {
                        margin: 30px 0;
                    }
                    
                    .breakdown-chart {
                        margin-top: 15px;
                    }
                    
                    .chart-bar {
                        height: 40px;
                        background: #f0f0f0;
                        border-radius: 5px;
                        margin-bottom: 10px;
                        overflow: hidden;
                        position: relative;
                    }
                    
                    .chart-segment {
                        height: 100%;
                        float: left;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: 600;
                        font-size: 0.9rem;
                        text-align: center;
                        transition: width 0.5s ease;
                    }
                    
                    .results-actions {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid var(--light-gray);
                    }
                    
                    .action-buttons {
                        display: flex;
                        gap: 15px;
                        margin-top: 20px;
                        flex-wrap: wrap;
                    }
                `;
                document.head.appendChild(styles);
            }
        });
    }
    
    // Document Download Tracking
    const downloadLinks = document.querySelectorAll('.doc-list a');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const fileName = this.querySelector('span').textContent;
            console.log(`Document downloaded: ${fileName}`);
            // Here you can send analytics data
        });
    });
    
    // Add page-specific styles
    if (!document.querySelector('#certifications-styles')) {
        const styles = document.createElement('style');
        styles.id = 'certifications-styles';
        styles.textContent = `
            /* Certifications page specific styles */
            .certifications-hero {
                padding: 120px 0 80px;
                background: linear-gradient(135deg, var(--deep-blue) 0%, var(--eco-green) 100%);
                color: white;
                text-align: center;
            }
            
            .certifications-hero .hero-subtitle {
                font-size: 1.5rem;
                margin-bottom: 20px;
                opacity: 0.9;
            }
            
            .certifications-hero .hero-description {
                max-width: 800px;
                margin: 0 auto 40px;
                font-size: 1.1rem;
                line-height: 1.6;
                opacity: 0.8;
            }
            
            .cert-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 30px;
                max-width: 600px;
                margin: 50px auto 0;
            }
            
            .cert-stats .stat {
                padding: 20px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .cert-stats .stat-number {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--solar-yellow);
                margin-bottom: 5px;
                line-height: 1;
            }
            
            .cert-stats .stat-number span {
                font-size: 1.5rem;
            }
            
            .cert-stats .stat-label {
                font-size: 0.9rem;
                opacity: 0.9;
            }
            
            .cert-categories {
                padding: 40px 0;
                background: var(--light-gray);
            }
            
            .category-tabs {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 10px;
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
            
            .certifications-grid {
                padding: 80px 0;
                background: white;
            }
            
            .certifications-grid .container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 30px;
            }
            
            .cert-card {
                background: var(--light-gray);
                border-radius: 15px;
                overflow: hidden;
                box-shadow: var(--shadow-light);
                transition: all 0.3s ease;
                opacity: 1;
                transform: translateY(0);
            }
            
            .cert-card:hover {
                transform: translateY(-10px);
                box-shadow: var(--shadow-medium);
            }
            
            .cert-badge {
                padding: 10px 20px;
                background: var(--deep-blue);
                color: white;
                font-size: 0.8rem;
                font-weight: 600;
                text-align: center;
            }
            
            .cert-header {
                padding: 25px 25px 15px;
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .cert-logo {
                width: 60px;
                height: 60px;
                background: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--deep-blue);
                font-size: 1.5rem;
                flex-shrink: 0;
            }
            
            .cert-title h3 {
                margin: 0 0 5px;
                color: var(--deep-blue);
                font-size: 1.2rem;
            }
            
            .cert-issuer {
                margin: 0;
                color: var(--medium-gray);
                font-size: 0.9rem;
            }
            
            .cert-content {
                padding: 0 25px 25px;
            }
            
            .cert-description {
                color: var(--dark-charcoal);
                line-height: 1.5;
                margin-bottom: 20px;
            }
            
            .cert-details {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin-bottom: 20px;
                padding: 15px;
                background: white;
                border-radius: 10px;
            }
            
            .detail {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .detail i {
                color: var(--solar-yellow);
                font-size: 1.2rem;
            }
            
            .detail-label {
                display: block;
                font-size: 0.8rem;
                color: var(--medium-gray);
            }
            
            .detail-value {
                display: block;
                font-weight: 600;
                color: var(--dark-charcoal);
            }
            
            .detail-value.active {
                color: var(--eco-green);
            }
            
            .cert-scope, .performance-metrics, .cert-benefits, .collaboration-areas {
                margin-bottom: 20px;
            }
            
            .cert-scope h4, .performance-metrics h4, .cert-benefits h4, .collaboration-areas h4 {
                color: var(--deep-blue);
                margin-bottom: 10px;
                font-size: 1.1rem;
            }
            
            .scope-list, .benefits-list, .areas-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .scope-list li, .benefits-list li, .areas-list li {
                margin-bottom: 8px;
                padding-left: 20px;
                position: relative;
                color: var(--dark-charcoal);
            }
            
            .scope-list li:before, .benefits-list li:before, .areas-list li:before {
                content: "•";
                color: var(--solar-yellow);
                position: absolute;
                left: 0;
                font-size: 1.2rem;
            }
            
            .performance-metrics .metrics-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                gap: 15px;
            }
            
            .metric {
                text-align: center;
                padding: 15px 10px;
                background: white;
                border-radius: 8px;
            }
            
            .metric-value {
                font-size: 1.8rem;
                font-weight: 700;
                color: var(--solar-yellow);
                margin-bottom: 5px;
                line-height: 1;
            }
            
            .metric-value span {
                font-size: 1.2rem;
            }
            
            .metric-label {
                font-size: 0.9rem;
                color: var(--medium-gray);
            }
            
            .cert-actions {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .cert-actions .btn {
                flex: 1;
                min-width: 120px;
                text-align: center;
            }
            
            .cert-benefits-section {
                padding: 80px 0;
                background: var(--light-gray);
            }
            
            .benefits-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
                margin-top: 50px;
            }
            
            .benefit-card {
                background: white;
                padding: 40px 30px;
                border-radius: 15px;
                text-align: center;
                box-shadow: var(--shadow-light);
                transition: all 0.3s ease;
            }
            
            .benefit-card:hover {
                transform: translateY(-10px);
                box-shadow: var(--shadow-medium);
            }
            
            .benefit-icon {
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
            
            .benefit-card h3 {
                margin-bottom: 15px;
                color: var(--deep-blue);
            }
            
            .benefit-card p {
                color: var(--medium-gray);
                line-height: 1.5;
            }
            
            .subsidy-calculator {
                padding: 80px 0;
                background: white;
            }
            
            .calculator-wrapper {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 60px;
                align-items: start;
            }
            
            .calculator-info h2 {
                color: var(--deep-blue);
                margin-bottom: 20px;
            }
            
            .calculator-info p {
                color: var(--medium-gray);
                margin-bottom: 30px;
                line-height: 1.6;
            }
            
            .subsidy-info {
                background: var(--light-gray);
                padding: 25px;
                border-radius: 15px;
                margin-top: 30px;
            }
            
            .scheme-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .scheme-list li {
                display: flex;
                gap: 15px;
                margin-bottom: 20px;
                align-items: flex-start;
            }
            
            .scheme-list li:last-child {
                margin-bottom: 0;
            }
            
            .scheme-list i {
                color: var(--solar-yellow);
                font-size: 1.5rem;
                margin-top: 3px;
            }
            
            .scheme-list strong {
                display: block;
                margin-bottom: 5px;
                color: var(--dark-charcoal);
            }
            
            .scheme-list p {
                margin: 0;
                color: var(--medium-gray);
                font-size: 0.95rem;
            }
            
            .calculator-form {
                background: var(--light-gray);
                padding: 40px;
                border-radius: 15px;
                box-shadow: var(--shadow-light);
            }
            
            .calculator-form h3 {
                color: var(--deep-blue);
                margin-bottom: 30px;
                text-align: center;
            }
            
            .calculator-form .form-group {
                margin-bottom: 20px;
            }
            
            .calculator-form label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: var(--dark-charcoal);
            }
            
            .calculator-form select,
            .calculator-form input {
                width: 100%;
                padding: 12px 15px;
                border: 1px solid #ddd;
                border-radius: 8px;
                font-family: var(--body-font);
                font-size: 1rem;
                transition: all 0.3s ease;
            }
            
            .calculator-form select:focus,
            .calculator-form input:focus {
                outline: none;
                border-color: var(--solar-yellow);
                box-shadow: 0 0 0 3px rgba(253, 184, 19, 0.2);
            }
            
            .form-submit {
                text-align: center;
                margin-top: 30px;
            }
            
            .calculator-results {
                margin-top: 30px;
                padding: 25px;
                background: white;
                border-radius: 10px;
                border: 1px solid var(--light-gray);
                display: none;
            }
            
            .cert-process {
                padding: 80px 0;
                background: var(--light-gray);
            }
            
            .process-steps {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 30px;
                margin-top: 50px;
                position: relative;
            }
            
            .process-steps:before {
                content: '';
                position: absolute;
                top: 30px;
                left: 50%;
                width: 80%;
                height: 3px;
                background: var(--solar-yellow);
                transform: translateX(-50%);
                z-index: 1;
            }
            
            .process-step {
                position: relative;
                z-index: 2;
                text-align: center;
            }
            
            .step-number {
                width: 60px;
                height: 60px;
                background: var(--deep-blue);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                font-weight: 700;
                margin: 0 auto 20px;
                border: 5px solid var(--light-gray);
            }
            
            .step-content h3 {
                color: var(--deep-blue);
                margin-bottom: 10px;
                font-size: 1.2rem;
            }
            
            .step-content p {
                color: var(--medium-gray);
                font-size: 0.95rem;
                line-height: 1.5;
            }
            
            .download-center {
                padding: 80px 0;
                background: white;
            }
            
            .download-categories {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 40px;
                margin-top: 50px;
            }
            
            .download-category h3 {
                color: var(--deep-blue);
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .download-category i {
                color: var(--solar-yellow);
            }
            
            .doc-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .doc-list li {
                margin-bottom: 15px;
            }
            
            .doc-list a {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 15px;
                background: var(--light-gray);
                border-radius: 10px;
                text-decoration: none;
                color: var(--dark-charcoal);
                transition: all 0.3s ease;
            }
            
            .doc-list a:hover {
                background: rgba(253, 184, 19, 0.1);
                transform: translateX(5px);
            }
            
            .doc-list i.fa-file-pdf {
                color: #e63946;
                font-size: 1.5rem;
            }
            
            .doc-list span:first-of-type {
                flex: 1;
                font-weight: 500;
            }
            
            .file-size {
                font-size: 0.85rem;
                color: var(--medium-gray);
            }
            
            .download-all {
                text-align: center;
                margin-top: 50px;
            }
            
            .cert-cta {
                padding: 100px 0;
                background: linear-gradient(135deg, var(--eco-green) 0%, var(--deep-blue) 100%);
                color: white;
                text-align: center;
            }
            
            .cert-cta h2 {
                color: white;
                margin-bottom: 20px;
            }
            
            .cert-cta p {
                max-width: 700px;
                margin: 0 auto 40px;
                font-size: 1.1rem;
                opacity: 0.9;
            }
            
            .cta-actions {
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
            
            /* Responsive styles */
            @media (max-width: 991px) {
                .calculator-wrapper {
                    grid-template-columns: 1fr;
                    gap: 40px;
                }
                
                .process-steps:before {
                    display: none;
                }
                
                .process-steps {
                    grid-template-columns: 1fr;
                    gap: 40px;
                }
                
                .download-categories {
                    grid-template-columns: 1fr;
                }
            }
            
            @media (max-width: 767px) {
                .cert-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .certifications-grid .container {
                    grid-template-columns: 1fr;
                }
                
                .benefits-grid {
                    grid-template-columns: 1fr;
                }
                
                .category-tabs {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .category-tab {
                    text-align: center;
                }
                
                .cert-actions {
                    flex-direction: column;
                }
                
                .cta-actions {
                    flex-direction: column;
                    align-items: center;
                }
                
                .cta-actions .btn {
                    width: 100%;
                    max-width: 300px;
                }
            }
            
            @media (max-width: 575px) {
                .cert-stats {
                    grid-template-columns: 1fr;
                }
                
                .cert-details {
                    grid-template-columns: 1fr;
                }
                
                .calculator-form {
                    padding: 25px 20px;
                }
            }
        `;
        document.head.appendChild(styles);
    }
});