// node moudles
const express = require('express'),
    app = express();


// native modules for the dankExpress API
var routes = require('./routes.js');


const port = process.env.PORT || 8080;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// routes for the API
app.get('/', routes.getHome);
app.get('/:query', routes.search);


// running API
app.listen( port, () => {
    console.log(`running on port: *http://${ process.env.IP }:${ port }`);
});