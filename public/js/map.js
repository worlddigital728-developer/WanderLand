
const latLng = [coordinates[1], coordinates[0]];
const map = L.map('map').setView(latLng, 15) //52.517,3.3881   [30.1814,71.4922 ]

  L.maplibreGL({
    style: 'https://tiles.openfreemap.org/styles/liberty',
  }).addTo(map)

  console.log(coordinates);
L.marker(latLng).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
   // .openPopup();

    var circle = L.circle(latLng, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 200
}).addTo(map);

//
var myIcon = L.icon({
    iconUrl: 'my-icon.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

 // for showing coordinate latitude and longitude on the map  
// var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// }

// map.on('click', onMapClick);