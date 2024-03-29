        // MAPBOX
        mapboxgl.accessToken = 'pk.eyJ1Ijoidmlja3lzdGlja3oiLCJhIjoiY2xmYXh0OHVlMG4wcDNxbmdtbjgwOGp3YyJ9.fMGn7GNnSZKs6BCvvKeaNw';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/light-v10',
            // center: [7.2526, 5.1931], // starting position [lng, lat]
            // center: [7, -1.09], // starting position [lng, lat]
            center: [5.145827,7.2965394], // starting position [lng, lat]
            // center: [-73.950863, 40.734917], // starting position [lng, lat]
            zoom: 14, // starting zoom
            projection: 'globe'
        });

         // Imagery Switch 
        //  const layerList = document.getElementById('imagery');
        //  const inputs = layerList.getElementsByTagName('input');
     
        //  for (const input of inputs) {
        //      input.onclick = (layer) => {
        //          const layerId = layer.target.id;
        //          map.setStyle('mapbox://styles/mapbox/' + layerId);
        //      };
        //  }
         

        // Add source and layer whenever base style is loaded
                    map.on('style.load', () => {
                        addAdditionalSourceAndLayer() ;
                    });

                    const layerList = document.getElementById('imagery');
                    const inputs = layerList.getElementsByTagName('input');

                    for (const input of inputs) {
                        input.onclick = (layer) => {
                            const layerId = layer.target.id;
                            map.setStyle('mapbox://styles/mapbox/' + layerId);
                        };
                    }

                    
                    // map.on('load', () => {
                        // Set the default atmosphere style
                        // map.setFog({});
                    function addAdditionalSourceAndLayer() {
                        // add a source and layers of the streetlight data
                        map.addSource('futa_boundary', {
                            type: 'geojson',
                            data: 'assets/dataset/futa_boundary.geojson'
                        });

                        map.addLayer({
                            id: 'bound-fill',
                            type: 'line',
                            source: 'futa_boundary',
                            paint: {
                                'line-color': 'red',
                                'line-width': 3,
                                // 'line-opacity': '1',
                            }
                        });
                    // });
                    // };

                    // map.on('load', () => {
                        // Set the default atmosphere style
                        // map.setFog({});
                    // function addAdditionalSourceAndLayer() {
                        // add a source and layers of the streetlight data
                        map.addSource('streetlights_dataset', {
                            type: 'geojson',
                            data: 'assets/dataset/streetlights_dataset.geojson'
                        });

                        map.addLayer({
                            id: 'streetlights',
                            type: 'circle',
                            source: 'streetlights_dataset',
                            paint: {
                                'circle-color': 'blue'
                            //     'circle-color': ['match' ['get', 'Streetlight powered source'],
                            //     'Grid powered', 'red', 'Solar powered', 'blue'

                            // ]
                            }
                        })
                    // });
                    };
    
        // Mouse move feature
            map.on('mousemove', (e) => {
                document.getElementById('map_coords').innerHTML = 
                // ('Latitude: ' + e.latlng.lat +"  "+  ' Longitude: ' + e.latlng.lng)
                    // `e.point` is the x, y coordinates of the `mousemove` event
                    // relative to the top-left corner of the map.
                    // JSON.stringify(e.point) +
                    // '<br />' +
                    // `e.lngLat` is the longitude, latitude geographical position of the event.
                    JSON.stringify(e.lngLat.wrap());
            });

        // Add zoom and rotation controls to the map.
            map.addControl(new mapboxgl.NavigationControl());

          // Add the control to the map(search feature).
            map.addControl(
                new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    mapboxgl: mapboxgl
                })
            );


       
    

    