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

router.post('/insert', function(req, res, next) {
    if(req.session.login === true && req.session.isAdmin === 1){

        if(typeof req.body.serial_prefix !== "undefined" ||
            typeof req.body.name !== "undefined" ||
            typeof req.body.model !== "undefined" ||
            typeof req.body.brand !== "undefined" ||
            typeof req.body.info !== "undefined" ||
            typeof req.body.address !== "undefined" ||
            typeof req.body.owner !== "undefined" ||
            typeof req.body.category !== "undefined")
        {
            db.query(`INSERT INTO item 
        (serial_prefix,name,model,brand,info,address,owner,category) 
        VALUES 
        ('${req.body.serial_prefix}'
        ,'${req.body.name}'
        ,'${req.body.model}'
        ,'${req.body.brand}'
        ,'${req.body.info}'
        ,'${req.body.address}'
        ,'${req.body.owner}'
        ,'${req.body.category}');`)
                .then(() =>{
                    res.send({success:true,message:"New item added!"});
                })
                .catch((err)=>{
                    console.log(err);
                    res.header(503);
                    res.send({message:'Server error'});
                })
        }else{
            res.header(400);
            res.send({message:'Bad request'});
        }

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
    if(req.session.login === true && req.session.isAdmin === 1){

        if(typeof req.body.serial_prefix !== "undefined" ||
            typeof req.body.name !== "undefined" ||
            typeof req.body.model !== "undefined" ||
            typeof req.body.brand !== "undefined" ||
            typeof req.body.info !== "undefined" ||
            typeof req.body.address !== "undefined" ||
            typeof req.body.owner !== "undefined" ||
            typeof req.body.category !== "undefined")
        {
            db.query(`UPDATE item SET 
        serial_prefix='${req.body.serial_prefix}'
        ,name='${req.body.name}'
        ,model='${req.body.model}'
        ,brand='${req.body.brand}'
        ,info='${req.body.info}'
        ,address='${req.body.address}'
        ,owner='${req.body.owner}'
        ,category='${req.body.category}'
        WHERE serial='${req.body.id}';`)
                .then(() =>{
                    res.send({success:true,message:"Item modified!"});
                })
                .catch((err)=>{
                    console.log(err);
                    res.header(503);
                    res.send({message:'Server error'});
                })
        }else{
            res.header(400);
            res.send({message:'Bad request'});
        }
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
    if(req.session.login === true && req.session.isAdmin === 1 && typeof req.body.id !== "undefined"){
        db.query(`DELETE FROM item WHERE serial='${req.body.id}';`)
            .then(() =>{
                res.send({success:true,message:"Item deleted!"});
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
