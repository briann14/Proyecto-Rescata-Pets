mapboxgl.accessToken = 'pk.eyJ1IjoibWp2YWxlbnp1ZWxhIiwiYSI6ImNrb2Fmdm9zZDBpM28ybnFtYTQ2Z2MwMnYifQ.ZY3jTw0-6tjUSOOJXJHsdw'


var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-58.4370894,-34.6075682],
	zoom: 12
});

document
.getElementById('listing-group')
.addEventListener('change', function(e)
{
var handler = e.target.id;
if(e.target.checked){
	map[handler].enable();
} else {
	map[handler].disable();
}
});

var customData = {
	'features': [
	{
		'type': 'Feature',
		'properties': {
			'title': 'Farmacia 24Hs Palermo'
		},
	'geometry': {
		'coordinates': [-34.588251, -58.4112129],
		'type': 'Point'
		}
	},
	{
		'type': 'Feature',
		'properties': {
			'title': 'Parque del Café'
		},
	'geometry': {
		'coordinates': [-75.77064810284882,4.540568666186622],
		'type': 'Point'
		}
	},
	{
		'type': 'Feature',
		'properties': {
			'title': 'Parque Arqueologico San Agustin'
		},
	'geometry': {
		'coordinates': [-76.29526180284667,1.8879367358700043],
		'type': 'Point'
		}
	}
	],
	'type': 'FeatureCollection'
};
 
function forwardGeocoder(query) {
	var matchingFeatures = [];
	for (var i = 0; i < customData.features.length; i++) {
		var feature = customData.features[i];
		// Handle queries with different capitalization
		// than the source data by calling toLowerCase().
		if (
			feature.properties.title
				.toLowerCase()
				.search(query.toLowerCase()) !== -1
		) {
			// Add a tree emoji as a prefix for custom
			// data results using carmen geojson format:
			// https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
			feature['place_name'] = '🌲 ' + feature.properties.title;
			feature['center'] = feature.geometry.coordinates;
			feature['place_type'] = ['park'];
			matchingFeatures.push(feature);
			}
	}
	return matchingFeatures;
}
 
// Add the control to the map.

map.addControl(
	new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		localGeocoder: forwardGeocoder,
		zoom: 14,
		placeholder: 'Buscar Veterinaria',
		mapboxgl: mapboxgl
	})
);
map.on("load", () => {
  
	const layers = map.getStyle().layers;
	const labelLayerId = layers.find(
	  (layer) => layer.type === "symbol" && layer.layout["text-field"]
	).id;
	
	map.addLayer(
	  {
		id: "add-3d-buildings",
		source: "composite",
		"source-layer": "building",
		filter: ["==", "extrude", "true"],
		type: "fill-extrusion",
		minzoom: 15,
		paint: {
		  "fill-extrusion-color": "#aaa",       
		  "fill-extrusion-height": [
			"interpolate",
			["linear"],
			["zoom"],
			15,
			0,
			15.05,
			["get", "height"],
		  ],
		  "fill-extrusion-base": [
			"interpolate",
			["linear"],
			["zoom"],
			15,
			0,
			15.05,
			["get", "min_height"],
		  ],
		  "fill-extrusion-opacity": 0.6,
		},
	  },
	  labelLayerId
	);
  });










var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

