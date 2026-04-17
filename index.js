// 1. Declare the map variable at the VERY TOP (Global Scope)
let map;

document.addEventListener("DOMContentLoaded", function () {

    // 2. Initialize the map
    map = L.map('osm-map').setView([-1.264, 36.804], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    L.marker([-1.264, 36.804]).addTo(map)
        .bindPopup('LuxeDwell HQ');

    // Search button event
    const searchBtn = document.querySelector('.luxe-go-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', executeLuxeSearch);
    }
});

const properties = [
    {
        id: 1,
        title: "Runda Estate",
        location: "Runda",
        type: "rent",
        price: "$450/night",
        image: "images/img1.jpeg",
        coords: [-1.268, 36.804]
    },
    {
        id: 3,
        title: "Karen EState",
        location: "karen",
        type: "buy",
        price: "$2.5M",
        image: "images/img18.jpeg",
        coords: [-1.350, 36.720]
    },

    {
        id: 4,
        title: "Muthaiga Estate",
        location: "Muthaiga",
        type: "buy",
        price: "$2.5M",
        image: "images/img8.jpeg",
        coords: [-1.350, 36.720]
    },

    {
        id: 1,
        title: "Uthiru Estate",
        location: "Uthiru",
        type: "rent",
        price: "$450/night",
        description: "Experience luxury living in the heart of Westlands. This penthouse features floor-to-ceiling windows and a private rooftop terrace.",
        coords: [-1.268, 36.804],
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        contact: "254 743 546 456" // WhatsApp number
    },
    {
        id: 2,
        title: "Ngumo Estate",
        location: "Mbagathi",
        type: "buy",
        price: "$2.5M",
        description: "A secluded sanctuary in Karen. This modern villa offers 5 bedrooms, an infinity pool, and lush garden views.",
        coords: [-1.350, 36.720],
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
        contact: "254 743 546 456"
    }

];


function executeLuxeSearch() {
    const term = document.getElementById('unified-search').value.toLowerCase().trim();
    const grid = document.getElementById('listings-grid');
    const errorDiv = document.getElementById('no-results');
    const section = document.getElementById('listings-section');
    

    // Area scroll mapping
    const areaMap = {
        runda: document.getElementById("runda"),
        karen: document.getElementById("karen"),
        muthaiga: document.getElementById("muthaiga")
    };

    let scrolledToArea = false;

    if (areaMap[term]) {
        areaMap[term].scrollIntoView({ behavior: "smooth" });
        scrolledToArea = true;
    }

    // Filter properties
    let results = properties.filter(p =>
        p.location && p.location.toLowerCase().includes(term)
    );

    // Reset UI
    grid.innerHTML = "";

    if (results.length > 0) {
        errorDiv.style.display = "none";
        grid.style.display = "grid";

        results.forEach(p => {
            grid.innerHTML += `
                <div class="property-card">
                    <div class="card-img" style="background-image: url('${p.image || 'villa.jpg'}')">
                        <span class="luxe-type-tag">${p.type === 'rent' ? 'Airbnb' : 'For Sale'}</span>
                    </div>

                    <div style="padding: 20px;">
                        <h4 style="color: #D4AF37; margin-bottom: 5px;">${p.title}</h4>
                        <p style="color: #fff; font-weight: bold; font-size: 1.1rem;">${p.price}</p>
                        
                        <p style="color: #ccc; font-size: 0.9rem; margin: 10px 0;">${p.description || 'Luxury residence in a prime location.'}</p>

                        <div class="card-actions" style="display: flex; gap: 10px; margin-top: 15px;">
                            <button class="view-map-btn" 
                                onclick="zoomToProperty(${p.coords[0]}, ${p.coords[1]}, '${p.title}')"
                                style="flex: 1; background: transparent; border: 1px solid #D4AF37; color: #D4AF37; padding: 8px; cursor: pointer;">
                                <i class="fas fa-map-marker-alt"></i> Map
                            </button>
                            
                            <a href="https://wa.me/254700000000?text=I'm interested in ${p.title}" 
                               class="inquire-btn"
                               style="flex: 1; background: #D4AF37; color: #111; text-align: center; text-decoration: none; padding: 8px; font-weight: bold;">
                                Inquire
                            </a>
                        </div>
                    </div>
                </div>`;
        });

        if (!scrolledToArea) {
            section.scrollIntoView({ behavior: 'smooth' });
        }

        if (map && results.length > 0 && results[0].coords) {
            map.flyTo(results[0].coords, 14);
        }

    } else {
        grid.style.display = "none";
        errorDiv.style.display = "block";
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function zoomToProperty(lat, lng, title) {
    // Moves the map
    map.flyTo([lat, lng], 16);
    
    // Opens a popup at that location
    L.popup()
        .setLatLng([lat, lng])
        .setContent(`<b style="color:#D4AF37">${title}</b>`)
        .openOn(map);

    // Scrolls the user back up to the map
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// Suggestions
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('unified-search');
    const suggestionsBox = document.getElementById('search-suggestions');

    if (searchInput && suggestionsBox) {
        searchInput.addEventListener('input', () => {
            const val = searchInput.value.toLowerCase();
            suggestionsBox.innerHTML = '';

            if (val.length > 0) {
                const filtered = properties.filter(p =>
                    p.location.toLowerCase().includes(val)
                );

                filtered.forEach(p => {
                    const div = document.createElement('div');
                    div.className = "suggestion-item";
                    div.innerHTML = `<i class="fas fa-search gold-icon"></i> ${p.location}`;

                    div.onclick = () => {
                        searchInput.value = p.location;
                        suggestionsBox.innerHTML = '';
                        executeLuxeSearch();
                    };

                    suggestionsBox.appendChild(div);
                });
            }
        });
    }
});