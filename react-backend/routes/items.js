var express = require('express');
var router = express.Router();
const db = require('../database');


router.post('/', function (req, res, next) { // Search items from database for available items. All parameters optional.
    if (req.session.login === true) {
        if (
            typeof req.body.id !== "undefined" &&
            typeof req.body.name !== "undefined" &&
            typeof req.body.model !== "undefined" &&
            typeof req.body.brand !== "undefined" &&
            typeof req.body.itemInfo !== "undefined" &&
            typeof req.body.address !== "undefined" &&
            typeof req.body.owner !== "undefined" &&
            typeof req.body.category !== "undefined") {
            db.query(`SELECT * FROM item WHERE serial NOT IN (SELECT item_id FROM arereserved) AND 
                serial LIKE '%${req.body.id}%' 
                AND name LIKE '%${req.body.name }%' 
                AND model LIKE '%${req.body.model}%' 
                AND brand LIKE '%${req.body.brand}%' 
                AND address LIKE '%${req.body.address}%' 
                AND owner LIKE '%${req.body.owner}%' 
                AND category LIKE '%${req.body.category}%' 
                AND removed='0'
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

router.post('/getitem', function (req, res, next) { // Return requested item info.
    if (req.session.login === true) {
        if (typeof req.body.id !== "undefined") {
            db.query(`SELECT * FROM item WHERE serial='${req.body.id}' LIMIT 1;`)
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
            (typeof req.body.name !== "undefined" && req.body.name.length > 0) &&
            typeof req.body.model !== "undefined" ||
            typeof req.body.brand !== "undefined" ||
            typeof req.body.itemInfo !== "undefined" ||
            (typeof req.body.address !== "undefined" && req.body.name.length > 0) &&
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
        if (typeof req.body.id !== "undefined" &&
            typeof req.body.name !== "undefined" &&
            typeof req.body.model !== "undefined" &&
            typeof req.body.brand !== "undefined" &&
            typeof req.body.itemInfo !== "undefined" &&
            typeof req.body.address !== "undefined" &&
            typeof req.body.owner !== "undefined" &&
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
            db.query(`SELECT * FROM reservation_rent WHERE item_id='${req.body.id}' LIMIT 1;`)
                .then((rows) => {
                    if (rows.length > 0) {
                        db.query(`UPDATE item SET removed=b'1' WHERE serial='${req.body.id}';`)
                            .then(() => {
                                res.json({success: true, message: "Item marked as removed!!"});
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(503);
                                res.json({success: false, message: 'Server error'});
                            })
                    } else {
                        db.query(`SELECT * FROM reservation_rent WHERE item_id='${req.body.id}' LIMIT 1;`)
                            .then((rows) => {
                                if (rows.length > 0) {
                                    db.query(`UPDATE item SET removed=b'1' WHERE serial='${req.body.id}';`)
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

router.post('/reserve/insert', function (req, res, next) { // Inserts new reservation_rent row.
    if (req.session.login === true) {
        if (typeof req.body.item_id !== "undefined" &&
            typeof req.body.reservation_start !== "undefined" &&
            typeof req.body.reservation_end !== "undefined" &&
            typeof req.body.user_id !== "undefined"
        ) {
            db.query(`SELECT * FROM reservation_rent WHERE ('${req.body.reservation_start}' <= reservation_end) AND (reservation_start <= '${req.body.reservation_end}') AND item_id='${req.body.item_id}' LIMIT 1 ;`)
                .then((rows) => {
                    if (rows.length > 0) {
                        res.status(400).json({
                            success: false,
                            message: "There is all ready a reservation in that range!",
                            row: rows
                        });
                    } else {
                        db.query(`INSERT INTO reservation_rent (reservation_start, reservation_end,item_id,user_id) VALUES ('${req.body.reservation_start}','${req.body.reservation_end}','${req.body.item_id}','${req.body.user_id}')`)
                            .then(() => {
                                res.json({success: true, message: 'Item reserved!'});
                            })
                            .catch((err) => {
                                res.status(503).json({success: false, message: 'Server error #1', error: err})
                            });
                    }
                }).catch((err) => {
                res.status(503).json({success: false, message: 'Server error #2', error: err})
            });

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

router.post('/reserve/modify', function (req, res, next) { // Modify the existing reservation row.
    console.log(req.body);

    if (req.session.login === true) {
        if (typeof req.body.id !== "undefined" &&
            typeof req.body.item_id !== "undefined" &&
            typeof req.body.reservation_start !== "undefined" &&
            typeof req.body.reservation_end !== "undefined" &&
            typeof req.body.user_id !== "undefined"
        ) {
            db.query(`SELECT * FROM reservation_rent WHERE ('${req.body.reservation_start}' <= reservation_end) AND (reservation_start <= '${req.body.reservation_end}') AND item_id='${req.body.item_id}' AND id<>'${req.body.id}' LIMIT 1 ;`)
                .then((rows) => {
                    if (rows.length > 0) {
                        res.status(400).json({
                            success: false,
                            message: "There is all ready a reservation in that range!",
                            row: rows
                        });
                    } else {
                        db.query(`UPDATE reservation_rent SET reservation_start='${req.body.reservation_start}', reservation_end='${req.body.reservation_end}' WHERE id='${req.body.id}'`)
                            .then(() => {
                                res.json({success: true, message: 'Item reservation modified!'});
                            })
                            .catch((err) => {
                                res.status(503).json({success: false, message: 'Server error #1', error: err})
                            });
                    }
                }).catch((err) => {
                res.status(503).json({success: false, message: 'Server error #2', error: err})
            });

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

router.post('/reserve/delete', function (req, res, next) { // Delete reservation_rent row IF there is no RENT from it.
    if (req.session.login === true) {
        if (typeof req.body.id !== "undefined") {

            db.query(`SELECT * FROM reservation_rent WHERE id='${req.body.id}';`)
                .then((rows) => {
                    if (rows[0].start_date === null) {
                        db.query(`DELETE FROM reservation_rent WHERE id='${req.body.id}';`)
                            .then(() => {
                                res.json({success: true, message: "Reservation removed!"});
                            }).catch((err) => {
                            res.status(503).json({success: false, message: 'Server error #1', error: err})
                        });
                    } else {
                        res.status(400).json({
                            success: false,
                            message: 'There is all ready rent from this reservation'
                        });
                    }
                })
                .catch(() => {
                    res.status(503).json({success: false, message: 'Server error #1'});
                });
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


router.post('/rent', function (req, res, next) { // Returns rent and reservations of single user.
    if (req.session.login === true) {
        if (typeof req.body.username !== "undefined") {
            db.query(`SELECT reservation_rent.*,item.*,user.username FROM reservation_rent 
            INNER JOIN item ON item.serial=reservation_rent.item_id 
            INNER JOIN user ON user.id= reservation_rent.user_id WHERE username='${req.body.username}'
            `)
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

router.post('/rent/all', function (req, res, next) { // Returns all rents and reservations.

    if (req.session.login === true && req.session.isAdmin === 1) {
        db.query(`SELECT reservation_rent.*,item.*,user.username FROM reservation_rent 
            INNER JOIN item ON item.serial=reservation_rent.item_id 
            INNER JOIN user ON user.id= reservation_rent.user_id
            `).then(rows => {
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
});

router.post('/rent/insert', function (req, res, next) { // Modifies the reservation to be rented. reservation_end is updated for easier availability checks.
    if (req.session.login === true && req.session.isAdmin === 1) {
        if (typeof req.body.id !== "undefined" &&
            typeof req.body.item_id !== "undefined" &&
            typeof req.body.start_date !== "undefined" &&
            typeof req.body.end_date !== "undefined") {

            db.query(`SELECT * FROM reservation_rent WHERE ('${req.body.start_date}' <= reservation_end) AND (reservation_start <= '${req.body.end_date}') AND item_id='${req.body.item_id}' LIMIT 1 ;`)
                .then((rows) => {
                    if (rows.length > 0) {
                        res.status(400).json({
                            success: false,
                            message: "There is all ready a reservation in that range!",
                            row: rows
                        });
                    } else {
                        db.query(`UPDATE reservation_rent SET start_date='${req.body.start_date}', end_date='${req.body.end_date}', reservation_end='${req.body.end_date}' WHERE id='${req.body.id}'`)
                            .then(() => {
                                res.json({success: true, message: 'Item rented!'});
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(503);
                                res.json({success: false, message: 'Server error #1'});
                            });
                    }
                }).catch((err) => {
                res.status(503).json({success: false, message: 'Server error #2', error: err})
            });

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

router.post('/rent/modify', function (req, res, next) { // Modifies the reservation to be rented. reservation_end is updated for easier availability checks.
    if (req.session.login === true && req.session.isAdmin === 1) {
        if (typeof req.body.id !== "undefined" &&
            typeof req.body.item_id !== "undefined" &&
            typeof req.body.start_date !== "undefined" &&
            typeof req.body.end_date !== "undefined") {

            db.query(`SELECT * FROM reservation_rent WHERE ('${req.body.start_date}' <= reservation_end) AND (reservation_start <= '${req.body.end_date}') AND item_id='${req.body.item_id}' AND id<>'${req.body.id}' LIMIT 1 ;`)
                .then((rows) => {
                    if (rows.length > 0) {
                        res.status(400).json({
                            success: false,
                            message: "There is all ready a reservation in that range!",
                            row: rows
                        });
                    } else {
                        db.query(`UPDATE reservation_rent SET start_date='${req.body.start_date}', end_date='${req.body.end_date}', reservation_end='${req.body.end_date}' WHERE id='${req.body.id}'`)
                            .then(() => {
                                res.json({success: true, message: 'Item rented!'});
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(503);
                                res.json({success: false, message: 'Server error #1'});
                            });
                    }
                }).catch((err) => {
                res.status(503).json({success: false, message: 'Server error #2', error: err})
            });

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


router.post('/rent/return', function (req, res, next) { // Returns rented item to stock. Will give OK even IF item was not rented(Will not modify anything!) reservation_end is updated for easier availability checks.
    if (req.session.login === true && req.session.isAdmin === 1) {
        if (typeof req.body.id !== "undefined") {
            db.query(`UPDATE reservation_rent SET end_date=TIMESTAMP(NOW()),reservation_end=TIMESTAMP(NOW()) WHERE id='${req.body.id}'`)
                .then(() => {
                    res.json({success: true, message: 'Item returned to stock!'});
                })
                .catch((err) => {
                    console.log(err);
                    res.status(503);
                    res.json({success: false, message: 'Server error #2'});
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

router.post('/rent/returnreserved', function (req, res, next) { // Returns reservation_rent row to state reserved. Will give ok for not rented rows!
    if (req.session.login === true && req.session.isAdmin === 1) {
        if (typeof req.body.id !== "undefined") {
            db.query(`UPDATE reservation_rent SET start_date=null, end_date=null WHERE id='${req.body.id}'`)
                .then(() => {
                    res.json({success: true, message: 'Item returned to reserved!'});
                })
                .catch((err) => {
                    console.log(err);
                    res.status(503);
                    res.json({success: false, message: 'Server error #1'});
                });

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

module.exports = router;
