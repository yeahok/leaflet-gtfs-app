var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
    }),
    //latlng = L.latLng(-27.469771, 153.025124); default location
    latlng = L.latLng(-27.528329, 153.057253); //testing location

//var map = L.map('map', {center: latlng, zoom: 13, layers: [tiles]}); default zoom
var map = L.map('map', {center: latlng, zoom: 17, layers: [tiles]}); //testing zoom

var busIcon = new L.Icon({
    iconUrl: '/images/bus-icon.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

var onMarkerClick = function(e){ //i should probably clean up this entire function
    //console.log(this.options.id);
    var title = document.getElementById("stopinfo");
    title.innerText = this.options.title;
    
    var urlBase = '/api/getroutes?stop_id=';
    var requestURL = urlBase + this.options.id;
    console.log(requestURL);
    
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    var route_info = {};
    request.send();
    request.onload = function() {
        route_info = JSON.parse(JSON.stringify(request.response));

        var table = document.getElementById("listinfo");

        table.innerHTML = ""; //delete previous info. this might be bad practice and should be replaced maybe

        var header = table.createTHead();
        var row = header.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "<b>Travel Code</b>";
        cell2.innerHTML = "<b>Route Name</b>";

        for (var i = 0; i < route_info.length; i++) {
            var row = table.insertRow(i+1); //row 0 is for header
            
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            
            row.id = route_info[i].route_id;

            cell1.innerHTML = route_info[i].route_short_name;
            cell2.innerHTML = route_info[i].route_long_name;
            //there's probably a better way of doing the following line
            cell3.innerHTML = '<button onclick="showBusLocations(\'' + route_info[i].route_id + '\')">Show bus locations</button>';
        }
        console.log(route_info);
    }
}

var showBusLocations = function(route_id) {
    var urlBase = '/api/getvehicles?route_id=';
    var requestURL = urlBase + route_id;
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    var vehicleInfo = {};
    request.send();
    request.onload = function() {
        if (request.response.length < 1) { //no realtime data available on server
            //this code doesn't seem very good
            tablerow = document.getElementById(route_id);
            tablerow.getElementsByTagName("td")[2].innerHTML = "No data found";
            return;
        }
        vehicleInfo = JSON.parse(JSON.stringify(request.response));
        //console.log(vehicleInfo);
        
        //remove previous vehicle markers from the map and array
        for(i=0;i<vehicleMarkers.length;i++) {
            map.removeLayer(vehicleMarkers[i]);
        }
        vehicleMarkers = [];

        for (var i = 0; i < vehicleInfo.length; i++) {
            var v = vehicleInfo[i];
            var lat = v.vehicle.position.latitude;
            var long = v.vehicle.position.longitude;
            console.log(v);
            var id = v.id;
            var marker = L.marker(L.latLng(lat, long), { id: id, icon: busIcon });
            marker.bindPopup(id);
            vehicleMarkers.push(marker);
            map.addLayer(vehicleMarkers[i]);
        }
    }
}

var markers = L.markerClusterGroup({ chunkedLoading: true });

for (var i = 0; i < addressPoints.length; i++) {
    var a = addressPoints[i];
    var id = a[0];
    var title = a[1];
    var marker = L.marker(L.latLng(a[2], a[3]), { title: title, id: id });
    marker.bindPopup(title);
    marker.on('click', onMarkerClick);
    markers.addLayer(marker);
    }
map.addLayer(markers);

var vehicleMarkers = [];