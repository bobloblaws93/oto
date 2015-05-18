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

//this does nothing yet
function myMiddleware(req, res, next) {
    res.locals.uname = 'fresh';
    next();
}

router.post('/ajax', function (req, res){
	//receives ajax call from html
	var obj = {};
	console.log('body: ' + JSON.stringify(req.body));
	 lat = req.body.lat;
	 lng=req.body.lng;
	 rad=req.body.rad;
	 
	 global.rad=rad;
	 global.myvar=rad;
	console.log(lat);
	 console.log(rad);
	
	console.log('AJAX CALL SUCCESS');

});  
router.get('/mapdiv',function(req,res){
		res.render('mapdiv',{title: 'map'})
    });
    
  
    
    
router.post('/addmsg',function(req,res){
		var db = req.db;
		var collection=db.get('msg');
		var msg=req.body.msg;
		console.log(rad);
		console.log("test");
		
		
		
		
		//intial collection insertion
		//inserts into the database the message, the location of the message and the radius of the circle
		   collection.insert({
			"msg" : msg,
			 "messgloc": [lng,lat],
			 "rad":rad,
			 "group":"public"
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            console.log(err);
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
	console.log(myvar);
	var MongoClient = require("mongodb").MongoClient;//connect to db
	//GEONEAR command
	//returns everything around the given coordinates within a distance of 20000 meters(20km)
	//returns an array of results from the msg collection from the closest to the furthest
	MongoClient.connect("mongodb://localhost:27017/nodetest1", function (err, db) {
    if (!err) {
		
		db.command( { count: "msg",
							
							query:{group:"public"} 
		
							}, function(err,doc)
							{
							document_count=doc.n;
							console.log(doc.n);
								
							}
							
							
							
							);
							

		
        db.command({
			
     geoNear: "msg",
     near: { type: "Point", coordinates: [ -73.578855,  45.495575 ] },
     query:{group:"public"},
     count: "msg",
     maxDistance: 20000,
     num:20,
     spherical: true,
    //callback returns result
   }, function (err, result) {
			console.log("NUMBER!");
			console.log(result.dis);
			
			i=0;
			
			for(var i=0;i<result.results.length;i++)
			{
				num=i;
				if(result.results[num].dis < result.results[num].obj.rad)
				{
				console.log("within rad");
				console.log(result.results[num].obj.msg);
				console.log(result.results[num].dis);
				}
				
				else
				{
					
				console.log("outside radii");	
				console.log(result.results[num].obj.msg);
				console.log(result.results[num].dis);
				result.results[num].obj.rad
					
				}
				
			}
				
				
			
				
				
            
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
	console.log(lat);
	console.log("post");
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
