const express = require('express');
var db = require('../database').db;
var util = require('util');

const router = express.Router();

// Accounts
router.get('/accounts', function(req, res){
    var accounts = db.collection('Accounts');
    accounts.find().toArray(function (error, list) {
        res.json(list);
    });
});

router.post('/accounts', function(req, res){
    util.log(util.format('/api/accounts/ - POST - Request: %j', req.body));

    var accounts = db.collection('Accounts');
    accounts.insert(req.body, function (error, result) {
        res.send('Successfully added');
    });
});

router.put('/accounts/:id', function(req, res){
    res.send({type:'PUT'});
});

router.delete('/accounts/:id', function(req, res){
    res.send({type:'DELETE'});
});

module.exports = router;