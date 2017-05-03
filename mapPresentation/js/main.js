        
        function marker(lat,long,popupData,style)
        {
          this.lat=lat;
          this.long=long;
          this.popupData=popupData;
          this.style = style;
        }

        var marker1 = new marker(59.96,17.62,"AO-no:1 Status: Påbörjad","YELLOW");
        var marker2 = new marker(59.75,17.75,"AO-no:2 Status: Ej påbörjad","RED");
        var marker3 = new marker(59.75,17.39,"AO-no:3 Status: Klar","GREEN");
        var marker4 = new marker(60.10,17.13,"AO-no:4 Status: Påbörjad","YELLOW");
        var markers = [marker1,marker2.marker3,marker4];
        
        function mapLayers(esriBasemap,esriFeatureLayer)
        {
          this.esriBasemap=esriBasemap;
          this.esriFeatureLayer=esriFeatureLayer;
        }

        var mapData = new mapLayers("Streets",
        "https://gisapp.msb.se/arcgis/rest/services/Raddningstjanst/Brandstationer/FeatureServer/0");


        console.log("Init");

        console.log($scope.onListSelectionRowClick);
        console.log(model.SelectedIndices);

        console.log($scope.selectedRowLargeText);

        var map = new L.map('map').setView([59.85856380000001, 17.638926699999956], 13);
        var layer = L.esri.basemapLayer("Topographic").addTo(map);
        var layerGroup = L.layerGroup();
        var iconPath = L.icon({
            iconUrl: "http://localhost/6.1.NovaCura.Flow.Client.Web/api/icon/person_fieldservice/40",
            shadowUrl: "Shared/images/marker-shadow.png",
            iconAnchor: [12, 39],
            shadowAnchor: [12, 39],
            popupAnchor : [0,-40]
        });

       $scope.c.Markers.forEach(function (m) {
           console.log(m.Latitude);
           console.log(m.Data);
           //Parameters 
           var mark = L.marker([m.Latitude, m.Longitude], { icon: iconPath }).addTo(layerGroup);
           mark.bindPopup(m.Data);
       });

       layerGroup.addTo(map);