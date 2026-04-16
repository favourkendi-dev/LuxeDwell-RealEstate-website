document.addEventListener("DOMContentLoaded", function () {
    // 1. Set the view to Nairobi
    var map = L.map('osm-map').setView([-1.264, 36.804], 15);

    // 2. Load the image tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // 3. Add the marker
    L.marker([-1.264, 36.804]).addTo(map)
        .bindPopup('LuxeDwell HQ')
        .openPopup();
});