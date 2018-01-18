var mysql = require('mysql');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var port = 3000;

//app.use(express.bodyParser());
 // parse application/json
 app.use(bodyParser.json());                        
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
	global.connection = mysql.createConnection({
		host: "localhost",
        user: "root",
        password: "Anjal!22",
        database: "simplyorganics"
	});
	connection.connect();

	res.setHeader('Access-Control-Allow-Origin', '*');
	
		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	
		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	
		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', true);

	next();
});


app.get('/', function(req, res, next) {
	connection.query('SELECT * from Users', function (error, results, fields) {
		if (error) throw error;
        res.send(JSON.stringify({"results": results}));	});
});

app.get('/adminlist', function(req, res, next) {
	connection.query("SELECT * from Users where role='admin'", function (error, results, fields) {
		if (error) throw error;
        res.send(JSON.stringify({"results": results}));	});
});

app.get('/salespersonlist', function(req, res, next) {
	connection.query("SELECT * from Users where role='salesperson'", function (error, results, fields) {
		if (error) throw error;
        res.send(JSON.stringify({"results": results}));	});
});

app.get('/customerlist', function(req, res, next) {
	connection.query("SELECT * from Users where role='customer'", function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

app.get('/productslist', function(req, res, next) {
	connection.query('SELECT * FROM Product', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

app.post("/customeradd", (req, res) => {
	console.log(req.body.fname);
	console.log(req.body.lname);
	//const product = { p_title: 'dal', p_price: 123 };
	var query = connection.query('INSERT INTO about_us SET ?',{description:req.body.fname},
	//var query = connection.query("INSERT INTO tbl_product (p_title,p_price) VALUES ('daal',123)",
	function(err, result) {
        console.log("result",result, "err", err);
    });
});

app.post("/customerupdate", (req, res) => {

    // var country_id, state_id, city_id;

    // //var data = JSON.parse(req.body);
	// console.log("body------", req.body);
    // console.log(req.body.f_name,'fnameeeeeeeeeeeeeee');
    // f_name
    // l_name
    // addedBy
    // address
    // city_name
    // contact
    // country_name
    // dateAdded
    // email
    // landmark
    // pincode
    // state_name
    
    //const product = { p_title: 'dal', p_price: 123 };

    // connection.query('SELECT country_id FROM Countries where country_name= ?', [req.body.country_name], function (error, results, fields) {
	// 	if (error) throw error;
    //     console.log(results);
    //     this.country_id = results;
    //     console.log(this.country_id,'countryyyyyyyyyyyiddddddddddddddddddd')
	// 	//res.send(JSON.stringify({"results": results}));
    // });

    // connection.query('SELECT state_id FROM States where state_name= ?', [req.body.state_name], function (error, results, fields) {
	// 	if (error) throw error;
    //     console.log(results);
    //     this.state_id = results;
    //     console.log(this.state_id,'stateeeeeeeeeeeeeeeeee')
	// 	//res.send(JSON.stringify({"results": results}));
    // });

    // connection.query('SELECT city_id FROM Cities where city_name= ?', [req.body.city_name], function (error, results, fields) {
	// 	if (error) throw error;
    //     console.log(results);
    //     this.city_id = results;
    //     console.log(this.city_id,'citiiiiiiiiiiiiiiiiii')
	// 	//res.send(JSON.stringify({"results": results}));
    // });
    
//     var sql = 'update Users SET f_name=?, l_name=?, addedBy=?,address=?, city=?,contact=?,country=?,dateAdded=?,email=?,landmark=?,pincode=?,state=? where user_id=?';
    
//    // var params = '[req.body.f_name,req.body.l_name,req.body.addedBy, req.body.address, req.body.city_name,req.body.contact, req.body.country_name, req.body.dateAdded, req.body.email, req.body.landmark,req.body.pincode,req.body.state_name,req.body.user_id]';
        
        
// 	var query = connection.query(sql,[req.body.f_name,req.body.l_name,req.body.addedBy, req.body.address, this.city_id,req.body.contact, this.country_id, req.body.dateAdded, req.body.email, req.body.landmark,req.body.pincode,this.state_id,req.body.user_id],function(err, result) {
//         console.log("result",result, "err", err);
//     });
});

app.get("/customerdetail",(req, res) => {
	//console.log("req", req)
	console.log(req.query.userid);
    var userid = req.query.userid;
   // connection.query("SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid])
    connection.query("SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid], function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		res.send(JSON.stringify({"results": results}));
	});
});

app.post("/productedit", (req, res) => {
	console.log(req.body.title,"title");
	console.log(req.body.price);
	const product = { p_title: 'dal', p_price: 123 };
	var query = connection.query('INSERT INTO about_us SET ?',{description:req.body.title},
	//var query = connection.query("INSERT INTO tbl_product (p_title,p_price) VALUES ('daal',123)",
	function(err, result) {
        console.log("result",result, "err", err);
    });
    // connection.query("insert into tbl_product(p_title,p_price) values(?,?)",[product], function (error, results, fields) {
	// 	if (error) throw error;
	// 	console.log(results);
	// 	console.log('inserted');
	// 	//res.send(JSON.stringify({"results": results}));
	// })
});

app.get("/productdetail",(req, res) => {
	//console.log("req", req)
	console.log(req.query.productid);
	var p_id = req.query.productid;
	connection.query('SELECT * FROM tbl_product where p_id= ?', [p_id], function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		res.send(JSON.stringify({"results": results}));
	});
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
