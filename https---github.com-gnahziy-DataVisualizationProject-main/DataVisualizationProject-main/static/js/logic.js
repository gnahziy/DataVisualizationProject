function createMap(evChargers) {
  const streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  const baseMaps = {
    "Street Map": streetmap
  };

  const overlayMaps = {
    "EV Chargers": evChargers
  };

  const map = L.map("map-id", {
    center: [39.83, -98.58], // Set your desired map center coordinates here
    zoom: 5,
    layers: [streetmap, evChargers]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {
  const stations = response.fuel_stations;

  const evMarkers = [];

  for (const station of stations) {
    const iconUrl = getIconUrl(station.fuel_type_code); // Get icon URL based on fuel type

    const greenIcon = new L.Icon({
      iconUrl: iconUrl,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [40, 40],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const evMarker = L.marker([station.latitude, station.longitude], { icon: greenIcon })
      .bindPopup(
        `<h3>${station.station_name}</h3>
         <p>${station.street_address}</p>
         <p>${station.city}, ${station.state} ${station.zip}</p>`
      );

    evMarkers.push(evMarker);
  }

  createMap(L.layerGroup(evMarkers));
}

function getIconUrl(fuelType) {
  // Define your own logic to map fuel types to icon URLs
  // Example: return a different icon URL for each fuel type
  if (fuelType === 'ELEC') {
    return 'path/to/electric-icon.png';
  } else if (fuelType === 'LPG') {
    return 'path/to/lpg-icon.png';
  } else {
    return 'default-icon.png'; // Default icon for unknown types
  }
}

const API_KEY = '9c2fzH91vcapYPftNdj7Grcr2gpWGERo1r0bsuuw';

d3.json(`https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=${API_KEY}&fuel_type=E85,ELEC,LPG&limit=100`)
  .then(createMarkers)
  .catch(error => console.error('Error:', error));
