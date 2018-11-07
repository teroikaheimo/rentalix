var express = require('express');
var router = express.Router();
const Database = require('../database');
const con = require('../connection');
const mysql = require('mysql');
const db = new Database(con);

router.get('/', function(req, res, next) {

        res.send("<p>Rentalix API<br>Items search with filter options. POST -> /items<br>User search with POST -> ID -> /user</p>");
});

module.exports = router;
