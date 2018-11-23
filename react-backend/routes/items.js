var express = require('express');
var router = express.Router();
const Database = require('../database');
const con = require('../connection');
const db = new Database(con);


router.post('/', function (req, res, next) { // Search items from database. All parameters optional.

    if (req.session.login === true) {
        if (
            typeof req.body.id !== "undefined" ||
            typeof req.body.name !== "undefined" ||
            typeof req.body.model !== "undefined" ||
            typeof req.body.brand !== "undefined" ||
            typeof req.body.itemInfo !== "undefined" ||
            typeof req.body.address !== "undefined" ||
            typeof req.body.owner !== "undefined" ||
            typeof req.body.category !== "undefined") {
            db.query(`SELECT * FROM item WHERE 
                serial LIKE '%${req.body.id}%' 
                AND name LIKE '%${req.body.name }%' 
                AND model LIKE '%${req.body.model}%' 
                AND brand LIKE '%${req.body.brand}%' 
                AND address LIKE '%${req.body.address}%' 
                AND owner LIKE '%${req.body.owner}%' 
                AND category LIKE '%${req.body.category}%' 
                AND category LIKE '%${req.body.category}%'
                LIMIT 50;`)
                .then(rows => {
                    res.json(rows);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(503);
                    res.json({success: false, message: 'Server error #1'});
                })
        } else {
            if (typeof req.session.isSet === "undefined") {
                res.status(404).json({success: false, message: 'Error. Not logged in!'});
            } else {
                res.status(400).json({success: false, message: 'Bad request'});
            }
        }
    } else {
        res.status(400).json({success: false, message: 'Bad request'});
    }
});

router.post('/insert', function (req, res, next) {
    if (req.session.login === true && req.session.isAdmin === 1) {
        if (
            (typeof req.body.name !== "undefined" && req.body.name.length > 0) ||
            typeof req.body.model !== "undefined" ||
            typeof req.body.brand !== "undefined" ||
            typeof req.body.itemInfo !== "undefined" ||
            (typeof req.body.address !== "undefined" && req.body.name.length > 0) ||
            (typeof req.body.owner !== "undefined" && req.body.name.owner > 0) ||
            typeof req.body.category !== "undefined") {
            db.query(`INSERT INTO item 
        (name,model,brand,info,address,owner,category) 
        VALUES 
        ('${req.body.name}'
        ,'${req.body.model}'
        ,'${req.body.brand}'
        ,'${req.body.itemInfo}'
        ,'${req.body.address}'
        ,'${req.body.owner}'
        ,'${req.body.category}');`)
                .then(() => {
                    res.json({success: true, message: "New item added!"});
                })
                .catch((err) => {
                    console.log(err);
                    res.status(503);
                    res.json({success: false, message: 'Server error'});
                })
        } else {
            res.status(400);
            res.json({success: false, message: 'Bad request'});
        }

    } else {
        if (typeof req.session.isSet === "undefined") {
            res.status(404);
            res.json({success: false, message: 'Error. Not logged in!'});
        } else {
            res.status(400);
            res.json({success: false, message: 'Bad request'});
        }
    }
});

router.post('/modify', function (req, res, next) {

    if (req.session.login === true && req.session.isAdmin === 1) {
        console.log(req.body);
        if (typeof req.body.id !== "undefined" ||
            typeof req.body.name !== "undefined" ||
            typeof req.body.model !== "undefined" ||
            typeof req.body.brand !== "undefined" ||
            typeof req.body.itemInfo !== "undefined" ||
            typeof req.body.address !== "undefined" ||
            typeof req.body.owner !== "undefined" ||
            typeof req.body.category !== "undefined") {
            db.query(`UPDATE item SET 
         serial='${req.body.id}' 
        ,name='${req.body.name}'
        ,model='${req.body.model}'
        ,brand='${req.body.brand}'
        ,info='${req.body.itemInfo}'
        ,address='${req.body.address}'
        ,owner='${req.body.owner}'
        ,category='${req.body.category}'
        WHERE serial='${req.body.id}';`)
                .then(() => {
                    res.json({success: true, message: "Item modified!"});
                })
                .catch((err) => {
                    console.log(err);
                    res.status(503);
                    res.json({success: false, message: 'Server error'});
                })
        } else {
            res.status(400);
            res.json({success: false, message: 'Bad request'});
        }
    } else {
        if (typeof req.session.isSet === "undefined") {
            res.status(404);
            res.json({success: false, message: 'Error. Not logged in!'});
        } else {
            res.status(400);
            res.json({success: false, message: 'Bad request'});
        }
    }
});

router.post('/delete', function (req, res, next) { // Marks item as REMOVED IF it has any references in rent OR reservation tables ELSE item is remove fully.
        if (req.session.login === true && req.session.isAdmin === 1 && typeof req.body.id !== "undefined") {
            db.query(`SELECT * FROM rent WHERE item_id='${req.body.id}' LIMIT 1;`)
                .then((rows) => {
                    if (rows.length > 0) {
                        db.query(`UPDATE item SET removed='1' WHERE serial='${req.body.id}';`)
                            .then(() => {
                                res.json({success: true, message: "Item marked as removed!!"});
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(503);
                                res.json({success: false, message: 'Server error'});
                            })
                    } else {
                        db.query(`SELECT * FROM reservation WHERE item_id='${req.body.id}' LIMIT 1;`)
                            .then((rows) => {
                                if (rows.length > 0) {
                                    db.query(`UPDATE item SET removed='1' WHERE serial='${req.body.id}';`)
                                        .then(() => {
                                            res.json({success: true, message: "Item marked as removed!!"});
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            res.status(503);
                                            res.json({success: false, message: 'Server error'});
                                        })
                                } else {
                                    db.query(`DELETE FROM item WHERE serial='${req.body.id}';`)
                                        .then(() => {
                                            res.json({success: true, message: "Item deleted!"});
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            res.status(503);
                                            res.json({success: false, message: 'Server not responding.'});
                                        })
                                }
                            }).catch(() => {
                        });
                    }
                })
        } else {
            if (typeof req.session.isSet === "undefined") {
                res.status(404);
                res.json({success: false, message: 'Error. Not logged in!'});
            } else {
                res.status(400);
                res.json({success: false, message: 'Bad request'});
            }
        }
    }
);

router.post('/address', function (req, res, next) { // Search for DISTINCT addresses

    if (req.session.login === true) {
        db.query(`SELECT DISTINCT address FROM item;`)
            .then(rows => {
                res.json(rows);
            })
            .catch((err) => {
                console.log(err);
                res.status(503);
                res.json({success: false, message: 'Server error #1'});
            })
    } else {
        res.status(400).json({success: false, message: 'Bad request'});
    }
});

router.post('/owner', function (req, res, next) { // Search for DISTINCT owners

    if (req.session.login === true) {
        db.query(`SELECT DISTINCT owner FROM item;`)
            .then(rows => {
                res.json(rows);
            })
            .catch((err) => {
                console.log(err);
                res.status(503);
                res.json({success: false, message: 'Server error #1'});
            })
    } else {
        res.status(400).json({success: false, message: 'Bad request'});
    }
});

router.post('/category', function (req, res, next) { // Search for DISTINCT categories

    if (req.session.login === true) {
        db.query(`SELECT DISTINCT category FROM item;`)
            .then(rows => {
                res.json(rows);
            })
            .catch((err) => {
                console.log(err);
                res.status(503);
                res.json({success: false, message: 'Server error #1'});
            })
    } else {
        res.status(400).json({success: false, message: 'Bad request'});
    }
});

module.exports = router;
