/**
 * KVB Green Energies - ROI Calculator Logic
 * Handles the Return on Investment calculations for solar thermal systems.
 */

document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.getElementById('subsidyCalculator'); // Reusing the ID from the template or defining a new one
    
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateROI();
        });
    }

    // Also attach to product page calculator buttons if they exist
    const calcBtns = document.querySelectorAll('.btn-secondary'); // Assuming "Calculate Savings" buttons have this class
    calcBtns.forEach(btn => {
        if (btn.textContent.includes('Calculate')) {
            btn.addEventListener('click', function(e) {
                // simple scroll to calculator section if it exists, or open modal
                // For now, let's assume there's a specialized calculator section or modal
                console.log('Open calculator modal');
            });
        }
    });
});

function calculateROI() {
    // Inputs
    const fuelType = document.getElementById('fuel-type')?.value || 'lpg';
    const dailyConsumption = parseFloat(document.getElementById('daily-consumption')?.value || 0);
    const fuelCost = parseFloat(document.getElementById('fuel-cost')?.value || 0);

    // Constants (Approximate values)
    const solarEfficiency = 0.7; // 70% savings
    const operationDays = 300; // Days per year

    if (!dailyConsumption || !fuelCost) {
        alert("Please enter valid consumption and cost details.");
        return;
    }

    // Calculation
    const dailyCost = dailyConsumption * fuelCost;
    const annualCost = dailyCost * operationDays;
    const annualSavings = annualCost * solarEfficiency;
    
    // Impact
    const co2Factor = 2.98; // kg CO2 per kg LPG (approx)
    const annualCO2Savings = dailyConsumption * operationDays * solarEfficiency * co2Factor / 1000; // tons

    displayResults(annualSavings, annualCO2Savings);
}

function displayResults(savings, co2) {
    const resultsDiv = document.getElementById('calculator-results');
    if (resultsDiv) {
        resultsDiv.innerHTML = `
            <div class="result-box">
                <h4>Your Estimated Annual Savings</h4>
                <div class="big-number">₹${Math.round(savings).toLocaleString()}</div>
                <p>Annual CO₂ Reduction: <strong>${co2.toFixed(1)} Tons</strong></p>
                <p class="note">*Estimates based on 300 sunny days/year and 70% replacement.</p>
            </div>
        `;
        resultsDiv.style.display = 'block';
    } else {
        console.log(`Estimated Savings: ₹${savings}, CO2: ${co2} tons`);
        alert(`Estimated Annual Savings: ₹${Math.round(savings).toLocaleString()}\nAnnual CO2 Reduction: ${co2.toFixed(1)} Tons`);
    }
}
