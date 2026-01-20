// Initialize Map
const map = L.map('map', {
    zoomControl: false // We will add it manually or just use default
});
L.control.zoom({ position: 'bottomright' }).addTo(map);

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 });
const sat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 });
osm.addTo(map);

// Default Location (Yogyakarta)
let currentCenter = [-7.75, 110.38];

// Check saved location
const savedLocName = localStorage.getItem('smartagri_location');
if (savedLocName) {
    // Try to geocode the saved name if possible, or just default.
    // Since we don't have a backend to geocode on load easily without async, 
    // we'll just trigger a search if it exists after map load.
    setTimeout(() => {
        document.getElementById('location-search').value = savedLocName;
        document.getElementById('btn-search').click();
    }, 1000);
}

map.setView(currentCenter, 13);

// Layers
const ndviLayer = L.layerGroup().addTo(map);
const moistureLayer = L.layerGroup().addTo(map);
const tempLayer = L.layerGroup().addTo(map);
const pestLayer = L.layerGroup().addTo(map);

// Controls
const baseLayers = { "Peta Jalan": osm, "Satelit": sat };
const overlays = {
  "NDVI (Kesehatan)": ndviLayer,
  "Kelembaban Tanah": moistureLayer,
  "Suhu Lahan": tempLayer,
  "Hama & Penyakit": pestLayer
};
L.control.layers(baseLayers, overlays, { collapsed: false, position: 'topright' }).addTo(map);

// Helpers
function seedRandom(seed) {
  let x = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
  return function() {
    x ^= x >>> 15;
    x = Math.imul(x, 0x2c1b3c6d) ^ Math.imul(x ^ (x >>> 7), 0x297a2d39);
    return ((x >>> 0) % 1000000) / 1000000;
  };
}

function smoothValue(lat, lng, rand) {
  const r = rand();
  const a = Math.sin(lat * 100) * 0.5 + Math.cos(lng * 100) * 0.5; // Increased frequency for local variation
  const b = Math.sin(lat * 50 + lng * 50) * 0.5 + 0.5;
  return (a * 0.6 + b * 0.4) * 0.7 + r * 0.3;
}

// Color Scales
function ndviColor(v) {
    // Red (bad) to Green (good)
    return v < 0.2 ? '#d73027' : v < 0.4 ? '#fc8d59' : v < 0.6 ? '#fee08b' : v < 0.8 ? '#d9ef8b' : '#1a9850';
}
function moistureColor(v) {
    // Light blue to dark blue
    return v < 0.3 ? '#eff3ff' : v < 0.5 ? '#bdd7e7' : v < 0.7 ? '#6baed6' : '#2171b5';
}
function tempColor(v) {
    // Blue (cold) to Red (hot)
    return v < 20 ? '#4575b4' : v < 25 ? '#e0f3f8' : v < 30 ? '#fdae61' : '#d73027';
}

// Data Generation
function generateDataForBounds(bounds) {
    // Clear existing layers
    ndviLayer.clearLayers();
    moistureLayer.clearLayers();
    tempLayer.clearLayers();
    pestLayer.clearLayers();

    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    
    // Create a grid of 20x20 cells covering the view
    const rows = 20;
    const cols = 20;
    const latStep = (ne.lat - sw.lat) / rows;
    const lngStep = (ne.lng - sw.lng) / cols;
    
    const rand = seedRandom(Math.abs(sw.lat + sw.lng));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const lat1 = sw.lat + r * latStep;
            const lat2 = lat1 + latStep;
            const lng1 = sw.lng + c * lngStep;
            const lng2 = lng1 + lngStep;
            
            const cellBounds = [[lat1, lng1], [lat2, lng2]];
            const centerLat = (lat1 + lat2) / 2;
            const centerLng = (lng1 + lng2) / 2;

            // Generate values based on location
            const base = smoothValue(centerLat, centerLng, rand);
            
            const ndvi = 0.2 + base * 0.8; // 0.2 to 1.0
            const moisture = 0.3 + base * 0.7; // 0.3 to 1.0
            const temp = 22 + base * 10; // 22 to 32

            // Add NDVI Rect
            L.rectangle(cellBounds, { 
                color: 'transparent', 
                fillColor: ndviColor(ndvi), 
                fillOpacity: 0.5 
            }).bindPopup(`NDVI: ${ndvi.toFixed(2)}`).addTo(ndviLayer);

            // Add Moisture Rect
            L.rectangle(cellBounds, { 
                color: 'transparent', 
                fillColor: moistureColor(moisture), 
                fillOpacity: 0.5 
            }).bindPopup(`Kelembaban: ${(moisture*100).toFixed(0)}%`).addTo(moistureLayer);

            // Add Temp Rect
            L.rectangle(cellBounds, { 
                color: 'transparent', 
                fillColor: tempColor(temp), 
                fillOpacity: 0.5 
            }).bindPopup(`Suhu: ${temp.toFixed(1)}°C`).addTo(tempLayer);
        }
    }

    // Generate Pests (Randomly scattered)
    const pestCount = 5 + Math.floor(rand() * 10);
    for(let i=0; i<pestCount; i++) {
        const plat = sw.lat + rand() * (ne.lat - sw.lat);
        const plng = sw.lng + rand() * (ne.lng - sw.lng);
        const severity = Math.random() > 0.7 ? 'Tinggi' : 'Sedang';
        const color = severity === 'Tinggi' ? '#d73027' : '#fdae61';
        
        L.circleMarker([plat, plng], {
            radius: 8,
            color: '#fff',
            weight: 1,
            fillColor: color,
            fillOpacity: 0.9
        }).bindPopup(`<b>Serangan Hama</b><br>Tingkat: ${severity}`).addTo(pestLayer);
    }
}

// Initial Generation
generateDataForBounds(map.getBounds());

// Re-generate when map moves
map.on('moveend', () => {
    generateDataForBounds(map.getBounds());
});

// Search Logic
document.getElementById('btn-search').addEventListener('click', async () => {
    const query = document.getElementById('location-search').value;
    if (!query) return;

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            map.flyTo([lat, lon], 14);
        } else {
            alert('Lokasi tidak ditemukan');
        }
    } catch (e) {
        console.error(e);
        alert('Gagal mencari lokasi');
    }
});

// GPS Logic
document.getElementById('btn-gps').addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            map.flyTo([latitude, longitude], 15);
        }, () => {
            alert('Tidak dapat mengakses lokasi Anda');
        });
    } else {
        alert('Geolocation tidak didukung browser ini');
    }
});
