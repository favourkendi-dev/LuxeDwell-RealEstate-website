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
        title: "Azure Penthouse",
        location: "westlands",
        type: "rent",
        price: "$450/night",
        coords: [-1.268, 36.804]
    },
    {
        id: 2,
        title: "The Obsidian Villa",
        location: "karen",
        type: "buy",
        price: "$2.5M",
        coords: [-1.350, 36.720]
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
                    <div class="card-img" style="background-image: url('${p.image || 'villa.jpg'}')"></div>
                    <div style="padding: 20px;">
                        <h4 style="color: #D4AF37;">${p.title}</h4>
                        <p style="color: #fff;">${p.price}</p>
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