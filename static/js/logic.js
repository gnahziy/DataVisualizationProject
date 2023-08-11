function createMap(evLayer, cngLayer, bdLayer, e85Layer, hydroLayer, lpgLayer) {

  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create two separate layer groups: one for the city markers and another for the state markers.
  let ev = evLayer;
  let cng = cngLayer;
  let bd = bdLayer;
  let e85 = e85Layer;
  let hydro = hydroLayer;
  let lpg = lpgLayer;


  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": streetmap,
    "Topographic Map": topo
  };

  // Create an overlay object.
  let overlayMaps = {
    "EV Chargers": ev,
    "CNG Chargers": cng,
    "Biodiesel Chargers": bd,
    "Ethanol Chargers": e85,
    "Hydrogen Chargers": hydro,
    "LNG Chargers": lpg

  };

  // Create the map object with options.
  let map = L.map("map-id", {
    center: [41.6032, -72.7],
    zoom: 10,
    layers: [streetmap, cng, bd, e85, hydro, lpg]
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
  let cngMarkers = [];
  let bdMarkers = [];
  let e85Markers = [];
  let hydroMarkers = [];
  let lpgMarkers = [];

  // Define the green icon
  let greenIcon = new L.Icon({
    iconUrl: '/static/Resources/greenIcon.png',  // URL to the green icon
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', // URL to the shadow image
    iconSize: [40, 40], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    shadowSize: [41, 41] // size of the shadow
  });

  // Define the bd icon
  let bdIcon = new L.Icon({
    iconUrl: '/static/Resources/biodieselIcon.png',  // URL to the green icon
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', // URL to the shadow image
    iconSize: [28, 40], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    shadowSize: [41, 41] // size of the shadow
  });

  // Define the cng icon
  let cngIcon = new L.Icon({
    iconUrl: '/static/Resources/cngIcon.png',  // URL to the green icon
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', // URL to the shadow image
    iconSize: [40, 40], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    shadowSize: [41, 41] // size of the shadow
  });

  // Define the ethanol icon
  let e85Icon = new L.Icon({
    iconUrl: '/static/Resources/ethanolIcon.png',  // URL to the green icon
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', // URL to the shadow image
    iconSize: [40, 40], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    shadowSize: [41, 41] // size of the shadow
  });

    // Define the hydro icon
    let hydroIcon = new L.Icon({
      iconUrl: '/static//Resources/hydroIcon.png',  // URL to the green icon
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', // URL to the shadow image
      iconSize: [40, 40], // size of the icon
      iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
      popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
      shadowSize: [41, 41] // size of the shadow
    });

    // Define the LPG icon
    let lpgIcon = new L.Icon({
      iconUrl: '/static/Resources/lpgIcon.png',  // URL to the lpg icon
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', // URL to the shadow image
      iconSize: [40, 40], // size of the icon
      iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
      popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
      shadowSize: [41, 41] // size of the shadow
    });

      // Loop through the stations array.
  for (let index = 0; index < stations.length; index++) {
    let station = stations[index];

    // Check the fuel_type_code for each station
    if (station.fuel_type_code === "ELEC") {  // For electric stations
      // For each station, create a marker and bind a popup with the station's name.
      let evMarker = L.marker([station.latitude, station.longitude], { icon: greenIcon })
        .bindPopup(
          "<h3>" + station.station_name + "</h3>" +
          "<p>" + station.street_address + "</p>" +
          "<p>" + station.city + ", " + station.state + " " + station.zip + "</p>"
        );

      // Add the marker to the evMarkers array.
      evMarkers.push(evMarker);

    } 
    
    else if (station.fuel_type_code === "CNG") {  // For Compressed Natural Gas stations
      // For each station, create a marker and bind a popup with the station's name.
      let cngMarker = L.marker([station.latitude, station.longitude], { icon: cngIcon })  
        .bindPopup(
          "<h3>" + station.station_name + "</h3>" +
          "<p>" + station.street_address + "</p>" +
          "<p>" + station.city + ", " + station.state + " " + station.zip + "</p>"
        );

      // Add the marker to the  array.
      cngMarkers.push(cngMarker);

    }

    else if (station.fuel_type_code === "BD") {  // For Biodiesel stations
      // For each station, create a marker and bind a popup with the station's name.
      let bdMarker = L.marker([station.latitude, station.longitude], { icon: bdIcon })  
        .bindPopup(
          "<h3>" + station.station_name + "</h3>" +
          "<p>" + station.street_address + "</p>" +
          "<p>" + station.city + ", " + station.state + " " + station.zip + "</p>"
        );

      // Add the marker to the  array.
      bdMarkers.push(bdMarker);

    }

    else if (station.fuel_type_code === "E85") {  // For Ethanol stations
      // For each station, create a marker and bind a popup with the station's name.
      let e85Marker = L.marker([station.latitude, station.longitude], { icon: e85Icon })  
        .bindPopup(
          "<h3>" + station.station_name + "</h3>" +
          "<p>" + station.street_address + "</p>" +
          "<p>" + station.city + ", " + station.state + " " + station.zip + "</p>"
        );

      // Add the marker to the array.
      e85Markers.push(e85Marker);

    }

    else if (station.fuel_type_code === "HY") {  // For hydrogen stations
      // For each station, create a marker and bind a popup with the station's name.
      let hydroMarker = L.marker([station.latitude, station.longitude], { icon: hydroIcon })  
        .bindPopup(
          "<h3>" + station.station_name + "</h3>" +
          "<p>" + station.street_address + "</p>" +
          "<p>" + station.city + ", " + station.state + " " + station.zip + "</p>"
        );

      // Add the marker to the array.
      hydroMarkers.push(hydroMarker);

    }

    else if (station.fuel_type_code === "LPG") {  // For LPG stations
      // For each station, create a marker and bind a popup with the station's name.
      let lpgMarker = L.marker([station.latitude, station.longitude], { icon: lpgIcon })  
        .bindPopup(
          "<h3>" + station.station_name + "</h3>" +
          "<p>" + station.street_address + "</p>" +
          "<p>" + station.city + ", " + station.state + " " + station.zip + "</p>"
        );

      // Add the marker to the array.
      lpgMarkers.push(lpgMarker);

    }

  }

  // Create a layer group that's made from the ev markers array, and pass it to the createMap function.
  createMap(L.layerGroup(evMarkers), L.layerGroup(cngMarkers), L.layerGroup(bdMarkers), L.layerGroup(e85Markers), L.layerGroup(hydroMarkers), L.layerGroup(lpgMarkers));
}


// Perform an API call
d3.json(`https://developer.nrel.gov/api/alt-fuel-stations/v1.json?state=CT&limit=200&api_key=${api_key}`)
  .then(createMarkers)
  .catch(error => console.error('Error:', error));