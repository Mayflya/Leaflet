        
        function marker(latitude,longitude,popupData,style)
        {
          this.latitude=latitude;
          this.longitude=longitude;
          this.popupData=popupData;
          this.style = style;
        }

        var marker1 = new marker(59.96,17.62,"AO-no:1 Status: Påbörjad","YELLOW");
        var marker2 = new marker(59.75,17.75,"AO-no:2 Status: Ej påbörjad","RED");
        var marker3 = new marker(59.75,17.39,"AO-no:3 Status: Klar","GREEN");
        var marker4 = new marker(60.10,17.13,"AO-no:4 Status: Påbörjad","YELLOW");
        
        var markers = [marker1,marker2,marker3,marker4];
        
        function mapLayers(esriBasemap,esriFeatureLayer)
        {
          this.esriBasemap=esriBasemap;
          this.esriFeatureLayer=esriFeatureLayer;
        }

        var mapData = new mapLayers("Streets",
        "https://gisapp.msb.se/arcgis/rest/services/Raddningstjanst/Brandstationer/FeatureServer/0");


        console.log("Init");

        var map = new L.map('map');

        
        var locate = L.control.locate({
          flyTo:true,
          locateOptions:{
            setView:'once',
              maxZoom: 13
            }
       
          }).addTo(map);

          locate.start();

        var layer = L.esri.basemapLayer("Streets").addTo(map);
        var layerGroup = L.layerGroup();
        var iconPath = L.icon({
            iconUrl: "js/images/marker-icon.png",
            shadowUrl: "js/images/marker-shadow.png",
            iconAnchor: [12, 39],
            shadowAnchor: [12, 39],
            popupAnchor : [0,-40]
        });

       markers.forEach(function (m) {
           console.log(m.latitude);
           console.log(m.popupData);
           //Parameters 
           var mark = L.marker([m.latitude, m.longitude], { icon: iconPath }).addTo(layerGroup);
           mark.bindPopup(m.popupData);
       });

       layerGroup.addTo(map);