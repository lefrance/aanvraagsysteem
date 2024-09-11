//jshint esversion:6


//import modules
let express = require("express");
let bodyParser = require("body-parser");
let ejs = require('ejs');
let mysql = require('mysql2');





//binding the express module to app
//creating a instance of express
const app = express();





// creating variable called post
let posts = []


//setting your view engine to ejs
app.set('view engine', 'ejs');

//cofigure bodyparse to read html requests
app.use(bodyParser.urlencoded({
	extended: true
}));


let omgevingStatus = "";
let message = "";
let user = "";
let debiteurennummer = "";

// Create connection configuration
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "R@ou5lR@ou5l",
	database: "aanvraagSysteem"
});

connection.connect((err) => {
	if (err) {
		console.log("Error occurred", err);
	} else {
		console.log("Connected to database");
	}
});



//telling express to include the public folder
app.use(express.static("public"));


//handeling a get request from home route
app.get("/", function(req, res) {

	// render home.ejs in your view folder
	res.render("login", {
		message: message,
	});

	message = '';
});

app.get("/nota", function(req, res) {

	// render home.ejs in your view folder
	res.render("nota", {
		message: message,
	});

	message = '';
});

//handeling a get request from home route
app.get("/programmer", function(req, res) {

	// render home.ejs in your view folder
	res.render("programmer");

});


//handeling a get request from home route
app.get("/aanvraag", function(req, res) {


	// render home.ejs in your view folder
	res.render("aanvraag", {
		user: user,
		message: message,
		omgevingStatus: omgevingStatus,
		debiteurennummer: debiteurennummer
	});

	message = "";
	omgevingStatus = "";
});


//handeling a get request from home route
app.get("/nieuweAanvraag", function(req, res) {


	// render home.ejs in your view folder
	res.render("nieuweaanvraag", {
		user: user,
		message: message
	});

	message = "";
	omgevingStatus = "";
});



//handeling a get request from home route
app.get("/debiteurencontrole", function(req, res) {


	// render home.ejs in your view folder
	res.render("debiteurencontrole", {
		user: user,
		message: message
	});

	message = "";
	omgevingStatus = "";
});



//handeling a get request from home route
app.post("/omgeving", function(req, res) {

	let omgeving = req.body.omgeving;
	if (omgeving) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM `omgeving` WHERE `omgevingNaam` = ?', [omgeving], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// get the status
				omgevingStatus = results[0].omgevingStatus

				if (omgevingStatus == "bezet") {
					message = "het gebied is bezet"
				}

				console.log(omgevingStatus)
				// Redirect to home page
				res.redirect('/debiteurencontrole');
				message = "een aansluiting is mogelijk"
			} else {
				message = "gebied niet gevonden"
				res.redirect('/nieuweAanvraag');
			}
			res.end();
		});
	} else {
		message = "voer een gebied in"
		res.redirect('/aanvraag');
	}
});






//	handeling a get request from home route
app.post("/debiteuren", function(req, res) {

	let debiteurennummer = req.body.debiteurennummer;
	if (debiteurennummer) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM `debiteuren` WHERE `debiteurennummer` = ?', [debiteurennummer], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// get the status
				debiteurennummer = results[0].debiteurennummer
				openstaandefacturen = results[0].factuur

				console.log(debiteurennummer)
				console.log(openstaandefacturen)
				// Redirect to home page
				if (openstaandefacturen == 0) {
					message = "debiteur heeft geen openstaande facturen"
					res.redirect('/nieuweAanvraag');
				} else{
					message = "debiteur heeft geen openstaande facturen"
					res.redirect('/nieuweAanvraag');
				}

			} else {
				message = "debiteur niet gevonden"
				res.redirect('/debiteurencontrole');
			}
			res.end();
		});
	} else {
		message = "voer een debiteuren nummer  in"
		res.redirect('/debiteurencontrole');
	}
});

//	handeling a get request from home route
app.post("/nieuweAanvraag", function(req, res) {

	// let text = req.body.text;
	let email = req.body.email;
	let huisnummer = req.body.huisnummer;
	let idcart = req.body.idcart;
	let imei = req.body.imei;
	let naam = req.body.naam;
	let straatnaam = req.body.straatnaam;
	let toestelnummer = req.body.toestelnummer;
	let voornaam = req.body.voornaam;
	debiteurennummer;

	let query = `INSERT INTO aanvraagen
        (naam, voornaam, idcard, straatnaam,huisnummer, debiteurennummer,imei,toestelnummer,email) VALUES ?;`;

	// Values to be inserted
	let values = [
		[naam, email, idcart, straatnaam, huisnummer, debiteurennummer, imei, toestelnummer, email],
	];


	if (debiteurennummer) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query(query, [values], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// get the status
				debiteurennummer = results[0].debiteurennummer
				openstaandefacturen = results[0].factuur

				console.log(debiteurennummer)
				// Redirect to home page
				if (openstaandefacturen) {
					message = "debiteur heeft openstaande facturen"
				}

				if (!openstaandefacturen) {
					message = "debiteur heeft openstaande facturen"
					res.redirect('/faciliteit aanvraag');
				}

				res.redirect('/debiteurencontrole');
			} else {
				message = "debiteur niet gevonden"
				res.redirect('/debiteurencontrole');
			}
			res.end();
		});
	} else {
		message = "voer een debiteuren nummer in in"
		res.redirect('/debiteurencontrole');
	}
});

//	handeling a get request from home route
app.post("/nieuwedebiteur", function(req, res) {

	let text = req.body.text;
	let email = req.body.email;
	let huisnummer = req.body.huisnummer;
	let idcart = req.body.idcart;
	let imei = req.body.imei;
	let naam = req.body.naam;
	let straatnaam = req.body.straatnaam;
	let toestelnummer = req.body.toestelnummer;
	let voornaam = req.body.voornaam;
	let debiteurennummer = req.body.debiteurennummer;

	let query = `INSERT INTO debiteuren
        (naam, voornaam, idcard, straatnaam,huisnummer, debiteurennummer,imei,toestelnummer,email) VALUES ?;`;

	// Values to be inserted
	let values = [
		[naam, email, idcart, straatnaam, huisnummer, debiteurennummer, imei, toestelnummer, email],
	];


	if (debiteurennummer) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query(query, [values], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// get the status
				debiteurennummer = results[0].debiteurennummer
				openstaandefacturen = results[0].factuur

				console.log(debiteurennummer)
				// Redirect to home page
				if (openstaandefacturen) {
					message = "debiteur heeft openstaande facturen"
				}

				if (openstaandefacturen == 0) {
					message = "debiteur heeft openstaande facturen"
					res.redirect('/nieuweAanvraag');

				}

				res.redirect('/debiteurencontrole');
			} else {
				message = "debiteur niet gevonden"
				res.redirect('/debiteurencontrole');
			}
			res.end();
		});
	} else {
		message = "voer een debiteuren nummer in in"
		res.redirect('/debiteurencontrole');
	}
});



//HANDELING APP POST REQUEST from home route
app.post("/auth", function(req, res) {


	// Capture the input fields from form in login.ejs
	let username = req.body.gebruikersnaam;
	let password = req.body.password;

	// simple query
	// with placeholder

	// connection.query(
	//
	// 	'SELECT * FROM `users` WHERE `gebruikersnaam` = ? AND `password` = ?', [username, password],
	// 	function(err, results, fields) {
	// 		console.log(results[0].gebruikersnaam);
	//
	// 	}
	// );
	//
	//

	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM `users` WHERE `gebruikersnaam` = ? AND `password` = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				results[0].gebruikersnaam = username;
				user = results[0].Voornaam
				console.log(user)
				// Redirect to home page
				res.redirect('/aanvraag');
			} else {
				message = "Uw cridentails waren verkeerd"
				res.redirect('/');
			}
			res.end();
		});
	} else {
		message = "voer uw username en wachtwoord in"
		res.redirect('/');
	}
});








app.listen(3001, function() {
	console.log("Server started on port 3001");
});
