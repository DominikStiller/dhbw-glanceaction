const express = require('express');
var db = require('../database').db;
var util = require('util');

const router = express.Router();

// Transactions
router.get('/transactions', function(req, res){
    var transactions = db.collection('Transactions');
    transactions.find().toArray(function (error, list) {
        res.json(list);
    });
});

router.post('/transactions', function(req, res){
    util.log(util.format('/api/transactions/ - POST - Request: %j', req.body));

    var transactions = db.collection('Transactions');
    transactions.insert(req.body, function (error, result) {
        res.send('Successfully added');
    });
});

router.put('/transactions/:id', function(req, res){
    res.send({type:'PUT'});
});

router.delete('/transactions/:id', function(req, res){
    res.send({type:'DELETE'});
});

module.exports = router;