const express = require('express');
const router = express.Router();

const dbjson = require('./../config/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('pages/home', {title: 'Home page'});
});

module.exports = router;
