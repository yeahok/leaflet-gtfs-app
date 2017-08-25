var express = require('express');
var router = express.Router();

var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');

function gtfsrt_feed (gtfs_url) {
  //i was going to use this.[classvariablename] but it interfered with updateGTFS
  //information here: https://stackoverflow.com/questions/21769460/javascript-object-variable-becomes-undefined-inside-anonymous-function
  _feed = {};
  _requestSettings = {
    method: 'GET',
    url: gtfs_url,
    encoding: null
  };

  this.updateGTFS = function() {
    request(_requestSettings, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var gtfs_data = GtfsRealtimeBindings.FeedMessage.decode(body);
        _feed = JSON.parse(JSON.stringify(gtfs_data));
        console.log("feed updated?");
      }
    });
  };

  this.getLocations = function(route_id, callback) {
    var array = [];
    var counter = 0;
    
    for (i = 0; i < _feed.entity.length; i++) {
    //   if (_feed.entity[i].trip_update == null) {
    //     if (_feed.entity[i].vehicle.route_id == route_id) {
    //       array.push(JSON.parse(JSON.stringify(_feed.entity[i])));
    //     }      
    //   }
    //   else if (_feed.entity[i].trip_update.trip.route_id == route_id) {
        
    //     array.push(JSON.parse(JSON.stringify(_feed.entity[i])));
    //   }      
    // }
    
    //get only info with position
      if (_feed.entity[i].vehicle != null) {
        //array.push(JSON.parse(JSON.stringify(_feed.entity[i]))); 
        if (_feed.entity[i].vehicle.trip.route_id == route_id) {
          array.push(JSON.parse(JSON.stringify(_feed.entity[i])));
        }
      }
    }

    callback(array);
  }
}

router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const param = req.query.route_id;
    
    if (!param) {
      res.json({
        error: "Missing required parameter `route_id`"
      });
      return;
    }

    translink_gtfs.getLocations(param, function(result) {
      res.send(result);
    })
});

var translink_gtfs = new gtfsrt_feed('https://gtfsrt.api.translink.com.au/Feed/SEQ');
translink_gtfs.updateGTFS();
console.log("test");

module.exports = router;