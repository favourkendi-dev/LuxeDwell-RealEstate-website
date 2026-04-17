window.onload = function() {
    // Map setup
    var map = L.map('osm-map').setView([-1.264, 36.804], 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Custom Gold Marker
    var goldIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    L.marker([-1.264, 36.804], {icon: goldIcon}).addTo(map)
        .bindPopup('<b>LuxeDwell HQ</b><br>Westlands, Nairobi')
        .openPopup();
};

function executeSearch() {
    const type = document.getElementById('typeFilter').value;
    
    // Clear old markers
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    // Filter and add new markers
    properties.filter(p => type === 'all' || p.type === type).forEach(p => {
        const marker = L.marker(p.coords, {icon: goldIcon}).addTo(map);
        marker.bindPopup(`<b>${p.name}</b><br>${p.price}`);
    });

    // Smoothly fly to the first result
    if (properties.length > 0) {
        map.flyTo(properties[0].coords, 13);
    }
}