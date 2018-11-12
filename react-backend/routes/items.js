var express = require('express');
var router = express.Router();
const Database = require('../database');
const con = require('../connection');
const db = new Database(con);


router.post('/', function(req, res, next) {
    if(req.session.login === true){
        db.query("SELECT * FROM item;")
            .then(rows =>{
                res.send(rows);
            })
            .catch((err)=>{
                console.log(err);
                res.header(503);
                res.send({message:'Server not responding.'});
            })
    } else{
        if(typeof req.session.isSet === "undefined"){
            res.header(404);
            res.send({message:'Error. Not logged in!'});
        }else{
            res.header(400);
            res.send({message:'Bad request'});
        }
    }
});

router.post('/add', function(req, res, next) {
    if(req.session.login === true && req.session.isAdmin === true){
        db.query(`INSERT INTO item 
        (serial_prefix,name,model,brand,info,address,owner,category,reserved,rented,maintenance,removed,insert_date) 
        VALUES 
        ('${req.body.serial_prefix}'
        ,'${req.body.name}'
        ,'${req.body.model}'
        ,'${req.body.brand}'
        ,'${req.body.info}'
        ,'${req.body.address}'
        ,'${req.body.owner}'
        ,'${req.body.category}'
        ,'${req.body.reserved}'
        ,'${req.body.rented}'
        ,'${req.body.maintenance}'
        ,'${req.body.removed}'
        ,'${req.body.insert_date}');`)
            .then(() =>{
                res.send({success:true,message:"New item added!"});
            })
            .catch((err)=>{
                console.log(err);
                res.header(503);
                res.send({message:'Server error'});
            })
    } else{
        if(typeof req.session.isSet === "undefined"){
            res.header(404);
            res.send({message:'Error. Not logged in!'});
        }else{
            res.header(400);
            res.send({message:'Bad request'});
        }
    }
});

router.post('/modify', function(req, res, next) {
    if(req.session.login === true){
        db.query("SELECT * FROM item;")
            .then(rows =>{
                res.send(rows);
            })
            .catch((err)=>{
                console.log(err);
                res.header(503);
                res.send({message:'Server not responding.'});
            })
    } else{
        if(typeof req.session.isSet === "undefined"){
            res.header(404);
            res.send({message:'Error. Not logged in!'});
        }else{
            res.header(400);
            res.send({message:'Bad request'});
        }
    }
});

router.post('/delete', function(req, res, next) {
    if(req.session.login === true){
        db.query("SELECT * FROM item;")
            .then(rows =>{
                res.send(rows);
            })
            .catch((err)=>{
                console.log(err);
                res.header(503);
                res.send({message:'Server not responding.'});
            })
    } else{
        if(typeof req.session.isSet === "undefined"){
            res.header(404);
            res.send({message:'Error. Not logged in!'});
        }else{
            res.header(400);
            res.send({message:'Bad request'});
        }
    }
});
module.exports = router;
