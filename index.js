async function getNairobiWeather() {
    try {
        // This URL asks for Nairobi's coordinates (-1.28, 36.82)
        const url = "https://api.open-meteo.com/v1/forecast?latitude=-1.28&longitude=36.82&current_weather=true";
        const response = await fetch(url);
        const data = await response.json();
        
        return data.current_weather.temperature;
    } catch (error) {
        console.log("Weather failed to load");
    }
}
// Global map (safe)
let map = null;

// Properties data (clean + unique IDs)
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
        id: 2,
        title: "Karen Estate",
        location: "Karen",
        type: "buy",
        price: "$2.5M",
        image: "images/img18.jpeg",
        coords: [-1.350, 36.720]
    },
    {
        id: 3,
        title: "Muthaiga Estate",
        location: "Muthaiga",
        type: "buy",
        price: "$2.5M",
        image: "images/img8.jpeg",
        coords: [-1.350, 36.720]
    },
    {
        id: 4,
        title: "Uthiru Estate",
        location: "Uthiru",
        type: "rent",
        price: "$450/night",
        description: "Luxury living in Westlands.",
        coords: [-1.268, 36.804],
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
        contact: "254743546456"
    },
    {
        id: 5,
        title: "Ngumo Estate",
        location: "Mbagathi",
        type: "buy",
        price: "$2.5M",
        description: "Modern villa with garden views.",
        coords: [-1.350, 36.720],
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
        contact: "254743546456"
    }
];

// Filter function (reusable + testable)
function filterProperties(list, term) {
    if (!term) return list;
    const query = term.toLowerCase().trim();
    return list.filter(p =>
        p.location && p.location.toLowerCase().includes(query)
    );
}



if (typeof document !== 'undefined') {

    document.addEventListener("DOMContentLoaded", function () {

        // Initialize map ONLY ONCE
        if (!map) {
            map = L.map('osm-map').setView([-1.264, 36.804], 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap'
            }).addTo(map);

            L.marker([-1.264, 36.804]).addTo(map)
                .bindPopup('LuxeDwell HQ');

                getNairobiWeather().then(temp => {
                    const display = document.getElementById('temp-display');
                    if (display && temp) {
                        display.innerText = temp;
        }
    });
        }

        // Elements
        const searchBtn = document.querySelector('.luxe-go-btn');
        const searchInput = document.getElementById('unified-search');
        const suggestionsBox = document.getElementById('search-suggestions');

        // Search button
        if (searchBtn) {
            searchBtn.addEventListener('click', executeLuxeSearch);
        }

        // Suggestions
        if (searchInput && suggestionsBox) {
            searchInput.addEventListener('input', () => {
                const val = searchInput.value.toLowerCase();
                suggestionsBox.innerHTML = '';

                if (val.length > 0) {
                    const filtered = filterProperties(properties, val);

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

    // Search function
    function executeLuxeSearch() {
        const term = document.getElementById('unified-search').value.toLowerCase().trim();
        const grid = document.getElementById('listings-grid');
        const errorDiv = document.getElementById('no-results');
        const section = document.getElementById('listings-section');

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

        const results = filterProperties(properties, term);

        grid.innerHTML = "";

        if (results.length > 0) {
            errorDiv.style.display = "none";
            grid.style.display = "grid";

            if (!scrolledToArea) {
                section.scrollIntoView({ behavior: 'smooth' });
            }

            if (map && results[0].coords) {
                map.flyTo(results[0].coords, 14);
            }

        } else {
            grid.style.display = "none";
            errorDiv.style.display = "block";
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Zoom function
    function zoomToProperty(lat, lng, title) {
        if (!map) return;

        map.flyTo([lat, lng], 16);

        L.popup()
            .setLatLng([lat, lng])
            .setContent(`<b style="color:#D4AF37">${title}</b>`)
            .openOn(map);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}



if (typeof module !== 'undefined') {
    module.exports = {
        properties,
        filterProperties
    };
}