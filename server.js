console.log("Je suis un serveur");

var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var bodyPaser = require("body-parser");

var db;

MongoClient.connect('mongodb://localhost:27017/tests_maintenance',
    function(err,_db)  {
        if (err)
            console.log("Erreur de connexion à mongodb");
        else {
            console.log("Yeah! Connected!");
            db = _db;
        }
    });



var app = express();
var lesloub = 0;

app.use("/css",express.static(__dirname + "/css"));
app.use("/image",express.static(__dirname + "/image"));
app.use("/js",express.static(__dirname + "/js"));
app.use(bodyPaser.urlencoded({ extended:false }));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/html/index.html");
});

app.get("/nwticket", function(req, res){
	res.sendFile(__dirname + "/html/creation_ticket.html");
});

app.get("/dc", function(req, res){
	res.sendFile(__dirname + "/html/disconnect.html");
});

app.get("/OPacceuil", function(req, res){
	res.sendFile(__dirname + "/html/op_accueil.html");
	
/*
	var dbo = db.db("tests_maintenance");

	dbo.collection("tickets").find({}, function(err,tickets){
		if(err){
			console.log("Erreur");
			console.log(err);
			//res.json(err);
		}
		else{
			console.log("Datas");
			console.log(tickets);
			//res.json(tickets);
		}
	})

	res.sendFile(__dirname + "/html/op_accueil.html");

*/
});

app.get("/listAllTickets", function(req, res){
	var dbo = db.db("tests_maintenance");

	dbo.collection("tickets").find({}).toArray(function(err,ticketsList){
		res.json({tickets : ticketsList});

	});

})

app.get("/message", function(req, res){

	/*
	dbo.collection("message").find()
	.toArray(function(err,message){
		console.log(message);
		res.json({ message: message[0].text});
	})
	*/
});


app.get("/rvldb", function(req, res){

	var dbo = db.db("tests_maintenance");


	dbo.collection("tickets").find({}).toArray(function(err,ticketsList){

		res.json({tickets : ticketsList});

	});

})


app.get("/ticket", function(req,res){
	res.sendFile(__dirname + "/html/display_ticket.html");
})


app.get("/sloubi", function(req, res){
	lesloub++;
	res.end("Jeu du sloubi : Sloubi "+lesloub);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/nwTkt", function(req, res){
	/*
	dbConn.then(function(_db){
	db.collection('ticket').insertOne(req.body);
	*/

	var dbo = db.db("tests_maintenance");
	var datas = req.body;

	dbo.collection("tickets").insertOne(datas, function(err, res){
		if (err)
			throw err;
		console.log("inseré");
	})

	res.send('Données :\n' + JSON.stringify(req.body));



})

app.listen(5453);