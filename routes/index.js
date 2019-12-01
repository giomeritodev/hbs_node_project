var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('pages/home', {title: 'Home page'});
});

module.exports = router;
