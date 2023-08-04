function createMap(evChargers) {

  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Create a baseMaps object to hold the streetmap layer.
  let baseMaps = {
    "Street Map": streetmap
  };

  // Create an overlayMaps object to hold the evChargers layer.
  let overlayMaps = {
    "EV Chargers": evChargers
  };

  // Create the map object with options.
  let map = L.map("map-id", {
    center: [39.83, -98.58],
    zoom: 5,
    layers: [streetmap, evChargers]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

  // Pull the "stations" property from response.data.
  let stations = response.fuel_stations;

  // Initialize an array to hold ev markers.
  let evMarkers = [];

  // Define the green icon
  let greenIcon = new L.Icon({
    iconUrl: 'Resources/greenIcon.png',  // URL to the green icon
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', // URL to the shadow image
    iconSize: [40, 40], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    shadowSize: [41, 41] // size of the shadow
  });

  // Loop through the stations array.
  for (let index = 0; index < stations.length; index++) {
    let station = stations[index];

    // For each station, create a marker, and bind a popup with the station's name.
    let evMarker = L.marker([station.latitude, station.longitude], { icon: greenIcon })
    .bindPopup(
      "<h3>" + station.station_name + "</h3>" +
      "<p>" + station.street_address + "</p>" +
      "<p>" + station.city + ", " + station.state + " " + station.zip + "</p>"
    );

    // Add the marker to the evMarkers array.
    evMarkers.push(evMarker);
  }

  // Create a layer group that's made from the ev markers array, and pass it to the createMap function.
  createMap(L.layerGroup(evMarkers));
}


// Perform an API call
d3.json(`https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=${API_KEY}&fuel_type=E85,ELEC&limit=200`)
  .then(createMarkers)
  .catch(error => console.error('Error:', error));
