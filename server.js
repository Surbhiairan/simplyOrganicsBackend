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
        password: "",
        database: "simplyorganics_new"
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

app.get('/salespersonlist', function(req, res, next) {
	connection.query("SELECT * from Users where role='salesperson'", function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

app.get('/productslist', function(req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

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
	var query = connection.query('INSERT INTO Product SET ?',{description:req.body.title},
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
	connection.query('SELECT * FROM Product where prod_id= ?', [p_id], function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		res.send(JSON.stringify({"results": results}));
	});
});


app.get('/storeview', function(req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM Store', function (error, results, fields) {
		if (error) throw error;
		/* var stores = results[0];
		res.send(results); */
		res.send(JSON.stringify({"results": results}));
	});
});

app.post("/storeedit", (req, res) => {
	
	console.log(req.body,"bodyyyyyyyyyyyyyyyyyyyyyyyyyyy");
	//const product = { p_title: 'dal', p_price: 123 };
	var query = connection.query(
			'INSERT INTO Store SET ?', {
				name:req.body.name, 
				description: req.body.description, 
				address: req.body.address, 
				pincode: req.body.pincode, 
				city: req.body.city, 
				state: req.body.state, 
				country: req.body.country, 
				contact: req.body.contact, 
				date: req.body.date 
			},
			function(err, result) {
				console.log("result",result, "err", err);
			}
		);
});

app.get('/catlist', function(req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM Category', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

app.get('/measlist', function(req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM Measure', function (error, results, fields) {
		if (error) throw error;
		var measures=results[0];
		res.send(results);
		//res.send(JSON.stringify({"results": results}));
	});
});

app.get('/quantlist', function(req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM Quantity', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

app.get('/currlist', function(req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM Currency', function (error, results, fields) {
		if (error) throw error;
		var currencies=results[0];
		res.send(results);
	});
});

app.get('/citylist', function(req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM Cities', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

app.get('/statelist', function(req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM States', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

app.get('/countrylist', function(req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM Countries', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

app.get('/inventorylist', function (req, res, next) {
	//SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id JOIN Countries ON Users.country = Countries.country_id
	connection.query('SELECT inventory.*, product.*, store.* FROM inventory JOIN product ON inventory.prod_id = product.prod_id JOIN store ON inventory.store_id = store.store_id', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({ "results": results }));
	});
});

app.post("/inventoryedit", (req, res) => {

	console.log(req.body, "bodyyyyyyyyyyyyyyyyyyyyyyyyyyy");
	var query = connection.query(
		'INSERT INTO inventory SET ?', {
			prod_id: req.body.prod_id,
			store_id: req.body.store_id,
			prod_quant: req.body.product_quantity
		},
		function (err, result) {
			console.log("result", result, "err", err);
		}
	);
});



app.listen(port, () => {
    console.log("Server listening on port " + port);
});
