let geodata;

async function getGeoJSON (url) {
  $.ajax({
    url: url,
    async: false,
    dataType: 'json',
    success: function (response) {
      geodata = response;
    }
  });
}

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function atlas (mapdiv="map", id_field="id", detailurl="detail.html") {
  const map = L.map(mapdiv).setView([35, -109], 7);

	// const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	// 	maxZoom: 19,
	// 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	// }).addTo(map);
  const tiles = L.tileLayer('https://a.tile.opentopomap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; Open Topo Map'
	}).addTo(map);

	function onEachFeature(feature, layer) {
		let popupContent = `<a href="${detailurl}?id=${feature.properties.id}">${feature.properties.name}<img src="${feature.properties.image}" width=300px></a>`;

		if (feature.properties && feature.properties.popupContent) {
			popupContent += feature.properties.popupContent;
		}

		layer.bindPopup(popupContent);
	}

  const pleinWhereLayer = L.geoJSON(geodata, {

		pointToLayer(feature, latlng) {
			return L.marker(latlng);
		},

		onEachFeature
	}).addTo(map);
}

function getIDGeoJSON (id_field, id) {
	newGeoData = {};
	newGeoData.type = geodata.type;
	newGeoData.features = [];

	geodata.features.forEach((feature) => {
		if (feature.properties[id_field] == id) {
			newGeoData.features.push(feature);
		}
	});

	geodata = newGeoData;
}

function detail (mapdiv="map", id_field="id", imagediv="image") {
	id = getURLParameter(id_field);
	getIDGeoJSON (id_field, id);

	viewpoint = [];
	viewpoint.push(geodata.features[0].geometry.coordinates[1]);
	viewpoint.push(geodata.features[0].geometry.coordinates[0]);

	const map = L.map(mapdiv).setView(viewpoint, 9);

	// const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	// 	maxZoom: 19,
	// 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	// }).addTo(map);
  const tiles = L.tileLayer('https://a.tile.opentopomap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; Open Topo Map'
	}).addTo(map);

	const pleinWhereLayer = L.geoJSON(geodata, {

		pointToLayer(feature, latlng) {
			return L.marker(latlng);
		}
	}).addTo(map);

	for (var property in geodata.features[0].properties) {
		if (property == "image") {
			let imagemarkup = `<img src="${geodata.features[0].properties.image}" width=580px>`;
			$("#" + imagediv).html(imagemarkup);
		}
		else {
			$("#" + property).html(geodata.features[0].properties[property]);
		}
	  }
}