    document.addEventListener("DOMContentLoaded", function () {

        const valencia = [39.4699, -0.3763];

        const map = L.map("map").setView(valencia, 14);

        map.scrollWheelZoom.disable();

        L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
            { attribution: "&copy; CartoDB" }
        ).addTo(map);


        L.marker(valencia)
            .addTo(map)
            .bindPopup("Valencia, Spain");

        if (!navigator.geolocation) {
            alert("La geolocalización no es compatible con su navegador.");
            return;
        }

        navigator.geolocation.getCurrentPosition(

            async function (position) {
                const userLocation = [
                    position.coords.latitude,
                    position.coords.longitude
                ];

                console.log("USER LOCATION:", userLocation);

                if (!userLocation || userLocation[0] === 0 || userLocation[1] === 0) {
                    alert("Ubicación no válida.");
                    return;
                }

                const icon = L.icon({
                    iconUrl: "black-pin.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41]
                });

                L.marker(userLocation, { icon })
                    .addTo(map)
                    .bindPopup("Your Location");

                try {
                    const apiKey = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImI5ZDhkOWFjMmUzZjQ5NWViNDM0ZjE2MWY2ZjQxODY5IiwiaCI6Im11cm11cjY0In0=";

        
                    const routeURL =
                        `https://api.openrouteservice.org/v2/directions/driving-car` +
                        `?api_key=${apiKey}` +
                        `&start=${userLocation[1]},${userLocation[0]}` +
                        `&end=${valencia[1]},${valencia[0]}` +
                        `&geometry_format=geojson`;

                    console.log("ROUTE URL:", routeURL);

                    const response = await fetch(routeURL);

                    console.log("HTTP Status:", response.status);

                    const data = await response.json();

                    console.log("API Response:", data);

                    if (!response.ok || data.error) {
                        throw new Error(data.error?.message || `HTTP ${response.status}`);
                    }

        
                    const routeCoords = data.features[0].geometry.coordinates.map(
                        coord => [coord[1], coord[0]] 
                    );

                
                    const routeLine = L.polyline(routeCoords, {
                        color: "#00BFFF",
                        weight: 5,
                        opacity: 0.9
                    }).addTo(map);

            
                    map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });

                } catch (error) {
                    console.error("Route error:", error);
                    alert("No se pudo cargar la ruta: " + error.message);
                }

            },

            function (error) {
                console.error(error);
                alert("Acceso a la ubicación denegado.");
            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
        
    });

