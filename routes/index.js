const express = require('express');
const router = express.Router();

const dbjson = require('./../config/database');

/* GET home page. */
router.get('/', (req, res) => {  
    res.render('pages/home', {title: 'Home page'});
});

module.exports = router;