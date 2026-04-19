// weather function
if (typeof document !== 'undefined') {

    async function getNairobiWeather() {
        const display = document.getElementById('nairobi-temp');
        if (!display) return; 

        try {
            const url = "https://api.open-meteo.com/v1/forecast?latitude=-1.28&longitude=36.82&current_weather=true";
            const response = await fetch(url);
            const data = await response.json();
            const temp = Math.round(data.current_weather.temperature);
            
            display.innerHTML = `${temp}`;
        } catch (error) {
            display.innerHTML = "Nairobi: 24°C";
        }
    }

    // event listener
    document.addEventListener('DOMContentLoaded', getNairobiWeather);
}

// Global map 
let map = null;

// Properties data (array)
const properties = [
    {
        id: 1,
        title: "Runda Estate",
        location: "Runda",
        type: "rent",
        price: "$450/night",
        description: "Luxury living in Runda Estate.",
        image: "images/img1.jpeg",
        coords: [-1.268, 36.804]
    },
    {
        id: 2,
        title: "Karen Estate",
        location: "Karen",
        type: "buy",
        price: "$2.5M",
        description: "Luxury living in Karen City.",
        image: "images/img18.jpeg",
        coords: [-1.350, 36.720]
    },
    {
        id: 3,
        title: "Muthaiga Estate",
        location: "Muthaiga",
        type: "buy",
        price: "$2.5M",
        description: "Luxury living in Muthaiga.",
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
        price: "Ksh 2.5M",
        description: "Modern villa with garden views.",
        coords: [-1.350, 36.720],
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
        contact: "254743546456"
    },

    {
        id: 6,
        title: "Parklands",
        location: "parklands",
        type: "buy",
        description: "Luxury living in Parklands.",
        price: "Ksh2.5M",
        image: "images/img27.jpeg",
        coords: [-1.350, 36.720]
    },
    {
        id: 7,
        title: "Ngong Road",
        location: "Ngong",
        type: "rent",
        price: "Ksh45,000/night",
        description: "Luxury living in Ngong Road.",
        coords: [-1.268, 36.804],
        image: "images/img12.jpeg",
        contact: "254743546456"
    },
    {
        id: 8,
        title: "Kilimani",
        location: "kilimani",
        type: "buy",
        price: "Ksh 250 000",
        description: "Modern villa with garden views.",
        coords: [-1.350, 36.720],
        image: "images/img13.jpeg",
        contact: "254743546456"
    },

    {
        id: 9,
        title: "Kenyatta",
        location: "Kenyatta Market",
        type: "buy",
        description: "Modern villa with garden views.",
        price: "ksh 250 000",
        image: "images/img28.jpeg",
        coords: [-1.350, 36.720]
    },
    {
        id: 10,
        title: "Thika",
        location: "Thika Road",
        type: "rent",
        price: "ksh 450 000/night",
        description: "Luxury living in Westlands.",
        coords: [-1.268, 36.804],
        image: "images/img6.jpeg",
        contact: "254743546456"
    },
    {
        id: 11,
        title: "Mombasa Estate",
        location: "Mombasa Road",
        type: "buy",
        price: "Ksh 1 000 000",
        description: "Modern villa with garden views.",
        coords: [-1.350, 36.720],
        image: "images/img7.jpeg",
        contact: "254743546456"
    }
];

// Filter function
function filterProperties(list, term) {
    if (!term) return list;
    const query = term.toLowerCase().trim();
    return list.filter(p =>
        p.location && p.location.toLowerCase().includes(query)
    );
}



if (typeof document !== 'undefined') {

    document.addEventListener("DOMContentLoaded", function () {

        // map 
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
            muthaiga: document.getElementById("muthaiga"),
            ngong: document.getElementById("Ngong"),
            thika: document.getElementById("Thika"),
            kilimani: document.getElementById("kilimani"),
            westlands: document.getElementById("westlands"),
            mombasa: document.getElementById("mombasa"),
            kenyatta: document.getElementById("kenyatta"),
            parklands: document.getElementById("parklands"),
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

            // Loop through results and create cards
            results.forEach(property => {
                const card = document.createElement('div');
                card.className = 'property-card';
                card.innerHTML = `
                    <img src="${property.image}" alt="${property.title}">
                    <h3>${property.title}</h3>
                    <p>${property.location} | ${property.price}</p>
                    <button class="view-details-btn">View Details</button>
                `;
                
                // When they click the button, open the modal!
                card.querySelector('.view-details-btn').onclick = () => openModal(property);
                
                grid.appendChild(card);
            });

            if (!scrolledToArea) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
            // rest of your map code

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

function openModal(property) {
    document.getElementById("property-modal").style.display = "flex";

    document.getElementById("modal-image").src = property.image;
    document.getElementById("modal-title").innerText = property.title;
    document.getElementById("modal-location").innerText = property.location;
    document.getElementById("modal-price").innerText = property.price;
    document.getElementById("modal-description").innerText = property.description || "No description available.";

    const myNumber = "0743769189";
    document.getElementById("modal-whatsapp").href =
        `https://wa.me/${myNumber}?text=Hi, I am interested in ${property.title} at LuxeDwell`;

    document.getElementById("modal-map-btn").onclick = function () {
    // 1. Zoom the OpenStreetMap to the property coordinates
    zoomToProperty(property.coords[0], property.coords[1], property.title);

    // 2. Find the map using your specific ID
    const mapSection = document.getElementById('osm-map'); 

    if (mapSection) {
        // 3. Smoothly scroll to the map
        mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // 4. Close the modal so the user can actually see the map
    if (typeof closeModal === 'function') {
        closeModal();
    }
};
}

function closeModal() {
    document.getElementById("property-modal").style.display = "none";
}



if (typeof module !== 'undefined') {
    module.exports = {
        properties,
        filterProperties
    };
}