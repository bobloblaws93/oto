var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

router.post('/ajax', function (req, res){

	var obj = {};
	console.log('body: ' + JSON.stringify(req.body));
	 lat = req.body.lat;
	 lng=req.body.lng;
	 rad=req.body.rad;
	 global.lat=lat;
	console.log('AJAX CALL SUCCESS');

});  
router.get('/mapdiv',function(req,res){
		res.render('mapdiv',{title: 'map'})
    });
    
  
    
    
router.post('/addmsg',function(req,res){
		var db = req.db;
		var collection=db.get('msg');
		var msg=req.body.msg;
		console.log("test");
		
		
		
		
		
		   collection.insert({
			"msg" : msg,
			 "messgloc": [lng,lat]
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
		
		
		
	
	
	
	});
/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

router.get('/feed', function(req, res) {
	//res.render('feed', { title: 'User feed' });
	//var db=req.db;
	//var collection = db.get('msg');
    //var dis=100000;
    mongojs = require('mongojs');
    //var MongoClient = require('mongodb').MongoClient;
    //var mongo = require('mongoskin');
    //var db = require('mongoskin').db('localhost:27017');


               var MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost:27017/nodetest1", function (err, db) {
    if (!err) {
        db.command({
     geoNear: "msg",
     near: { type: "Point", coordinates: [ -73.578855,  45.495575 ] },
     //distanceField: "dist.calculated",
     maxDistance: 20000,
     spherical: true,
    
   }, function (err, result) {
            console.log(result.results[19].obj.msg);
        });
    }
});
		
               
		
 
	
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;
