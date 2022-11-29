/**
 * Implementation of leaflet to record a track run
 */
var MapRouting = (function ()
{
	var map = null;
	var points = new Array();
	var lineGroup = L.layerGroup();
	var markersGroup = L.layerGroup();
	var mapInterval = null;
	var trackIntervalUpdate = 30000;
	var userPositionIntervalUpdate = 5000;

	var _MapRouting = {

		/**
		 * Inicialize the map
		 * @param {*} lat 			Starting latitude
		 * @param {*} lng 			Starting longitude
		 * @param {*} zoomLevel 	Starting zoom level 
		 */
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
				// With the location found create the marker
				.on("locationfound", (e) => {

					// Clean map layer
					markersGroup.removeFrom(map);
				
					// Add new map layer
					markersGroup = L.layerGroup()
				
					// Add marker
					markersGroup.addLayer(L.marker([e.latitude, e.longitude]).bindPopup(
						"My position"
					));
					
					markersGroup.addTo(map);
				})
				// On error do alert
				.on("locationerror", (e) => {
					console.log(e);
				});

			// Update the user position marker
			setInterval(function()
			{
				MapRouting.updateMarker();
			}, userPositionIntervalUpdate);
		}, 

		/**
		 * Update the user position marker
		 */
		updateMarker: function() 
		{
			map
				.locate({
					setView: true,
					enableHighAccuracy: true,
				})
				// With the location found create the marker
				.on("locationfound", (e) => {

					// Clean map layer
					markersGroup.removeFrom(map);
				
					// Add new map layer
					markersGroup = L.layerGroup()
				
					// Add marker
					markersGroup.addLayer(L.marker([e.latitude, e.longitude]).bindPopup(
						"My position"
					));
					
					markersGroup.addTo(map);
				})
				// On error do alert
				.on("locationerror", (e) => {
					console.log(e);
				});
		},

		/**
		 * Start the track recording
		 */
		start: function()
		{
			document.getElementById("start").setAttribute('data-run','1');
			MapRouting.setLog("Started<br>");
  
			MapRouting.addPoint();

			mapInterval = setInterval(function()
			{
				MapRouting.addPoint();
			}, trackIntervalUpdate);

			document.getElementById("start").style.display = "none";
			document.getElementById("stop").style.display = "inline-block";
		},

		/**
		 * Stop the track recording
		 */
		stop: function() 
		{
			MapRouting.addPoint();
			clearInterval(mapInterval);

			document.getElementById("start").removeAttribute('data-run');
			MapRouting.setLog("Stopped<br>");
			
			document.getElementById("start").style.display = "inline-block";
			document.getElementById("stop").style.display = "none";
		},

		/**
		 * Add point the track, allowing the polygon creation
		 */
		addPoint: function  ()
		{
			if (document.getElementById("start").hasAttribute("data-run")) 
			{
				map
				.locate({
					setView: true,
					enableHighAccuracy: true,
				})
				// With the location found create a new position point
				.on("locationfound", (e) => {
					
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
		
		/**
		 * Recreate the route polygon
		 */
		showRoute: function () 
		{	
			// Clean map layer
			lineGroup.removeFrom(map);
		
			// Add new map layer
			lineGroup = L.layerGroup()
		
			// Add polygon
			lineGroup.addLayer(L.polyline(points, {
				color: "blue",
				opacity: 0.5,
				weight: 20,
			}));
			
			lineGroup.addTo(map);
		},

		/**
		 * Log to be shown in page
		 * @param {string} log 
		 */
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
