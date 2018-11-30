var express = require('express');
var router = express.Router();
const db = require('../database');
const con = require('../connection');
const indexSite = require('../public/index.html');

router.get('/', function(req, res, next) {

        res.send(indexSite);
});
module.exports = router;
