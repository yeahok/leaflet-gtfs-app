# leaflet-gtfs-app

This is a web server for displaying Translink GTFS and GTFS-Realtime data on a map. Written in JS for node.js. Made for testing purposes. Small preview avaiable [here](https://gfycat.com/ShoddyExaltedEquestrian).

## Running the app:
* A MongoDB server is required to be running. 
* Translink SEQ GTFS data needs to be imported into MongoDB using the import feature of node-gtfs. The GTFS zip file is available from [https://data.qld.gov.au/](https://data.qld.gov.au/dataset/general-transit-feed-specification-gtfs-seq/)
* The server can be started with 
```bash
npm start
```
* Server can be accessed on port 3000

## Main libraries used:
* Express - For web server
* jade - Template engine for html
* node-gtfs - For importing and accessing GTFS info
* request - For making requests to GTFS-Realtime data
