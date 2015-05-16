var search_input = $('.search input[type=text]');
                var search_input_size = 120;
                var search_large_size = 180;
                var padding = 7;
                var shrinked = "";
                $(document).ready(function() {
                    search_input.click(function() {
                        shrink();
                    }).focus(function() {
                        shrink();
                    });
                    search_input.blur(function() {
                        if (shrinked == "YES") normal();
                    });
                    $('.button a').hover(function() {
                        if (shrinked == "YES") normal();
                    });
                });

                function shrink() {
                    if (search_input_size < search_large_size) {
                        $('.button a').each(function() {
                            $(this).animate({
                                'padding-left': padding + 'px',
                                'padding-right': padding + 'px'
                            }, 'fast');
                        });
                        search_input.animate({
                            'width': search_large_size + 'px'
                        }, 'fast');
                        shrinked = "YES";
                    }
                    return false;
                }

                function normal() {
                    search_input.animate({
                        'width': search_input_size + 'px'
                    }, 'fast');
                    $('.button a').animate({
                        'padding-left': '10px',
                        'padding-right': '10px'
                    }, 'fast');
                    shrinked = "";
                    search_input.blur();
                    return false;
                }
                L.mapbox.accessToken = 'pk.eyJ1Ijoicm9ubnBhbmc5MyIsImEiOiJBY19Ndm5zIn0.ivcZjdMoLtilg9WCjdNLaQ';
                var map = L.mapbox.map('map', 'ronnpang93.i6gb5fo9')
                    .setView([45.4954034, -73.5789971], 11);
                var featureGroup = L.featureGroup().addTo(map);
                // Define circle options
                // http://leafletjs.com/reference.html#circle
                var circle_options = {
                    color: '#fff', // Stroke color
                    opacity: 1, // Stroke opacity
                    weight: 10, // Stroke weight
                    fillColor: '#000', // Fill color
                    fillOpacity: 0.6 // Fill opacity
                };
                var circle_one = L.circle([38.89415, -77.03738], 20, circle_options).addTo(featureGroup);
                var circle_two = L.circle([38.89415, -77.03578], 20, circle_options).addTo(featureGroup);
                // Create array of lat,lon points
                var line_points = [
                    [38.893596444352134, -77.0381498336792],
                    [38.89337933372204, -77.03792452812195],
                    [38.89316222242831, -77.03761339187622],
                    [38.893028615148424, -77.03731298446655],
                    [38.892920059048464, -77.03691601753235],
                    [38.892903358095296, -77.03637957572937],
                    [38.89301191422077, -77.03592896461487],
                    [38.89316222242831, -77.03549981117249],
                    [38.89340438498248, -77.03514575958252],
                    [38.893596444352134, -77.0349633693695]
                ];
                // Define polyline options
                // http://leafletjs.com/reference.html#polyline
                var polyline_options = {
                    color: '#000'
                };
                // Defining a polygon here instead of a polyline will connect the
                // endpoints and fill the path.
                // http://leafletjs.com/reference.html#polygon
                var polyline = L.polyline(line_points, polyline_options).addTo(featureGroup);
                var drawControl = new L.Control.Draw({
                    edit: {
                        featureGroup: featureGroup
                    }
                }).addTo(map);
                map.on('draw:created', function(e) {
                    var type = e.layerType,
                        layer = e.layer;
                    featureGroup.addLayer(e.layer);
                    coordia = layer.getBounds().getCenter();;
                });

                function alrt() {
                    alert(coordia);
                }

                function textinput() {
                    var input = document.getElementById("msgs").value;
                    alert(input);
                }

                function geoFindMe() {
                    var output = document.getElementById("demo");
                    if (!navigator.geolocation) {
                        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
                        return;
                    }

                    function success(position) {
                        var latitude = position.coords.latitude;
                        var longitude = position.coords.longitude;
                        output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
                        var img = new Image();
                        img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
                        output.appendChild(img);
                    };

                    function error() {
                        output.innerHTML = "Unable to retrieve your location";
                    };
                    output.innerHTML = "<p>Locating…</p>";
                    navigator.geolocation.getCurrentPosition(success, error);
                }