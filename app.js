var mysql = require('mysql');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var port = 3000;

app.use(function(req, res, next){
	global.connection = mysql.createConnection({
		host: "localhost",
        user: "root",
        password: "Anjal!22",
        database: "simplyorganics"
	});
	connection.connect();
	next();
});


app.get('/', function(req, res, next) {
	connection.query('SELECT * from User', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
