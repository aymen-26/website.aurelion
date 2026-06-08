document.addEventListener("DOMContentLoaded", function () {


    var valencia = [39.4699, -0.3763];

 
    var map = L.map('map').setView(valencia, 14);

    map.scrollWheelZoom.disable();

  
    L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
            attribution: '&copy; <a href="https://carto.com/">CartoDB</a>',
        }
    ).addTo(map);


    L.marker(valencia)
        .addTo(map)
        .bindPopup("Valencia, Spain")
        .openPopup();

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {

            var userLocation = [
                position.coords.latitude,
                position.coords.longitude
            ];

            var icon = L.icon({
                iconUrl: 'black-pin.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41]
            });
            
            L.marker(userLocation, { icon }).addTo(map);

            var bounds = L.latLngBounds([valencia, userLocation]);
            map.fitBounds(bounds, { padding: [50, 50] });

  
            var routeURL =
                `https://api.openrouteservice.org/v2/directions/driving-car?api_key=YOUR_API_KEY&start=${userLocation[1]},${userLocation[0]}&end=${valencia[1]},${valencia[0]}`;

            fetch(routeURL)
                .then(response => response.json())
                .then(data => {

                    var routeCoords =
                        data.routes[0].geometry.coordinates.map(
                            coord => [coord[1], coord[0]]
                        );

                    L.polyline(routeCoords, {
                        color: 'blue',
                        weight: 4
                    }).addTo(map);

                })
                .catch(error =>
                    console.error("Error fetching route:", error)
                );

        }, function () {

            alert("Location access denied.");

        });

    } else {

        alert("Geolocation is not supported by your browser.");

    }

});




























