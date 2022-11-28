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

var lineGroup = L.layerGroup()
var markerGroup = L.layerGroup()

UpdateMarker();


var points = new Array();

function Start(lineGroup, markerGroup)
{
	AddPoint();
	document.getElementById("start").setAttribute('data-run','1');
	document.getElementById("log").innerHTML += "Started<br> ";

	setInterval(function()
	{
		AddPoint(lineGroup);
		UpdateMarker(markerGroup);
	}, 30000);

	document.getElementById("start").style.display = "none";
	document.getElementById("stop").style.display = "block";
}

function Stop(lineGroup, markerGroup) 
{
	clearInterval();
	AddPoint(lineGroup);
	UpdateMarker(markerGroup);

	document.getElementById("start").removeAttribute('data-run');
	document.getElementById("log").innerHTML += "Stopped<br> ";

	document.getElementById("start").style.display = "block";
	document.getElementById("stop").style.display = "none";
}

function UpdateMarker(markerGroup) 
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
		
		markerGroup.removeFrom(map);

		// add marker
		markerGroup.addLayer(marker);
		markerGroup.addTo(map);
	})
	// On error do alert
	.on("locationerror", (e) => {
		console.log(e);
		
	});
}

function AddPoint (lineGroup)
{
	if (document.getElementById("start").hasAttribute("data-run")) {
		map
		.locate({
			setView: true,
			enableHighAccuracy: true,
		})
		// with the location found create the marker
		.on("locationfound", (e) => {
			console.log(e);

			/*
			// marker
			const marker = L.marker([e.latitude, e.longitude]).bindPopup(
				"nou"
			);
			
			// add marker
			map.addLayer(marker);
			*/
			
			// point to list
			points.push([e.latitude, e.longitude ])
			document.getElementById("log").innerHTML += "new marker (" + e.latitude + "," + e.longitude + ")<br> ";
		})
		// On error do alert
		.on("locationerror", (e) => {
			console.log(e);
		});
	}
}

function showRoute () 
{	
	// Clean map layer
	lineGroup.removeFrom(map);

	// Add new map layer
	lineGroup = L.layerGroup()

	// Add poligns
	lineGroup.addLayer(L.polyline(points, {
		color: "red",
		opacity: 0.5,
		weight: 20,
	  }));
	
	lineGroup.addTo(map);
}


/*

// define array of points to use for line
const points = [
	[52.2308124251888, 21.011003851890568],
	[52.2302604393307, 21.01121842861176],
	[52.2297445891999, 21.011282801628116],
	[52.22953759032849, 21.011492013931278],
	[52.22954416173605, 21.01194798946381],
	[52.22967558968336, 21.012285947799686],
	[52.2300008721797, 21.012935042381287],
	[52.230306438414374, 21.014378070831302],
  ];
  
  // add polyline to map
  L.polyline(points, {
	color: "red",
	opacity: 0.5,
	weight: 20,
  })
	.bindPopup("polygon")
	.addTo(map);

*/