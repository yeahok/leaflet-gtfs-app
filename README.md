# leaflet-gtfs-app

This is a web server for displaying Translink GTFS and GTFS-Realtime data on a map. Written in JS for node.js. Currently very barebones and not recommended for production. Small preview avaiable [here](https://webmshare.com/WWwAn).

## Running the app:
* A MongoDB server is required to be running. 
* Translink SEQ GTFS data needs to be imported into MongoDB using the import feature of node-gtfs. The zip file is available from [https://data.qld.gov.au/](https://data.qld.gov.au/dataset/general-transit-feed-specification-gtfs-seq/resource/be7f19e5-3ee8-4396-b9eb-46f6b4ce8039)
* The server can be started with 
```bash
npm start
```

## Main libraries used:
* Express - For web server
* jade - Template engine for html
* node-gtfs - For importing and accessing GTFS info
* request - For making requests to GTFS-Realtime data
