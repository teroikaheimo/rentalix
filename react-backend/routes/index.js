var express = require('express');
var router = express.Router();
const Database = require('../database');
const con = require('../connection');
const db = new Database(con);

router.get('/', function(req, res, next) {

        res.send("<p>Rentalix API<br>Items search with filter options. POST -> /items<br>" +
            "User search with POST -> ID -> /user res -> rows OR message:bool<br>" +
            "Registration username available check. /register/available res ->message:bool</p>");
});
module.exports = router;
