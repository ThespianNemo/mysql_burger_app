var express = require('express');
var router  = express.Router();
var connection = require('../config/connection.js')

router.get('/', function(req,res) {

	var query = "SELECT * FROM vegetables";

	connection.query(query, function(err, veges) {
		
		res.render('index', {
			vegetables: veges
		});

	});
});

router.post('/create', function(req,res) {

	var query = "INSERT INTO vegetables (vege_name) VALUES (?)"

	connection.query(query, [ req.body.vege_name ], function(err, response) {
		res.redirect("/vegetables")
	});
});

//making a coupon
router.post('/create', function(req,res) {
	//make sure that user inserting is a company
	if (req.session.company){
		var query = "INSERT INTO coupons (company_name, price, item, coupon_code, expiration_date, user_id) VALUES (?, ?, ?, ?, ?, ?)"

		connection.query(query, [ req.body.company_name, req.body.price, req.body.item, req.body.coupon_code, req.body.expiration_date, req.session.user_id ], function(err, response) {

			res.redirect('/coupons')
		});
	}else{
		res.send('you do not have access to this because you are not a company')
	}
});

module.exports = router;
