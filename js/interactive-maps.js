/**
 * KVB Green Energies - Interactive Map Logic
 * Displays client locations and project details using Leaflet.js
 */

document.addEventListener('DOMContentLoaded', function () {
    initMap();
});

function initMap() {
    const mapElement = document.getElementById('indiaMap');

    if (!mapElement) return;

    // Initialize map focused on India
    const map = L.map('indiaMap').setView([20.5937, 78.9629], 5);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Sample Client Data
    const clients = [
        { name: "Indian Army", loc: [13.0827, 80.2707], type: "Government", desc: "Solar Steam Cooking" }, // Chennai
        { name: "Sri Siddharodhmath", loc: [15.3647, 75.1240], type: "Religious", desc: "Community Kitchen" }, // Hubli
        { name: "UAS Bengaluru", loc: [12.9716, 77.5946], type: "Education", desc: "Research & Hostel" }, // Bengaluru
        { name: "Sugati Ingredients", loc: [14.2263, 76.6575], type: "Industry", desc: "Food Processing" }, // Challakere
        { name: "INS Mandovi", loc: [15.4909, 73.8278], type: "Defense", desc: "Naval Base" } // Goa
    ];

    // Custom Icon (optional, using default for now or simple circle)
    const clientIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    });

    // Add Markers
    clients.forEach(client => {
        L.marker(client.loc).addTo(map)
            .bindPopup(`
                <div class="map-popup">
                    <strong>${client.name}</strong><br>
                    <span class="badge">${client.type}</span><br>
                    ${client.desc}
                </div>
            `);
    });
}
