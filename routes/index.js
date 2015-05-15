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
	var db=req.db;
	var collection = db.get('msg');
    var dis=100000;

		
               
               
	

		var results = 	collection.find( {"messgloc":
                         { $near :
                           { $geometry :
                              { type : "Point" ,
                                coordinates : [-73.578855,  45.495575 ] } ,
                             $maxDistance : 10000
                      } } } 
  
 
		, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem accessing the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            //res.location("feed");
            // And forward to success page
            
        var jsonStr = JSON.stringify(doc);
        var data = JSON.parse(jsonStr);
        var msg=[];
        msg.name=doc[1].msg;
        console.log(doc[0].msg);
		//res.render('testfeed', { title: "feed", data: msg  });
		res.send(doc);
           //console.log(doc);
          
            
            //res.redirect("feed");
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
