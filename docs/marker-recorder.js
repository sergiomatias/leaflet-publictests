var MapRouting = (function ()
{
	var map = null;
	var points = new Array();
	var lineGroup = L.layerGroup();
	var markersGroup = L.layerGroup();
	var mapInterval = null;
	var intervalUpdate = 15000;

	var _MapRouting = {

		init: function(lat, lng, zoomLevel)
		{
			// Map definitions
			let config = {
				minZoom: 7,
				maxZoom: 18,
			};

			map = L.map("map", config).setView([lat, lng], zoomLevel);

			L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}).addTo(map);

			// Set the inicial marker
			map
				.locate({
					setView: true,
					enableHighAccuracy: true,
				})
				// with the location found create the marker
				.on("locationfound", (e) => {
					//console.log(e);
					/*
					// marker
					marker = L.marker([e.latitude, e.longitude]).bindPopup(
						"nou"
					);
					
					// add marker
					map.addLayer(marker);
					*/

					// Clean map layer
					markersGroup.removeFrom(map);
				
					// Add new map layer
					markersGroup = L.layerGroup()
				
					// Add poligns
					markersGroup.addLayer(L.marker([e.latitude, e.longitude]).bindPopup(
						"My position"
					));
					
					markersGroup.addTo(map);

					//// point to list
					//MapRouting.setLog("Starter marker (" + e.latitude + "," + e.longitude + ")<br>");
				})
				// On error do alert
				.on("locationerror", (e) => {
					console.log(e);
				});

			// Update the user position marker
			setInterval(function()
			{
				MapRouting.updateMarker();
			}, 1000);
		}, 

		updateMarker: function() 
		{
			map
				.locate({
					setView: true,
					enableHighAccuracy: true,
				})
				// with the location found create the marker
				.on("locationfound", (e) => {
					//console.log(e);

					// Clean map layer
					markersGroup.removeFrom(map);
				
					// Add new map layer
					markersGroup = L.layerGroup()
				
					// Add poligns
					markersGroup.addLayer(L.marker([e.latitude, e.longitude]).bindPopup(
						"My position"
					));
					
					markersGroup.addTo(map);

					//// Log 
					//MapRouting.setLog("Updated location marker (" + e.latitude + "," + e.longitude + ")<br>");
				})
				// On error do alert
				.on("locationerror", (e) => {
					console.log(e);
				});
		},

		start: function()
		{
			MapRouting.addPoint();

			document.getElementById("start").setAttribute('data-run','1');
			MapRouting.setLog("Started<br>");
  
			mapInterval = setInterval(function()
			{
				MapRouting.addPoint();
			}, intervalUpdate);

			document.getElementById("start").style.display = "none";
			document.getElementById("stop").style.display = "block";
		},

		stop: function() 
		{
			MapRouting.addPoint();
			clearInterval(mapInterval);

			document.getElementById("start").removeAttribute('data-run');
			MapRouting.setLog("Stopped<br>");
			
			document.getElementById("start").style.display = "block";
			document.getElementById("stop").style.display = "none";
		},

		addPoint: function  ()
		{
			if (document.getElementById("start").hasAttribute("data-run")) 
			{
				map
				.locate({
					setView: true,
					enableHighAccuracy: true,
				})
				// with the location found create the marker
				.on("locationfound", (e) => {
					//console.log(e);
					
					// point to list
					points.push([e.latitude, e.longitude]);
					MapRouting.showRoute();

					MapRouting.setLog("New point (" + e.latitude + "," + e.longitude + ")<br> ");
				})
				// On error do alert
				.on("locationerror", (e) => {
					console.log(e);
				});
			}
			else 
			{
				clearInterval(mapInterval);
			}
		},
		
		showRoute: function () 
		{	
			// Clean map layer
			lineGroup.removeFrom(map);
		
			// Add new map layer
			lineGroup = L.layerGroup()
		
			// Add poligns
			lineGroup.addLayer(L.polyline(points, {
				color: "blue",
				opacity: 0.5,
				weight: 20,
			}));
			
			lineGroup.addTo(map);
		},


		setLog: function (log) 
		{
			document.getElementById("log").innerHTML += log;
		}
	};

	return _MapRouting;

})();


// tart point os the map
const zoom = 18;
const lat = 39.08940255014147;
const lng = -8.209767767093245;

MapRouting.init(lat, lng, zoom);
