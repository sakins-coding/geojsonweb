# GeoJSON Web
GeoJSON Web is a Javascript library of helper functions for displaying the features in a GeoJSON database in a Leaflet web map.  These functions are to provide a general purpose implementation of the [Leaflet GeoJSON Example](https://leafletjs.com/examples/geojson/) that is simple to use and avoids having to duplicate code across a site if you are displaying sets of GeoJSON data.

## API Functions
### getGeoJSON
`getGeoJSON (url)`

This is the method to read the GeoJSON data.  The `url` can be a relative path to the GeoJSON file or a url.  The geoGeoJSON method needs to be called to load the data before calling the `atlas` or `detail` functions.

### atlas
`atlas (mapdiv="map", id_field="id", detailurl="detail.html")`

The `atlas` function displays all of the features from the GeoJSON file on a Leaflet web map.  The parameters for the function are:
- `mapdiv` - the HTML "id" of the `div` tag where the Leaflet map should be rendered, default value is "map"
- `id_field` - the property from the GeoJSON file that provides a unique index of the features.  This field will be used to create the links to display each feature in a detailed view (see next function), default value is "id"
- `detailurl` - this is a relative url or HTML file that will display an individual feature.  This url combined with the `id` field will be used to create links in the pop-up displays of the features in the atlas map, default value is "detail.html"

### detail
`detail (mapdiv="map", id_field="id", imagediv="image")`

The `detail` function is used to display a single feature from the set of features in the GeoJSON file.  The `image` property of the feature is displayed in a div, there is an inset map showing the location of the image, and the rest of the properties for the feature will dynamically populate the HTML page by matching the key of the feature with HTML elements that have an "id" matching that key.
- `mapdiv` - the HTML "id" of the `div` tag where the inset Leaflet map should be rendered, default value is "map"
- `id_field` - the property of the GeoJSON file to uniquely identify which feature to display, default value is "id"
- `imagediv` - the HTML "id" of the page `div` to display the image within.  The `image` property needs to be a relative path or full URL to the image, default value is "image"

## Format of GeoJSON File
The GeoJSON file is a standard feature collection.  The following is an example file with a single feature:

```
{"type": "FeatureCollection",
"features": [
{
   "type":"Feature",
   "geometry":{
      "type":"Point",
      "coordinates":[
         -111.695,
         36.728
      ]
   },
   "properties":{
      "id": 1,
      "name":"Salt Water Wash, Grand Canyon, AZ",
      "image":"images/salt_water_wash.png",
      "width":36,
      "height":60,
      "units":"inches",
      "media":"acrylic",
      "origin":"studio"
   }
}]}
```

## Dependencies
The GeoJSON Web Javascript library has dependencies on two Javascript libraries:

- [Leaflet](https://leafletjs.com/) the mapping library used to display the features from a GeoJSON data source
- [jQuery](https://jquery.com/) which is used to make AJAX calls to read the GeoJSON data and to modify the HTML elements to populate them with the values from the GeoJSON feature properties

## Included Examples
The repository includes HTML and CSS files to demonstrate the `atlas` and `detail` Javascript functions.  In the `data/` folder, there is an example GeoJSON file with a small set of features.  The `images/` folder has the images that are referenced in the GeoJSON file.

- `index.html` - this file displays the atlas of features from the `data/test.json` file.  Each feature is identified on the map with a location pin.  Clicking on the pin will display a pop-up with the image for the feature and a link to display the `detail` of that feature
- `detail.html` - this file expects a `GET` argument identifying the index of the feature to display from the GeoJSON dataset.

## GitHub Pages Demostration
The demo pages can be interacted with live on the GitHub pages site:

[GeoJSON Web GitHub Pages](https://sakins-coding.github.io/geojsonweb/index.html)

Or in the Azure Web Server which is updated through GitHub actions:

[Azure GeoJSON Web Demo](https://red-cliff-0c4e0cc1e.5.azurestaticapps.net)
