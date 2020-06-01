var mymap = L.map('map', {
    minZoom: 2,
    maxZoom: 5,
    fullscreenControl: true,
    fullscreenControlOptions: {
    position: 'topleft'
    },
    layers: [
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'),
    ]
}).setView([50, 90], 2) 


// запуск карты  
var southWest = L.latLng(90, -180),
    northEast = L.latLng(-70, 220),
    bounds = L.latLngBounds(southWest, northEast);

mymap.setMaxBounds(bounds);

// создание цветовой палитры и легенды

var length = 30,
color = d3.scale.linear().domain([1,length])
  .interpolate(d3.interpolateHcl)
  .range([d3.rgb("#67cc45"), d3.rgb('#ff4d6a')]);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (mymap) {

    var div = L.DomUtil.create('div', 'info legend')

    div.innerHTML += '<div style="margin-bottom: wpx; text-align:center">RVA</div>'

    div.innerHTML += '<div style="display: inline-block; margin: 5px; vertical-align: middle">0</div>'

    for (var i = 0; i < length; i++) {
        div.innerHTML += "<div style='background-color:" + color(i) + "' class='color_rect'></div>"
    }

    div.innerHTML += '<div style="display: inline-block; margin: 5px; vertical-align: middle">' + length / 100 +'</div>'

    return div;
};

legend.addTo(mymap);


$(document).ready(function() {
    $.ajaxSetup({ cache: false });
});

$.getJSON( "https://raw.githubusercontent.com/pineappleblack/weather-map/master/weather_data_final.json?", function( data ) {

    circles = []
    // нанесение точек на карту
    $.each(data, function( index ) {
        el = data[index]
        circles[index] = L.circleMarker([el['lat'], el['lon']], {
        fillColor: color(el['RVA'] * 100),
        fillOpacity: 0.9,
        radius: 10,
        weight: 0,
        }).addTo(mymap);

        // circles[index].bindPopup("Координаты: " + circles[index]['_latlng']['lat'] + ", " + circles[index]['_latlng']['lng'])
    });

});
