var express = require('express');
var router = express.Router();
const Database = require('../database');
const con = require('../connection');
const mysql = require('mysql');
const db = new Database(con);


/* GET home page. */
router.get('/', function(req, res, next) {
  db.query("SELECT * FROM user;")
      .then(rows =>{
        res.send(rows);
      })
      .then(db.close());
});

module.exports = router;
