// Sustainability Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Animated Impact Counters
    function animateCounters() {
        const counters = [
            { id: 'co2-saved', target: 2850, suffix: '+' },
            { id: 'firewood-saved', target: 5200, suffix: '+' },
            { id: 'lpg-saved', target: 158000, suffix: '+' },
            { id: 'people-impacted', target: 10500, suffix: '+' }
        ];

        counters.forEach(counter => {
            const element = document.getElementById(counter.id);
            if (!element) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(element, counter.target, counter.suffix);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(element);
        });
    }

    function animateCounter(element, target, suffix) {
        const valueSpan = element.querySelector('span') || element;
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        const stepTime = duration / (target / increment);

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format based on target value
            if (target >= 1000) {
                valueSpan.textContent = Math.floor(current).toLocaleString('en-IN') + suffix;
            } else {
                valueSpan.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    }

    // Initialize counters
    animateCounters();

    // Comparison Tabs
    const comparisonTabs = document.querySelectorAll('.comparison-tab');
    const comparisonCharts = document.querySelectorAll('.comparison-chart');

    comparisonTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            comparisonTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const comparisonType = this.getAttribute('data-comparison');

            // Show corresponding chart
            comparisonCharts.forEach(chart => {
                chart.classList.remove('active');
                if (chart.id === `${comparisonType}-comparison`) {
                    chart.classList.add('active');
                }
            });

            // Initialize chart if not already initialized
            initializeChart(comparisonType);
        });
    });

    // Chart.js Initialization
    let firewoodChart = null;
    let lpgChart = null;

    function initializeChart(chartType) {
        if (chartType === 'firewood' && !firewoodChart) {
            createFirewoodChart();
        } else if (chartType === 'lpg' && !lpgChart) {
            createLPGChart();
        }
    }

    function createFirewoodChart() {
        const ctx = document.getElementById('firewoodChart');
        if (!ctx) return;

        firewoodChart = new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['CO₂ Emissions (kg)', 'Fuel Cost (₹)', 'Deforestation Impact', 'Health Impact'],
                datasets: [
                    {
                        label: 'Traditional Firewood',
                        data: [280, 4000, 90, 85],
                        backgroundColor: '#FF6F00',
                        borderColor: '#FF6F00',
                        borderWidth: 1
                    },
                    {
                        label: 'KVB Solar Cooking',
                        data: [5, 800, 5, 10],
                        backgroundColor: '#3A7D44',
                        borderColor: '#3A7D44',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Firewood vs Solar Cooking: Annual Impact per 100 meals/day'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.dataIndex === 0) {
                                    label += context.raw + ' kg CO₂';
                                } else if (context.dataIndex === 1) {
                                    label += '₹' + context.raw.toLocaleString('en-IN');
                                } else {
                                    label += context.raw + '/100 score';
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Impact Score / Quantity'
                        }
                    }
                }
            }
        });
    }

    function createLPGChart() {
        const ctx = document.getElementById('lpgChart');
        if (!ctx) return;

        lpgChart = new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Annual Fuel Cost', 'CO₂ Emissions', 'Operational Reliability', 'Energy Independence'],
                datasets: [
                    {
                        label: 'LPG Cooking',
                        data: [750000, 11000, 70, 40],
                        backgroundColor: '#FDB813',
                        borderColor: '#FDB813',
                        borderWidth: 1
                    },
                    {
                        label: 'Solar Cooking (70% solar + 30% LPG backup)',
                        data: [225000, 3300, 90, 85],
                        backgroundColor: '#0B3D91',
                        borderColor: '#0B3D91',
                        borderWidth: 1
                    },
                    {
                        label: 'Solar Cooking (Hybrid)',
                        data: [180000, 2200, 95, 90],
                        backgroundColor: '#3A7D44',
                        borderColor: '#3A7D44',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'LPG vs Solar Cooking: Annual Comparison for 500 meals/day'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.dataIndex === 0) {
                                    label += '₹' + context.raw.toLocaleString('en-IN');
                                } else if (context.dataIndex === 1) {
                                    label += context.raw + ' kg CO₂';
                                } else {
                                    label += context.raw + '/100 score';
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cost (₹) / Emissions (kg) / Score'
                        },
                        ticks: {
                            callback: function(value) {
                                if (value >= 100000) {
                                    return '₹' + (value/100000).toFixed(0) + 'L';
                                }
                                return value;
                            }
                        }
                    }
                }
            }
        });
    }

    // Carbon Calculator
    const carbonCalculator = document.getElementById('carbonCalculator');
    const carbonResults = document.getElementById('carbon-results');
    const fuelTypeSelect = document.getElementById('fuel-type');
    const consumptionUnit = document.getElementById('consumption-unit');

    // Update unit based on fuel type
    fuelTypeSelect.addEventListener('change', function() {
        const unit = this.value === 'electricity' ? 'kWh' : 
                    this.value === 'firewood' ? 'kg' : 
                    this.value === 'lpg' ? 'kg' : 
                    this.value === 'diesel' ? 'liters' : 'kg';
        consumptionUnit.textContent = unit;
    });

    if (carbonCalculator) {
        carbonCalculator.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const fuelType = document.getElementById('fuel-type').value;
            const fuelConsumption = parseFloat(document.getElementById('fuel-consumption').value);
            const application = document.getElementById('application').value;
            const capacity = document.getElementById('capacity').value;

            // Validate inputs
            if (!fuelType || !fuelConsumption || fuelConsumption <= 0 || !application) {
                alert('Please fill in all required fields with valid values.');
                return;
            }

            // Calculate carbon emissions
            const emissionFactors = {
                firewood: 1.5, // kg CO2 per kg firewood
                lpg: 3.0,     // kg CO2 per kg LPG
                diesel: 2.7,  // kg CO2 per liter diesel
                electricity: 0.8 // kg CO2 per kWh (grid average)
            };

            const conversionFactors = {
                firewood: 1,    // 1 kg firewood
                lpg: 1,         // 1 kg LPG
                diesel: 1,      // 1 liter diesel
                electricity: 1  // 1 kWh
            };

            const efficiencyFactors = {
                cooking: 0.7,    // 70% replacement for cooking
                drying: 0.8,     // 80% replacement for drying
                heating: 0.75    // 75% replacement for heating
            };

            // Calculate annual emissions
            const monthlyEmissions = fuelConsumption * emissionFactors[fuelType];
            const annualEmissions = monthlyEmissions * 12;

            // Calculate potential savings
            const replacementRate = efficiencyFactors[application];
            const annualSavings = annualEmissions * replacementRate;

            // Calculate equivalent trees
            const treesEquivalent = Math.round(annualSavings / 22); // One tree absorbs ~22 kg CO2 per year

            // Calculate cost savings (simplified)
            const fuelPrices = {
                firewood: 5,     // ₹ per kg
                lpg: 100,        // ₹ per kg
                diesel: 90,      // ₹ per liter
                electricity: 8   // ₹ per kWh
            };

            const monthlyCost = fuelConsumption * fuelPrices[fuelType];
            const annualCost = monthlyCost * 12;
            const annualCostSavings = annualCost * replacementRate;

            // Format results
            const formatNumber = (num) => num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
            const formatCurrency = (amount) => '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });

            // Display results
            carbonResults.innerHTML = `
                <div class="results-header">
                    <h4><i class="fas fa-leaf"></i> Carbon Savings Analysis</h4>
                    <p>Based on your current ${fuelType} consumption for ${application}</p>
                </div>
                
                <div class="results-summary">
                    <div class="summary-row">
                        <div class="summary-item">
                            <div class="summary-label">Current Annual Emissions</div>
                            <div class="summary-value">${formatNumber(annualEmissions)} kg CO₂</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-label">Potential Annual Savings</div>
                            <div class="summary-value savings">${formatNumber(annualSavings)} kg CO₂</div>
                        </div>
                    </div>
                    
                    <div class="summary-row">
                        <div class="summary-item">
                            <div class="summary-label">Current Annual Fuel Cost</div>
                            <div class="summary-value">${formatCurrency(annualCost)}</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-label">Potential Annual Savings</div>
                            <div class="summary-value savings">${formatCurrency(annualCostSavings)}</div>
                        </div>
                    </div>
                </div>
                
                <div class="results-equivalents">
                    <h5>Environmental Equivalents:</h5>
                    <div class="equivalents-grid">
                        <div class="equivalent">
                            <i class="fas fa-tree"></i>
                            <div>
                                <div class="equivalent-value">${treesEquivalent}</div>
                                <div class="equivalent-label">Trees planted</div>
                            </div>
                        </div>
                        <div class="equivalent">
                            <i class="fas fa-car"></i>
                            <div>
                                <div class="equivalent-value">${Math.round(annualSavings / 0.12)}</div>
                                <div class="equivalent-label">Car km avoided</div>
                            </div>
                        </div>
                        <div class="equivalent">
                            <i class="fas fa-home"></i>
                            <div>
                                <div class="equivalent-value">${Math.round(annualSavings / 2000)}</div>
                                <div class="equivalent-label">Homes powered for a year</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="results-visualization">
                    <h5>Impact Visualization:</h5>
                    <div class="visualization-chart">
                        <div class="chart-bar">
                            <div class="bar-segment current" style="width: 100%">
                                <span>Current: ${formatNumber(annualEmissions)} kg CO₂</span>
                            </div>
                        </div>
                        <div class="chart-bar">
                            <div class="bar-segment saved" style="width: ${replacementRate * 100}%">
                                <span>Saved: ${formatNumber(annualSavings)} kg CO₂</span>
                            </div>
                            <div class="bar-segment remaining" style="width: ${(1 - replacementRate) * 100}%">
                                <span>Remaining: ${formatNumber(annualEmissions - annualSavings)} kg CO₂</span>
                            </div>
                        </div>
                        <div class="chart-legend">
                            <div class="legend-item">
                                <span class="legend-color saved"></span>
                                <span>Potential Savings with KVB System</span>
                            </div>
                            <div class="legend-item">
                                <span class="legend-color remaining"></span>
                                <span>Remaining Emissions</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="results-actions">
                    <p><strong>Ready to reduce your carbon footprint?</strong> Our team can provide a detailed assessment for your specific needs.</p>
                    <div class="action-buttons">
                        <a href="contact.html?type=carbon-assessment" class="btn btn-primary">
                            <i class="fas fa-calendar-alt"></i> Schedule Assessment
                        </a>
                        <a href="downloads/carbon-reduction-guide.pdf" class="btn btn-outline" download>
                            <i class="fas fa-download"></i> Download Guide
                        </a>
                    </div>
                </div>
            `;

            // Show results with animation
            carbonResults.style.display = 'block';
            carbonResults.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Add results styles if not already present
            if (!document.querySelector('#carbon-results-styles')) {
                const styles = document.createElement('style');
                styles.id = 'carbon-results-styles';
                styles.textContent = `
                    .calculator-results {
                        margin-top: 30px;
                        padding: 25px;
                        background: white;
                        border-radius: 10px;
                        border: 1px solid var(--light-gray);
                        display: none;
                        animation: fadeIn 0.5s ease;
                    }
                    
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
                        margin-bottom: 5px;
                    }
                    
                    .results-header p {
                        color: var(--medium-gray);
                        margin: 0;
                        font-size: 0.95rem;
                    }
                    
                    .results-summary {
                        background: var(--light-gray);
                        border-radius: 10px;
                        padding: 20px;
                        margin: 20px 0;
                    }
                    
                    .summary-row {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 20px;
                        margin-bottom: 20px;
                    }
                    
                    .summary-row:last-child {
                        margin-bottom: 0;
                    }
                    
                    .summary-item {
                        text-align: center;
                        padding: 15px;
                        background: white;
                        border-radius: 8px;
                    }
                    
                    .summary-label {
                        font-size: 0.9rem;
                        color: var(--medium-gray);
                        margin-bottom: 8px;
                    }
                    
                    .summary-value {
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: var(--dark-charcoal);
                    }
                    
                    .summary-value.savings {
                        color: var(--eco-green);
                    }
                    
                    .results-equivalents {
                        margin: 30px 0;
                    }
                    
                    .results-equivalents h5 {
                        color: var(--deep-blue);
                        margin-bottom: 15px;
                    }
                    
                    .equivalents-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                        gap: 20px;
                    }
                    
                    .equivalent {
                        text-align: center;
                        padding: 20px 15px;
                        background: var(--light-gray);
                        border-radius: 10px;
                    }
                    
                    .equivalent i {
                        font-size: 2rem;
                        color: var(--solar-yellow);
                        margin-bottom: 10px;
                        display: block;
                    }
                    
                    .equivalent-value {
                        font-size: 1.8rem;
                        font-weight: 700;
                        color: var(--deep-blue);
                        margin-bottom: 5px;
                    }
                    
                    .equivalent-label {
                        font-size: 0.9rem;
                        color: var(--medium-gray);
                    }
                    
                    .results-visualization {
                        margin: 30px 0;
                    }
                    
                    .results-visualization h5 {
                        color: var(--deep-blue);
                        margin-bottom: 15px;
                    }
                    
                    .visualization-chart {
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        border: 1px solid var(--light-gray);
                    }
                    
                    .chart-bar {
                        height: 40px;
                        background: #f8f9fa;
                        border-radius: 5px;
                        margin-bottom: 15px;
                        overflow: hidden;
                        position: relative;
                    }
                    
                    .bar-segment {
                        height: 100%;
                        float: left;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: 600;
                        font-size: 0.85rem;
                        text-align: center;
                        transition: width 0.5s ease;
                    }
                    
                    .bar-segment.current {
                        background: var(--accent-orange);
                    }
                    
                    .bar-segment.saved {
                        background: var(--eco-green);
                    }
                    
                    .bar-segment.remaining {
                        background: var(--medium-gray);
                    }
                    
                    .chart-legend {
                        display: flex;
                        gap: 20px;
                        flex-wrap: wrap;
                        justify-content: center;
                        margin-top: 15px;
                    }
                    
                    .legend-item {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 0.9rem;
                        color: var(--dark-charcoal);
                    }
                    
                    .legend-color {
                        width: 15px;
                        height: 15px;
                        border-radius: 3px;
                        display: inline-block;
                    }
                    
                    .legend-color.saved {
                        background: var(--eco-green);
                    }
                    
                    .legend-color.remaining {
                        background: var(--medium-gray);
                    }
                    
                    .results-actions {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid var(--light-gray);
                        text-align: center;
                    }
                    
                    .results-actions p {
                        margin-bottom: 20px;
                        color: var(--dark-charcoal);
                    }
                    
                    .action-buttons {
                        display: flex;
                        gap: 15px;
                        justify-content: center;
                        flex-wrap: wrap;
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `;
                document.head.appendChild(styles);
            }
        });
    }

    // Add page-specific styles
    if (!document.querySelector('#sustainability-styles')) {
        const styles = document.createElement('style');
        styles.id = 'sustainability-styles';
        styles.textContent = `
            /* Sustainability page specific styles */
            .sustainability-hero {
                padding: 120px 0 80px;
                background: linear-gradient(135deg, var(--eco-green) 0%, var(--deep-blue) 100%);
                color: white;
                text-align: center;
            }
            
            .sustainability-hero .hero-subtitle {
                font-size: 1.5rem;
                margin-bottom: 20px;
                opacity: 0.9;
            }
            
            .sustainability-hero .hero-description {
                max-width: 800px;
                margin: 0 auto 40px;
                font-size: 1.1rem;
                line-height: 1.6;
                opacity: 0.8;
            }
            
            .impact-dashboard {
                max-width: 1000px;
                margin: 50px auto 0;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 30px;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .dashboard-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .dashboard-header h3 {
                display: flex;
                align-items: center;
                gap: 10px;
                color: white;
                margin: 0;
            }
            
            .dashboard-update {
                color: rgba(255, 255, 255, 0.8);
                font-size: 0.9rem;
                margin: 0;
            }
            
            .dashboard-metrics {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 20px;
            }
            
            .metric-card {
                background: rgba(255, 255, 255, 0.15);
                border-radius: 15px;
                padding: 25px 20px;
                display: flex;
                align-items: center;
                gap: 20px;
                transition: all 0.3s ease;
            }
            
            .metric-card:hover {
                background: rgba(255, 255, 255, 0.25);
                transform: translateY(-5px);
            }
            
            .metric-icon {
                width: 70px;
                height: 70px;
                background: var(--solar-yellow);
                color: var(--dark-charcoal);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                flex-shrink: 0;
            }
            
            .metric-data {
                flex: 1;
            }
            
            .metric-value {
                font-size: 2.2rem;
                font-weight: 800;
                color: white;
                line-height: 1;
                margin-bottom: 5px;
            }
            
            .metric-value span {
                font-size: 1.5rem;
            }
            
            .metric-label {
                font-size: 1rem;
                color: rgba(255, 255, 255, 0.9);
                margin-bottom: 5px;
                font-weight: 600;
            }
            
            .metric-equivalent {
                font-size: 0.85rem;
                color: rgba(255, 255, 255, 0.7);
            }
            
            .dashboard-update-info {
                padding: 15px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                border-left: 4px solid var(--solar-yellow);
            }
            
            .dashboard-update-info p {
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
                color: rgba(255, 255, 255, 0.9);
                font-size: 0.9rem;
            }
            
            .impact-comparison {
                padding: 80px 0;
                background: white;
            }
            
            .comparison-tabs {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 10px;
                margin: 40px 0;
            }
            
            .comparison-tab {
                padding: 12px 30px;
                background: var(--light-gray);
                border: 2px solid var(--light-gray);
                border-radius: 50px;
                font-family: var(--heading-font);
                font-weight: 600;
                color: var(--medium-gray);
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .comparison-tab:hover {
                border-color: var(--solar-yellow);
                color: var(--dark-charcoal);
            }
            
            .comparison-tab.active {
                background: var(--solar-yellow);
                border-color: var(--solar-yellow);
                color: var(--dark-charcoal);
            }
            
            .comparison-content {
                margin-top: 40px;
            }
            
            .comparison-chart {
                display: none;
                animation: fadeIn 0.5s ease;
            }
            
            .comparison-chart.active {
                display: block;
            }
            
            .chart-container {
                height: 400px;
                margin-bottom: 40px;
            }
            
            .chart-analysis {
                background: var(--light-gray);
                padding: 30px;
                border-radius: 15px;
            }
            
            .chart-analysis h3 {
                color: var(--deep-blue);
                margin-bottom: 25px;
                text-align: center;
            }
            
            .analysis-points {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
            }
            
            .point {
                padding: 25px;
                border-radius: 10px;
                border-left: 5px solid transparent;
            }
            
            .point.negative {
                background: rgba(255, 111, 0, 0.1);
                border-left-color: var(--accent-orange);
            }
            
            .point.positive {
                background: rgba(58, 125, 68, 0.1);
                border-left-color: var(--eco-green);
            }
            
            .point i {
                font-size: 2rem;
                margin-bottom: 15px;
                display: block;
            }
            
            .point.negative i {
                color: var(--accent-orange);
            }
            
            .point.positive i {
                color: var(--eco-green);
            }
            
            .point h4 {
                margin: 0 0 15px;
                color: var(--dark-charcoal);
            }
            
            .point ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .point li {
                margin-bottom: 8px;
                padding-left: 20px;
                position: relative;
                color: var(--dark-charcoal);
            }
            
            .point li:before {
                content: "•";
                position: absolute;
                left: 0;
                font-size: 1.2rem;
            }
            
            .point.negative li:before {
                color: var(--accent-orange);
            }
            
            .point.positive li:before {
                color: var(--eco-green);
            }
            
            .carbon-calculator {
                padding: 80px 0;
                background: var(--light-gray);
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
            
            .calculator-instructions {
                background: white;
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 30px;
            }
            
            .calculator-instructions h4 {
                color: var(--deep-blue);
                margin-bottom: 10px;
            }
            
            .carbon-facts {
                background: white;
                padding: 25px;
                border-radius: 15px;
            }
            
            .carbon-facts h4 {
                color: var(--deep-blue);
                margin-bottom: 20px;
            }
            
            .facts-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .facts-list li {
                display: flex;
                gap: 15px;
                margin-bottom: 25px;
                align-items: flex-start;
            }
            
            .facts-list li:last-child {
                margin-bottom: 0;
            }
            
            .facts-list i {
                color: var(--solar-yellow);
                font-size: 1.5rem;
                margin-top: 3px;
            }
            
            .facts-list strong {
                display: block;
                margin-bottom: 5px;
                color: var(--dark-charcoal);
            }
            
            .facts-list p {
                margin: 0;
                color: var(--medium-gray);
                font-size: 0.95rem;
            }
            
            .calculator-form {
                background: white;
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
            
            .input-group {
                display: flex;
            }
            
            .input-group input {
                border-radius: 8px 0 0 8px;
                flex: 1;
            }
            
            .input-unit {
                background: var(--light-gray);
                padding: 0 15px;
                display: flex;
                align-items: center;
                border: 1px solid #ddd;
                border-left: none;
                border-radius: 0 8px 8px 0;
                color: var(--medium-gray);
            }
            
            .input-hint {
                display: block;
                margin-top: 5px;
                font-size: 0.85rem;
                color: var(--medium-gray);
            }
            
            .form-submit {
                text-align: center;
                margin-top: 30px;
            }
            
            .social-impact {
                padding: 80px 0;
                background: white;
            }
            
            .impact-areas {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
                margin-top: 50px;
            }
            
            .impact-area {
                display: flex;
                gap: 20px;
                padding: 30px;
                background: var(--light-gray);
                border-radius: 15px;
                transition: all 0.3s ease;
            }
            
            .impact-area:hover {
                transform: translateY(-10px);
                box-shadow: var(--shadow-medium);
            }
            
            .area-icon {
                width: 70px;
                height: 70px;
                background: var(--deep-blue);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.8rem;
                flex-shrink: 0;
            }
            
            .area-content h3 {
                color: var(--deep-blue);
                margin-bottom: 15px;
            }
            
            .area-content p {
                color: var(--medium-gray);
                margin-bottom: 20px;
                line-height: 1.5;
            }
            
            .impact-stats {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }
            
            .impact-stats .stat {
                text-align: center;
                padding: 15px 10px;
                background: white;
                border-radius: 8px;
            }
            
            .impact-stats .stat-value {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--solar-yellow);
                margin-bottom: 5px;
                line-height: 1;
            }
            
            .impact-stats .stat-value span {
                font-size: 1rem;
            }
            
            .impact-stats .stat-label {
                font-size: 0.85rem;
                color: var(--medium-gray);
            }
            
            .impact-case-studies {
                padding: 80px 0;
                background: var(--light-gray);
            }
            
            .impact-cases {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
                gap: 40px;
                margin-top: 50px;
            }
            
            .impact-case {
                background: white;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: var(--shadow-light);
                transition: all 0.3s ease;
            }
            
            .impact-case:hover {
                transform: translateY(-10px);
                box-shadow: var(--shadow-medium);
            }
            
            .case-image {
                height: 250px;
                position: relative;
                overflow: hidden;
            }
            
            .case-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
            }
            
            .impact-case:hover .case-image img {
                transform: scale(1.05);
            }
            
            .case-badge {
                position: absolute;
                top: 20px;
                right: 20px;
                padding: 8px 20px;
                background: var(--solar-yellow);
                color: var(--dark-charcoal);
                border-radius: 20px;
                font-weight: 600;
                font-size: 0.85rem;
            }
            
            .case-content {
                padding: 30px;
            }
            
            .case-content h3 {
                color: var(--deep-blue);
                margin-bottom: 10px;
            }
            
            .case-location {
                color: var(--medium-gray);
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .case-description {
                color: var(--dark-charcoal);
                margin-bottom: 20px;
                line-height: 1.5;
            }
            
            .impact-metrics {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
                margin: 25px 0;
            }
            
            .impact-metric {
                text-align: center;
                padding: 15px 10px;
                background: var(--light-gray);
                border-radius: 10px;
            }
            
            .impact-metric .metric-value {
                font-size: 1.8rem;
                font-weight: 700;
                color: var(--solar-yellow);
                margin-bottom: 5px;
                line-height: 1;
            }
            
            .impact-metric .metric-value span {
                font-size: 1.2rem;
            }
            
            .impact-metric .metric-label {
                font-size: 0.9rem;
                color: var(--medium-gray);
            }
            
            .impact-quote {
                margin: 25px 0 0;
                padding: 20px;
                background: var(--light-gray);
                border-radius: 10px;
                border-left: 4px solid var(--solar-yellow);
                position: relative;
            }
            
            .impact-quote i:first-child {
                color: var(--solar-yellow);
                font-size: 1.5rem;
                position: absolute;
                top: 10px;
                left: 10px;
            }
            
            .impact-quote p {
                margin: 0 0 10px;
                font-style: italic;
                color: var(--dark-charcoal);
                padding-left: 25px;
            }
            
            .impact-quote cite {
                display: block;
                text-align: right;
                color: var(--medium-gray);
                font-size: 0.9rem;
                font-style: normal;
            }
            
            .sdg-section {
                padding: 80px 0;
                background: white;
            }
            
            .sdg-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
                margin-top: 50px;
            }
            
            .sdg-card {
                display: flex;
                gap: 20px;
                padding: 25px;
                background: var(--light-gray);
                border-radius: 15px;
                transition: all 0.3s ease;
            }
            
            .sdg-card:hover {
                transform: translateY(-5px);
                box-shadow: var(--shadow-light);
            }
            
            .sdg-icon {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.5rem;
                font-weight: 700;
                flex-shrink: 0;
            }
            
            .sdg-content h3 {
                color: var(--dark-charcoal);
                margin-bottom: 10px;
                font-size: 1.1rem;
            }
            
            .sdg-content p {
                color: var(--medium-gray);
                margin: 0;
                font-size: 0.95rem;
                line-height: 1.5;
            }
            
            .sustainability-commitment {
                padding: 80px 0;
                background: linear-gradient(135deg, var(--deep-blue) 0%, var(--eco-green) 100%);
                color: white;
            }
            
            .commitment-content {
                max-width: 800px;
                margin: 0 auto;
                text-align: center;
            }
            
            .commitment-content h2 {
                color: white;
                margin-bottom: 20px;
            }
            
            .commitment-content p {
                font-size: 1.1rem;
                opacity: 0.9;
                margin-bottom: 50px;
            }
            
            .commitment-points {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
                margin-bottom: 50px;
            }
            
            .commitment-point {
                display: flex;
                gap: 15px;
                text-align: left;
                padding: 25px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .commitment-point i {
                color: var(--solar-yellow);
                font-size: 1.8rem;
                margin-top: 5px;
            }
            
            .commitment-point h4 {
                color: white;
                margin-bottom: 10px;
            }
            
            .commitment-point p {
                margin: 0;
                opacity: 0.8;
                font-size: 0.95rem;
            }
            
            .commitment-cta {
                margin-top: 40px;
            }
            
            .impact-cta {
                padding: 100px 0;
                background: linear-gradient(135deg, var(--eco-green) 0%, var(--deep-blue) 100%);
                color: white;
                text-align: center;
            }
            
            .impact-cta h2 {
                color: white;
                margin-bottom: 20px;
            }
            
            .impact-cta p {
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
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            /* Responsive styles */
            @media (max-width: 991px) {
                .calculator-wrapper {
                    grid-template-columns: 1fr;
                    gap: 40px;
                }
                
                .analysis-points {
                    grid-template-columns: 1fr;
                    gap: 20px;
                }
                
                .impact-cases {
                    grid-template-columns: 1fr;
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
            
            @media (max-width: 767px) {
                .dashboard-metrics {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .comparison-tabs {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .comparison-tab {
                    text-align: center;
                }
                
                .impact-areas {
                    grid-template-columns: 1fr;
                }
                
                .impact-metrics {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .sdg-grid {
                    grid-template-columns: 1fr;
                }
                
                .commitment-points {
                    grid-template-columns: 1fr;
                }
            }
            
            @media (max-width: 575px) {
                .dashboard-metrics {
                    grid-template-columns: 1fr;
                }
                
                .metric-card {
                    flex-direction: column;
                    text-align: center;
                }
                
                .impact-metrics {
                    grid-template-columns: 1fr;
                }
                
                .impact-case {
                    margin: 0 -20px;
                    border-radius: 0;
                }
                
                .chart-container {
                    height: 300px;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // Initialize first chart
    initializeChart('firewood');
});