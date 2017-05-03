//Sets the map in map div element
var map = new L.map('map').setView([59.85856380000001, 17.638926699999956], 13);
//var mapUppsala = new L.map('map').setView([59.85856380000001, 17.638926699999956], 10);


//_______ESRI PLUGIN____________________________________________________________________________________________________

//Esri plugin- Adding basemapLayer
var layer = L.esri.basemapLayer("Imagery").addTo(map);

// var featureLayer= L.esri.featureLayer({
  //  url: 'https://gisapp.msb.se/arcgis/rest/services/Raddningstjanst/Brandstationer/FeatureServer/0'
 // }).addTo(map);

//var wmsLayer = L.tileLayer.wms('http://opendata-view.smhi.se/met-obs/ows?',{ layers: 'nederbord_momentan_view',format: 'image/png',transparent: true }).addTo(map);
//Adds dropdown for basemap selection

var layerLabels;

  function setBasemap(basemap) {
    if (layer) {
      map.removeLayer(layer);
    }

    layer = L.esri.basemapLayer(basemap);

    map.addLayer(layer);

    if (layerLabels) {
      map.removeLayer(layerLabels);
    }

    if (basemap === 'ShadedRelief'
     || basemap === 'Oceans'
     || basemap === 'Gray'
     || basemap === 'DarkGray'
     || basemap === 'Imagery'
     || basemap === 'Terrain'
   ) {
      layerLabels = L.esri.basemapLayer(basemap + 'Labels');
      map.addLayer(layerLabels);
    }
  }

  function changeBasemap(basemaps){
    var basemap = basemaps.value;
    setBasemap(basemap);
  }
//___________________________________________________________________________________________________________
//Gets a basemap
// var Esri_NatGeoWorldMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
// 	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
// 	maxZoom: 16
// }).addTo(map);

//Adds layer from WebMapServer
// var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
//     layers: 'nexrad-n0r-900913',
//     format: 'image/png',
//     transparent: true,
//     attribution: "Weather data � 2012 IEM Nexrad"
// }).addTo(map);

//var esriFeature = L.esri.featureLayer({ url: 'http://services.arcgis.com/rOo16HdIMeOBI4Mb/ArcGIS/rest/services/Meteors/FeatureServer/0' }).addTo(map);



//Adds marker
var myMarker = L.marker([59.85856380000001, 17.638926699999956], { title: "MyPoint", alt: "The big I", draggable: true }).addTo(map);
var myMarker2 = L.marker([59.75856380000001, 17.638926699999956], { title: "MyPoint", alt: "The big I", draggable: true }).addTo(map);

//Adds a popoup to myMarker
myMarker.bindPopup("<h1>Hejsan</h1><p>Provar lite grejer</p>");

//Greats a polyline
var polyLine = L.polyline([[59.958563, 17.638926699999956], [59.92061, 17.91048], [59.85033,18.01485], [59.958563, 17.638926699999956]], {
    color: 'red'
})
// The Function on() witch resides in the map class is used to listen to events.
// In this case "click" is the event. "e"" is an event object and contains info about the event
// e.latlng contains the event coords.    
// map.on('click',function(e){
//     var coord = e.latlng.toString().split(',');
//     var lat = coord[0].split('(');
//     var long = coord[1].split(')');
//     //alert ("Du klickade på kartan vid Lat: "+lat[1]+" Long: "+long[0])

// //Adds marker to map when clickevent fires
//  var marker = L.marker(e.latlng).addTo(map);
//  marker.bindPopup("Hej befinner mig på:<br> Lat:"+lat[1]+"Long:"+long[0]);
// })

//Greats layergroup
var myLayerGroup = L.layerGroup ([myMarker2,polyLine]);

//Markers, polylines,polygons,circles etc have toGeoJSON functions
 var myGeoJSON = myLayerGroup.toGeoJSON();

//Leaflet lets you add GeoJSON data(layer) to map with geoJson() method.
var GeoJSONLayer = L.geoJson(myGeoJSON);
GeoJSONLayer.addTo(map);

myMarker.on('click',function(){window.alert("Test")});

