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