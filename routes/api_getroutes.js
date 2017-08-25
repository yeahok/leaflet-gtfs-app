var express = require('express');
var router = express.Router();
var gtfs = require('gtfs');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.setHeader('Content-Type', 'application/json');
  const param = req.query.stop_id;
  
  if (!param) {
    res.json({
      error: "Missing required parameter `stop_id`"
    });
    return;
  }

  gtfs.getRoutes({ // this method is sometimes slow. maybe cache or something
    agency_key: 'Translink',
    stop_id: param
  })
  .then(routes => {
    if (!routes) {
      res.json({
        error: "No routes found"
      });
    }
    res.send(routes);
  })
  .catch(err => {
    console.log("API getroute failed");
  });
});

module.exports = router;
