// Map definitions
let config = {
	minZoom: 7,
	maxZoom: 18,
};

// tart point os the map
const zoom = 18;
const lat = 39.08940255014147;
const lng = -8.209767767093245;

// setting the map
const map = L.map("map", config).setView([lat, lng], zoom);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

map
	.locate({
		setView: true,
		enableHighAccuracy: true,
	})
	// with the location found create the marker
	.on("locationfound", (e) => {
		console.log(e);
		// marker
		const marker = L.marker([e.latitude, e.longitude]).bindPopup(
			"nou"
		);
		
		// add marker
		map.addLayer(marker);
	})
	// On error do alert
	.on("locationerror", (e) => {
		console.log(e);
		
	});


setInterval(function()
{
	map
		.locate({
			setView: true,
			enableHighAccuracy: true,
		})
		// with the location found create the marker
		.on("locationfound", (e) => {
			console.log(e);
			// marker
			const marker = L.marker([e.latitude, e.longitude]).bindPopup(
				"nou"
			);
			
			// add marker
			map.addLayer(marker);
			document.getElementById("log").innerHTML += "new marker (" + e.latitude + "," + e.longitude + ")<br> ";
			
		})
		// On error do alert
		.on("locationerror", (e) => {
			console.log(e);
		});
}, 60000);