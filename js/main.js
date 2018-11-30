var myLatLng = { lat: 0.0, lng: 0.0 };
var mapOptions = {
    center: myLatLng,
    zoom: 1,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

// Hide result box
document.getElementById("output").style.display = "none";

// Create/Init map
var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

// Create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

// Bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


// Define calcRoute function
function calcRoute() {

	var waypts = [];
   waypts.push({
              location: document.getElementById("pickup_id").value,
              stopover: true
            });

    //create requestfdire
    var request = {
        origin: "8120 304th Ave. SE Preston, WA 98050",
        destination: document.getElementById("dropoff_id").value,
waypoints: waypts,
	optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL    }

    // Routing
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time 

 var totalDist = 0;
var i = 0;
  
  var myroute = result.routes[0];
  for (i = 0; i < myroute.legs.length; i++) {
    totalDist += myroute.legs[i].distance.value;
  }	
totalDist = totalDist * 0.000621371;
var numpieces = document.getElementById("numpieces_id").value;
var stairs = document.getElementById("stairs_id").checked;
var elevator = document.getElementById("elevator_id").checked;
var curbside = document.getElementById("curbside_id").checked;
var inside = document.getElementById("inside_id").checked;
var leg1 = myroute.legs[0].distance.value * 0.000621371;
var leg2 = myroute.legs[1].distance.value * 0.000621371;

var stairsVal = 0;
var elevatorVal = 0;
var curbVal = 1;

if (stairs == true)
{
	stairsVal = 1;
}
else
{
	stairsVal = 0;
}

if (elevator == true)
{
	elevatorVal = 1;
}
else
{
	elevatorVal = 0;
}

if (curbside == true)
{
	curbVal = 1;
}
else
{
	curbVal = 0;
}





var estimate = 80 + (2 * leg1) + (6 * leg2) + (12 * numpieces) + (stairsVal * (5*numpieces)) + (elevatorVal * (8*numpieces)) + (curbVal * (-5 * numpieces));
estimate = estimate.toFixed(2);


	 	            
            $("#output").html("<div class='result-table'> Estimated Cost: " + estimate + "</div>");
            document.getElementById("output").style.display = "block";




            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //Show error message           
           
            alert("Can't find road! Please try again!");
            clearRoute();
        }
    });

}

// Clear results


// Create autocomplete objects for all inputs

var options = {
    types: ['(cities)']
}


var input1 = document.getElementById("pickup_id");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("dropoff_id");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
